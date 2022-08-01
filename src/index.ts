import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import http from 'http';
import 'dotenv/config';
import console from 'console';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/resolvers/schemas/typedefs';
import { PrismaClient } from '@prisma/client';
// import { GraphQLObjectType } from 'graphql';
const prisma = new PrismaClient();


async function startApolloServer(schema: any, resolvers: any) {
    try {
        // const t = await prisma.users.findMany({});
        // console.log(t);
        const app = express();
        const httpServer = http.createServer(app);
        const server = new ApolloServer({
            typeDefs: schema,
            resolvers,
            introspection: true,
            //tell Express to attach GraphQL functionality to the server
            plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        });
        await server.start(); //start the GraphQL server.
        server.applyMiddleware({ app, path: '/api' });
        const port = process.env.PORT || 4000;
        await new Promise<void>(
            (resolve) => httpServer.listen({ port: port }, resolve) //run the server on port 4000
        );
     
        console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
    } catch (error) {
        console.log(error);
    }
}
//in the end, run the server and pass in our Schema and Resolver.
startApolloServer(typeDefs, resolvers);
