import express, {json, RequestHandler, urlencoded} from 'express';
import cors from 'cors';
import 'dotenv/config';
import {PrismaClient} from '@prisma/client';
import Server from './http/services/server';
import controllers from './http/controllers';

const prisma = new PrismaClient();

const corsOptions = {
  origin: ['http://www.example.com', 'http://localhost:3000'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Access-Control-Allow-Origin',
  ],
};

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 4000;
const server = new Server(app, prisma, port);

const globalMiddleware: Array<RequestHandler> = [
  urlencoded({extended: false}),
  json(),
  cors(corsOptions),
  // ...
];

Promise.resolve()
    .then(() => server.initDatabase())
    .then(() => {
      server.loadMiddleware(globalMiddleware);
      server.loadControllers(controllers);
      server.run();
    });
