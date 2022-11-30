import { sign, SignOptions } from 'jsonwebtoken';
require('dotenv').config();
/**
 * generates JWT used for local testing
 */
export function generateJWTToken(payload: any, expiresIn: string = '10s') {
    // read private key value
    const privateKey = process.env.JWT_SECRECT as string | '0';

    const signInOptions: SignOptions = {
        // algorithm: 'RS256',
        expiresIn: expiresIn,
    };
    // generate JWT
    return sign(payload, privateKey, signInOptions);
}
