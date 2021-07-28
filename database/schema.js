const { gql } = require('apollo-server');

/* Definicion de las queries para obtener las usuarias
    Es obligatorio paserle el ID del usuario que desamos consultar
    La query Retorna un array de usuarios
*/
const typeDefs = gql`

  type User {
    id: ID
    name: String
    roles: String
    enterprises: String
  }

  type Query {
    getUsers: [User]
    getMatchesNetworking(id: ID!): [User] 
    getMatchesGuidesSameCompany(id: ID!): [User]
    getMatchesMentoring(id: ID!): [User]
    getInternalCompanyMentoring(id: ID!): [User]
  }

  input CreateUserInput {
    name: String!
    roles: String!
    enterprises: String!
  }

  type Mutation {
    createUser(input: CreateUserInput): User
  }
`;

module.exports = {
  typeDefs
}