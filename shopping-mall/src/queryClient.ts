import { RequestDocument, request } from "graphql-request";
import { QueryClient } from "react-query";

// import { getTodos, postTodo } from '../my-api'

type AnyOBJ = { [key: string]: any };

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

const BASE_URL = "/"; // https://fakestoreapi.com

export const restFetcher = async ({
  method,
  path,
  body,
  params,
}: {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  body?: AnyOBJ;
  params?: AnyOBJ;
}) => {
  try {
    let url = `${BASE_URL}${path}`;
    const fetchOptions: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": BASE_URL,
      },
    };
    if (params) {
      const searchParams = new URLSearchParams(params);
      url += "?" + searchParams.toString();
    }

    if (body) fetchOptions.body = JSON.stringify(body); // body를 JSON 문자열로 변환하여 fetchOptions 객체의 body 속성에 할당

    const res = await fetch(url, fetchOptions);
    const json = await res.json();
    return json;
  } catch (err) {
    console.error(err);
  }
};

// export const graphqlFetcher = (query: RequestDocument, variables = {}) => request(BASE_URL, query, variables)
export const graphqlFetcher = <T>(query: RequestDocument, variables = {}) =>
  request<T>(BASE_URL, query, variables)

// export const graphqlFetcher = async (
//   query: string,
//   variables?: Record<string, any>
// ) => {
//   const response = await fetch("/graphql", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       query,
//       variables,
//     }),
//   });

//   const data = await response.json();
//   return data;
// };

export const QueryKeys = {
  PRODUCTS: "PRODUCTS",
  CART: "CART",
};
