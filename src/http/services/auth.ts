import { Request, Response } from 'express';
import BaseService from './baseService';
import jwt from 'jsonwebtoken';
import { user } from '@prisma/client';
import bcrypt from 'bcrypt';

class AuthService extends BaseService {
  async register(res: Request) {
    const { password, username, email } = res.body as user;
    const hashPassword = await bcrypt.hash(password, 15);

    console.log('start JWT sign ');

    const accessToken = await generateAccessToken({ username: username, email: email });
    const refreshToken = await jwt.sign(
      { username: username, email: email } as user,
      '0'
    );

    console.log('finished JWT sign ');

    const user = await this.prisma.user.create({
      data: { username, password: hashPassword, email },
    });
    const token = await this.prisma.refresh_token.create({
      data: {
        user_id: user.user_id,
        refresh_token_id: refreshToken,
      },
    });

    console.log(token);
    return { accessToken, refreshToken };
  }
}
export default AuthService;
function generateAccessToken(user: any) {
  return jwt.sign(user, '1', { expiresIn: '1hr' });
}
