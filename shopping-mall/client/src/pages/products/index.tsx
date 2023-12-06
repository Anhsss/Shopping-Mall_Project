import { useEffect, useRef } from 'react'
import { useInfiniteQuery } from 'react-query'
import ProductList from '../../components/product/list'
import GET_PRODUCTS, { Products } from '../../graphql/products'
import useIntersection from '../../hooks/useIntersection'
import { graphqlFetcher, QueryKeys } from '../../queryClient'

const ProductListPage = () => {
  const fetchMoreRef = useRef<HTMLDivElement>(null)
  const intersecting = useIntersection(fetchMoreRef)

  const { data, isSuccess, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery<Products>( // 무한 스크롤
      [QueryKeys.PRODUCTS, 'products'],
      ({ pageParam = '' }) => graphqlFetcher(GET_PRODUCTS, { cursor: pageParam }),
      {
        getNextPageParam: lastPage => {
          return lastPage.products.at(-1)?.id // 현재 페이지에 있는 데이터 중 마지막 항목의 ID를 반환
        },
      },
    )

  useEffect(() => {
    if (!intersecting || !isSuccess || !hasNextPage || isFetchingNextPage) return
    fetchNextPage()
  }, [intersecting])

  return (
    <div>
      <h2>상품목록</h2>
      <ProductList list={data?.pages || []} />
      <div ref={fetchMoreRef} />
    </div>
  )
}

export default ProductListPage