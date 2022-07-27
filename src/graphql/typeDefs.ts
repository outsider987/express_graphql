import { UserModel } from './../models/user';
import { gql } from "apollo-server-express"; //will create a schema

const typeDefs = gql`
  type Users {
    id: ID!
    status: String!
    username: String!
    email: String!
    password: String!
    # users:[Users!]!
  }
  #handle user commands
  type Query {
    users: [Users] #will return multiple Person instances
    # getPerson(id: Int): Person #has an argument of 'id' of type Integer.
  },
#   type Mutation {
#     #the addPerson commmand will accept an argument of type String.
#     #it will return a 'Person' instance. 
#     # addPerson(name: String): Person
#   }
`;

export default typeDefs; 