import { GraphQLID, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { PrismaClient } from '@prisma/client';
import { gql } from 'apollo-server-express';

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
    }
    type Query {
        users: [User]
        user(id:Int!): [User] # get persion
        # getPerson(id: ID): Users #has an argument of 'id' of type Integer.
    }
    # type Mutation {
    #     users(name: String!, status: String!, password: String!, email: String!): User!
    #     # publish(id: ID!): Users
    # }
`;

export default userDefs;
