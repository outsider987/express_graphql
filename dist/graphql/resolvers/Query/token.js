"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = require("../../../models/token");
const tokenResolver = () => {
    return token_1.Token.findAll();
};
exports.default = tokenResolver;
