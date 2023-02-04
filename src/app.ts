import express, { json, RequestHandler, urlencoded, ErrorRequestHandler } from 'express';
import cors from 'cors';
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import Server from './http/utils/server';
import { controllers } from '~/http/utils/module';
import bodyParser from 'body-parser';
import exceptionHandler from './http/middlewares/exceptions';
import passport from './http/utils/passport';
import expressSession, { SessionOptions } from 'express-session';
import connectRedis from 'connect-redis';
import { createClient } from 'redis';
import dotenv from 'dotenv';

const { NODE_ENV } = process.env;
const isProd = NODE_ENV === 'prod';
dotenv.config({ path: `.env.${NODE_ENV}` });

const RedisStore = connectRedis(expressSession);

const client = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
    },
    legacyMode: true,
    password: process.env.REDIS_PASS,
});

client.on('connect', () => {
    console.log('connected to redis successfully!');
});

client.on('error', (error) => {
    console.log('Redis connection error :', error);
});

const corsOptions = {
    origin: [
        'http://localhost:8080',
        'http://127.0.0.1:8080',
        'https://outsider987.github.io',
        'https://outsider987.github.io/leetCodeCrack',
        'https://leetcodecrack.fly.dev',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
    credentials: true,
};
let sess: SessionOptions = {
    resave: true,
    saveUninitialized: true,
    secret: 'test',
    cookie: { secure: isProd, sameSite: isProd ? 'none' : 'lax', maxAge: 1000 * 60 * 60 * 24 },
    store: new RedisStore({
        client: client,
    }),
};

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;
const server = new Server(app, port);

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
    .then(() => client.connect())
    .then(() => {
        server.loadMiddleware(globalMiddleware);
        server.loadControllers(controllers);
        server.loadErrorMiddleware(globalMiddlewareError);
        server.run();
    });

export const prisma = new PrismaClient();
