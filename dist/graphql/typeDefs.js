"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import User  from './../models/user';
const apollo_server_express_1 = require("apollo-server-express"); //will create a schema
const typeDefs = (0, apollo_server_express_1.gql) `
  type Users {
    id: ID!
    status: String!
    username: String!
    email: String!
    password: String!
  }
  type Tokens {
    id: ID!

  }
  #handle user commands
  type Query {
    users: [Users] #will return multiple Person instances
    tokens:[Tokens]
    # getPerson(id: Int): Person #has an argument of 'id' of type Integer.
  },
#   type Mutation {
#     #the addPerson commmand will accept an argument of type String.
#     #it will return a 'Person' instance. 
#     # addPerson(name: String): Person
#   }
`;
exports.default = typeDefs;
