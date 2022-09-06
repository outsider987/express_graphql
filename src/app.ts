import express, { json, RequestHandler, urlencoded,ErrorRequestHandler } from 'express';
import cors from 'cors';
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import Server from './http/services/server';
import controllers from './http/controllers';
import bodyParser from 'body-parser';
import  exceptionHandler  from './http/middlewares/exceptions';

const prisma = new PrismaClient();

const corsOptions = {
  origin: ['http://www.example.com', 'http://localhost:8080'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
};

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 4000;
const server = new Server(app, prisma, port);

const globalMiddleware: Array<RequestHandler> = [
  urlencoded({ extended: false }),
  bodyParser.json(),
  cors(corsOptions),
];
const globalMiddlewareError: Array<ErrorRequestHandler> = [
    exceptionHandler
  ];


Promise.resolve()
  .then(() => server.initDatabase())
  .then(() => {
    server.loadMiddleware(globalMiddleware);
    server.loadControllers(controllers);
    server.loadErrorMiddleware(globalMiddlewareError)
    server.run();
  });
