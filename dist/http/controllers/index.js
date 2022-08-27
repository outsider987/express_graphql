"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthController_1 = __importDefault(require("./AuthController"));
const UserController_1 = __importDefault(require("./UserController"));
const controllers = [
    new AuthController_1.default(),
    new UserController_1.default()
];
exports.default = controllers;
//# sourceMappingURL=index.js.map