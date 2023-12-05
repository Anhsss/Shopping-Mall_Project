import { SyntheticEvent } from 'react'
import { QueryClient, useMutation } from 'react-query'
import { ADD_PRODUCT, MutableProduct, Product, Products } from '../../graphql/products'
import { getClient, graphqlFetcher, QueryKeys } from '../../queryClient'
import arrToObj from '../../util/arrToObj'

// type PartialProduct = Partial<Product> // 부분집합으로 모든 필드가 optional해진다.

const AddForm = () => { // react 버전 업데이트 기존 코드 수정
  const queryClient = getClient();
  const { mutate: addProduct } = useMutation(
    async ({ title, imageUrl, price, description }: MutableProduct) => {
      const result = await graphqlFetcher(ADD_PRODUCT, { title, imageUrl, price, description });
      // Assuming graphqlFetcher returns an object with an "addProduct" property
      return result as { addProduct: any };
    },
    {
      onSuccess: ({ addProduct }) => {
        // (1) 데이터를 stale처리해서 재요청하게끔 함. =>
        // (장) 코드가 간단하다. 쉽다.
        // (단) 서버요청 또 한다.
        queryClient.invalidateQueries(QueryKeys.PRODUCTS, {
          exact: false,
          refetchInactive: true,
        });
        /* 
        // (2) 응답결과만으로 캐시 업데이트. => 장단점 반대.
        const adminData = queryClient.getQueriesData<{
          pageParams: (number | undefined)[]
          pages: Products[]
        }>([QueryKeys.PRODUCTS, 'admin'])

        const [adminKey, { pageParams: adminParams, pages: adminPages }] = adminData[0]
        const newAdminPages = [...adminPages]
        newAdminPages[0].products = [addProduct, ...newAdminPages[0].products]
        queryClient.setQueriesData(adminKey, { pageParms: adminParams, pages: newAdminPages })
        */
      },
    },
  );

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    const formData = arrToObj([...new FormData(e.target as HTMLFormElement)])
    formData.price = Number(formData.price)
    addProduct(formData as MutableProduct)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        상품명: <input name="title" type="text" required />
      </label>
      <label>
        이미지URL: <input name="imageUrl" type="text" required />
      </label>
      <label>
        상품가격: <input name="price" type="number" required min="1000" />
      </label>
      <label>
        상세: <textarea name="description" />
      </label>
      <button type="submit">등록</button>
    </form>
  )
}

export default AddForm