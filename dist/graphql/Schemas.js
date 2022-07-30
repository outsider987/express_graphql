"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express"); //will create a schema
const Schema = (0, apollo_server_express_1.gql) `
  type Person {
    id: ID!
    name: String
  }
  #handle user commands
  type Query {
    getAllPeople: [Person] #will return multiple Person instances
    getPerson(id: Int): Person #has an argument of 'id' of type Integer.
  },
  type Mutation {
    #the addPerson commmand will accept an argument of type String.
    #it will return a 'Person' instance. 
    addPerson(name: String): Person
  }
`;
exports.default = Schema;
