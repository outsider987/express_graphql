import Query from './Query';
import Mutation from './Mutation';


const resolvers = {
    Query: {
        ...Query,
    },
    Mutation: {
        ...Mutation,
    },
};

export default resolvers;
