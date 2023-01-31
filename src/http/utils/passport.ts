import { PrismaClient } from '@prisma/client';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import jwt from 'jsonwebtoken';

require('dotenv').config();
passport.serializeUser(function (user: any, done) {
    done(null, user);
});

passport.deserializeUser(function (user: any, done) {
    return done(null, user);
});

export default passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID as any,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as any,
            callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
            scope: ['openid', 'email', 'profile'],
        },
        async (accessToken, refreshToken, profile, done) => {
            await done(null, profile);
            // Find or create the user here
        },
    ),
);
