import express, { json, RequestHandler, urlencoded, ErrorRequestHandler } from 'express';
import cors from 'cors';
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import Server from './http/utils/server';
import { controllers } from '~/http/utils/module';
import bodyParser from 'body-parser';
import exceptionHandler from './http/middlewares/exceptions';
import passport from './http/utils/passport';
import expressSession from 'express-session';

const prisma = new PrismaClient();

const corsOptions = {
    origin: ['http://localhost:8080', 'http://127.0.0.1:8080', 'https://outsider987.github.io'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
    credentials: true,
    // exposedHeaders: ['set-cookie'],
};
let sess = {
    secret: 'keyboard cat',
    cookie: {},
};

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 4000;
const server = new Server(app, prisma, port);

const globalMiddleware: Array<RequestHandler> = [
    urlencoded({ extended: false }),
    express.json(),
    cors(corsOptions),
    expressSession(sess),
    passport.initialize(),
    passport.session(),
];
const globalMiddlewareError: Array<ErrorRequestHandler> = [exceptionHandler];

Promise.resolve()
    .then(() => server.initDatabase())
    .then(() => {
        server.loadMiddleware(globalMiddleware);
        server.loadControllers(controllers);
        server.loadErrorMiddleware(globalMiddlewareError);
        server.run();
    });
