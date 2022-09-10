import { sign, SignOptions } from 'jsonwebtoken';
require('dotenv').config();
/**
 * generates JWT used for local testing
 */
export function generateJWTToken(payload: any, expiresIn: string = '1h') {
  // read private key value
  const privateKey = process.env.JWT_SECRECT as string | '0';

  const signInOptions: SignOptions = {
    // algorithm: 'RS256',
    expiresIn: expiresIn,
  };
  // generate JWT
  return sign(payload, privateKey, signInOptions);
}
export function test() {}

// export function validateToken(token: string): Promise<TokenPayload> {
//     const publicKey = fs.readFileSync(path.join(__dirname, './../../../public.key'));

//     const verifyOptions: VerifyOptions = {
//       algorithms: ['RS256'],
//     };

//     return new Promise((resolve, reject) => {
//       verify(token, publicKey, verifyOptions, (error, decoded: TokenPayload) => {
//         if (error) return reject(error);

//         resolve(decoded);
//       })
//     });
//   }
