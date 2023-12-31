import { Resolver } from './types'
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from '../firebase'

const PAGE_SIZE = 15

const productResolver: Resolver = {
  Query: {
    products: async (parent, { cursor = '', showDeleted = false }) => {
      const products = collection(db, 'products');
      const orderByOptions = [orderBy('createdAt', 'desc')];
      const whereOptions = [];

      if (cursor) {
        const cursorSnapshot = await getDoc(doc(db, 'products', cursor));
        if (cursorSnapshot.exists()) {
          const cursorCreatedAt = cursorSnapshot.get('createdAt');

          // @ts-ignore
          orderByOptions.push(orderBy('createdAt', 'desc'), startAfter(cursorCreatedAt));
        } else {
          // cursor에 해당하는 문서가 없는 경우 예외 처리 또는 기본값을 설정합니다.
          return []
        }
      }
      if (!showDeleted) {
        whereOptions.push(where('createdAt', '!=', null));
      }
      const q = query(products, ...orderByOptions, ...whereOptions, limit(PAGE_SIZE));
      const snapshot = await getDocs(q)
      const data: DocumentData[] = []
      snapshot.forEach(doc =>
        data.push({
          id: doc.id,
          ...doc.data(),
        }),
      )
      return data
    },
    product: async (parent, { id }) => {
      const snapshot = await getDoc(doc(db, 'products', id))
      return {
        ...snapshot.data(),
        id: snapshot.id,
      }
    },
  },
  Mutation: {
    addProduct: async (parent, { imageUrl, price, title, description }) => {
      const newProduct = {
        imageUrl,
        price,
        title,
        description,
        createdAt: serverTimestamp(),
      }
      const result = await addDoc(collection(db, 'products'), newProduct)
      const snapshot = await getDoc(result)
      return {
        ...snapshot.data(),
        id: snapshot.id,
      }
    },
    updateProduct: async (parent, { id, ...data }) => {
      const productRef = doc(db, 'products', id)
      if (!productRef) throw new Error('상품이 없습니다.')
      await updateDoc(productRef, {
        ...data,
        createdAt: serverTimestamp(),
      })
      const snap = await getDoc(productRef)
      return {
        ...snap.data(),
        id: snap.id,
      }
    },
    deleteProduct: async (parent, { id }) => {
      // 실제 db에서 delete를 하는 대신, createdAt을 지워준다.
      const productRef = doc(db, 'products', id)
      if (!productRef) throw new Error('상품이 없습니다.')
      await updateDoc(productRef, { createdAt: null })
      return id
    },
  },
}

export default productResolver