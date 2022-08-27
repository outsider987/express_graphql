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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
/**
 * generates JWT used for local testing
 */
function generateToken() {
    // information to be encoded in the JWT
    const payload = {
        name: 'Andrés Reales',
        userId: 123,
        accessTypes: ['getTeams', 'addTeams', 'updateTeams', 'deleteTeams'],
    };
    // read private key value
    const privateKey = fs.readFileSync(path.join(__dirname, './../../../private.key'));
    const signInOptions = {
        // RS256 uses a public/private key pair. The API provides the private key
        // to generate the JWT. The client gets a public key to validate the
        // signature
        algorithm: 'RS256',
        expiresIn: '1h',
    };
    // generate JWT
    return (0, jsonwebtoken_1.sign)(payload, privateKey, signInOptions);
}
exports.generateToken = generateToken;
//# sourceMappingURL=jwt.utils.js.map