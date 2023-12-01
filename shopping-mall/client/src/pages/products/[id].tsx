import { useQuery } from "react-query"
import { QueryKeys, graphqlFetcher } from "../../queryClient"
import { useParams } from "react-router-dom"
import ProductDetail from "../../components/product/detail"
import { GET_PRODUCT, Product } from "../../graphql/products"

const ProductDetailPage = () => {
    const { id } = useParams()
    
    // const { data } = useQuery<Product>([QueryKeys.PRODUCTS, id], () => 
    // graphqlFetcher(GET_PRODUCT, { id }),
    // )

    const { data } = useQuery<Product, unknown, Product>(       // unknown, Product 생략 여부
        [QueryKeys.PRODUCTS, id],
        () => graphqlFetcher(GET_PRODUCT, { id }),
        {
          select: (data) => data as Product, // 선택적으로 타입 캐스팅
        }
      );

    if (!data) return null
    
    return (
        <div>
            <h2>상품상세</h2>
            <ProductDetail item={data} />
        </div>
    )
}

export default ProductDetailPage