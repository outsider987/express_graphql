// import User  from './../models/user';
import { gql } from "apollo-server-express"; //will create a schema

const userDefs = gql`
  type Users {
    id: ID!
    status: String!
    username: String!
    email: String!
    password: String!
  }
  type Query {
    users: [Users]

    # getPerson(id: Int): Person #has an argument of 'id' of type Integer.
  },
`;

export default userDefs; 