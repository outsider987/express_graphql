import { TypedRequestBody } from '../../utils/request';
import { Request, Response } from 'express';
import BaseService from '../../common/baseService';
import { PrismaClient, user } from '@prisma/client';
import bcrypt from 'bcrypt';
import { generateJWTToken } from '../../utils/jwt';
import AuthException from '../../exceptions/AuthException';

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

    async refresh(res: TypedRequestBody) {
        const { email, user_id } = res.auth;

        if (!email || !user_id) throw AuthException.tokenNotExist({ email, user_id });

        const data = await this.prisma.user.findFirst({ where: { email, id: user_id } });
        if (!data) throw AuthException.loginNoUser(data);

        return await this.createTokens({ username: data.username, email: data.email, user_id: data.id });
    }

    async passwordGrant(email: string, password: string) {
        const data = await this.prisma.user.findFirst({ where: { email } });
        if (!data) throw AuthException.loginNoUser(data);

        if (await !bcrypt.compare(data?.password, password)) throw AuthException.loginNoUser(data);

        return this.createTokens({ username: data.username, email: data.email, user_id: data.id });
    }

    async createTokens(dto: { username: string; email: string; user_id: number }) {
        const accessToken = generateJWTToken({ ...dto });
        const refreshToken = generateJWTToken({ ...dto }, '20s');

        console.log('start JWT sign ');

        const token = await this.prisma.refresh_token.upsert({
            where: { user_id: dto.user_id },
            update: {
                refresh_token_id: refreshToken,
            },
            create: { user_id: dto.user_id, refresh_token_id: refreshToken },
        });
        if (!token) AuthException.createTokenFailed(token);

        console.log('finished JWT sign ');
        return { accessToken, refreshToken };
    }

    async saveGoogleUser(user: any) {
        const hashPassword = await bcrypt.hash(user.id, 15);
        const userResult = await this.prisma.user.findUnique({ where: { email: user._json.email } });
        if (!userResult) {
            const res = await this.prisma.user.create({
                data: { email: user._json.email, username: user._json.displayName, password: hashPassword },
            });

            return this.prisma.oauth2_provider.upsert({
                where: {
                    provider_oauth2_id: { oauth2_id: user.id, provider: 'google' },
                },
                create: {
                    oauth2_id: user.id,
                    user_id: res.id,
                    email: user._json.email,
                    provider: 'google',
                },
                update: {
                    email: user._json.email,
                },
            });
        } else {
            return userResult;
        }
    }

    async getGoogleUserByGoogleId(google_id: any, provider: any) {
        return this.prisma.oauth2_provider.findUnique({
            where: { provider_oauth2_id: { oauth2_id: google_id, provider: provider } },
        });
    }
}
export default AuthService;
