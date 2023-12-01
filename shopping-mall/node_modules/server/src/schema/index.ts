import { gql } from 'apollo-server-express'
import productSchema from './product'
import cartSchema from './cart'

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`

export default [linkSchema, productSchema, cartSchema]
// 스키마를 한곳에 합치는 방법