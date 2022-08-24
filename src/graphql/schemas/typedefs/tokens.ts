import { gql } from 'apollo-server-express'; //will create a schema


const tokenDefs = gql`
    enum token_status {
        active
        disabled
    }
    type Tokens {
        id: ID!
        status: token_status!
        username: String!
        email: String!
        password: String!
        createdAt: String!
        updatedAt: String!
        deletedAt: String!
    }
    type Query {
        tokens: [Tokens]
    }
`;

export default tokenDefs;
