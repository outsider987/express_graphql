import { TypedRequestBody } from './../utils/request';
import { Request, Response } from 'express';
import BaseService from './baseService';
import { user } from '@prisma/client';
import bcrypt from 'bcrypt';
import { generateJWTToken } from '../utils/jwt';
import AuthException from '../exceptions/AuthException';

class AuthService extends BaseService {
  async register(res: Request) {
    const { password, username, email } = res.body as user;
    const hashPassword = await bcrypt.hash(password, 15);

    const user = await this.prisma.user.create({
      data: { username, password: hashPassword, email },
    });

    return this.passwordGrant(email, password);
  }

  async login(res: Request) {
    const { password, email } = res.body as user;
    return await this.passwordGrant(email, password);
  }

  async refresh(res: TypedRequestBody<any>) {
    const { email, user_id } = res.auth as user;

    if (!email || !user_id) throw AuthException.tokenNotExist({ email, user_id });

    const data = await this.prisma.user.findFirst({ where: { email, user_id } });
    if (!data) throw AuthException.loginNoUser(data);

    return await this.createTokens(data.username, data.email, data.user_id);
  }

  async passwordGrant(email: string, password: string) {
    // const password = bcrypt.compare(password_i)
    const data = await this.prisma.user.findFirst({ where: { email } });
    if (!data) throw AuthException.loginNoUser(data);

    if (await !bcrypt.compare(data?.password, password))
      throw AuthException.loginNoUser(data);

    return this.createTokens(data.username, data.email, data.user_id);
  }

  async createTokens(username: string, email: string, user_id: number) {
    const accessToken = generateJWTToken({ username: username, email: email });
    const refreshToken = generateJWTToken({ username, email, user_id }, '2h');

    const refershData = await this.prisma.refresh_token.findFirst({ where: { user_id } });

    console.log('start JWT sign ');
    if (refershData) {
      this.prisma.refresh_token.update({
        where: { id: refershData?.id },
        data: {
          refresh_token_id: refreshToken,
        },
      });
    } else {
      const token = await this.prisma.refresh_token.create({
        data: {
          user_id,
          refresh_token_id: refreshToken,
        },
      });
      if (!token) AuthException.createTokenFailed(token);
    }
    console.log('finished JWT sign ');
    return { accessToken, refreshToken };
  }
}
export default AuthService;
