"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../../../models"));
const userResolver = () => {
    // console.log(JSON.stringify(db) );
    // const t = new User();
    return models_1.default.User.findAll();
};
exports.default = userResolver;
