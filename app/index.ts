import { ApolloServer } from 'apollo-server-express';
import Schema from './Schemas';
import Resolvers from './Resolvers';
import express from 'express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import http from 'http';
import mongoose from 'mongoose';
import 'dotenv/config';

async function startApolloServer(schema: any, resolvers: any) {
    try {
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

        const option = {
            user: process.env.MONGO_USER,
            pass: process.env.MONGO_PASSWORD,
        };
        const result = await mongoose.connect(process.env.MONGODB_URI as string);

        
    } catch (error) {
        console.log(error);
    }
}
//in the end, run the server and pass in our Schema and Resolver.
startApolloServer(Schema, Resolvers);
