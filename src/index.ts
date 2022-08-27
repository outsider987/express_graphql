import express from 'express';
import cors from "cors";
import { router } from "./router";
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

// import { GraphQLObjectType } from 'graphql';
const prisma = new PrismaClient();

const corsOptions = {
    origin: ['http://www.example.com', 'http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
const port = 4000;

for (const route of router) {
    
    app.use(route.getRouter());
  }