import { RequestDocument, request } from "graphql-request";
import { QueryClient } from "react-query";

export const getClient = (() => {
  let client: QueryClient | null = null;
  return () => {
    if (!client)
      client = new QueryClient({
        defaultOptions: {
          // 캐싱을 한번 요청한 다음부터는 다시 요청을 하지 않음
          queries: {
            cacheTime: Infinity, //  쿼리 결과를 캐시하는 시간
            staleTime: Infinity, // 쿼리 결과가 만료되기 전에 stale(이미 사용된) 상태로 표시되는 시간
            refetchOnMount: false, //  컴포넌트가 마운트될 때 매번 새로고침 여부
            refetchOnReconnect: false, //  연결이 재설정될 때 매번 새로고침 여부
            refetchOnWindowFocus: false, //  창이 포커스를 얻을 때 매번 새로고침 여부
          },
        },
      });
    return client;
  };
})();

const BASE_URL = import.meta.env.VITE_SERVER_URL as string; // 'http://localhost:8000/graphql'

export const graphqlFetcher = <T>(query: RequestDocument, variables = {}) =>
  request<T>(`${BASE_URL}/graphql`, query, variables, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": BASE_URL,
  });

/* export const graphqlFetcher = (query: RequestDocument, variables = {}) =>
  request(`${BASE_URL}/graphql`, query, variables, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': BASE_URL,
  }) */

export const QueryKeys = {
  PRODUCTS: "PRODUCTS",
  CART: "CART",
};
