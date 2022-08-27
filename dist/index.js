"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const client_1 = require("@prisma/client");
const server_1 = __importDefault(require("./http/services/server"));
const controllers_1 = __importDefault(require("./http/controllers"));
const prisma = new client_1.PrismaClient();
const corsOptions = {
    origin: ['http://www.example.com', 'http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
};
const app = (0, express_1.default)();
const port = 4000;
const server = new server_1.default(app, prisma, port);
const globalMiddleware = [
    (0, express_1.urlencoded)({ extended: false }),
    (0, express_1.json)(),
    (0, cors_1.default)(corsOptions),
    // ...
];
Promise.resolve()
    .then(() => server.initDatabase())
    .then(() => {
    server.loadMiddleware(globalMiddleware);
    server.loadControllers(controllers_1.default);
    server.run();
});
//# sourceMappingURL=index.js.map