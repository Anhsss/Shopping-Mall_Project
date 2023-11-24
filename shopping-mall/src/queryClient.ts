import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
  } from 'react-query'
  
// import { getTodos, postTodo } from '../my-api'
  
export const getClient = (() => {
let client : QueryClient | null = null;
return () => {
    if(!client) client = new QueryClient({})
    return client
  }
})()