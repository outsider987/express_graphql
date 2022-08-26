import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLScalarType, Kind } from 'graphql';
import { gql } from 'apollo-server-express';
import { PrismaClient,Prisma } from '@prisma/client';


const dateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value: any) {
        return value.getTime(); // Convert outgoing Date to integer for JSON
    },
    parseValue(value: any) {
        return new Date(value); // Convert incoming integer to Date
    },
    parseLiteral(ast: any) {
        if (ast.kind === Kind.INT) {
            return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
        }
        return null; // Invalid hard-coded value (not an integer)
    },
});
const User = new GraphQLObjectType({
    name: 'User',
    description: 'User information',
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLID),
            description: 'id of user',
        },
        status: {
            type: new GraphQLNonNull(GraphQLID),
            description: 'id of user',
        },
        username: {
            type: new GraphQLNonNull(GraphQLID),
            description: 'id of user',
        },
        email: {
            type: new GraphQLNonNull(GraphQLID),
            description: 'id of user',
        },
        password: {
            type: new GraphQLNonNull(GraphQLID),
            description: 'id of user',
        },
    },
});


const userDefs = gql`
    type User {
        id: ID! #id of user
        status: String!
        username: String!
        email: String!
        password: String!
        createdAt: String!
        updatedAt: String!
        deletedAt: String!
    }
    type Query {
        users: [User]
        user(id: Int!): [User] # get persion
        # getPerson(id: ID): Users #has an argument of 'id' of type Integer.
    }
    type Sigup {
        token:String!
        user:User
    }
    type Mutation {
        signup(username: String!, status: String!, password: String!, email: String!):Sigup
        # publish(id: ID!): Users
    }
`;

export default userDefs;
