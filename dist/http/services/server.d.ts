/// <reference types="node" />
import { PrismaClient } from "@prisma/client";
import { Application, RequestHandler } from "express";
import type Controller from "~/http/controllers/Controller";
import http from 'http';
declare class Server {
    private app;
    private readonly port;
    constructor(app: Application, database: PrismaClient, port: number);
    run(): http.Server;
    loadMiddleware(middleware: Array<RequestHandler>): void;
    loadControllers(controllers: Array<Controller>): void;
    initDatabase(): Promise<void>;
}
export default Server;
