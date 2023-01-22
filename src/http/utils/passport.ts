import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

export default passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID as any,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as any,
            callbackURL: '/auth/google/callback',
        },
        async (_accessToken: any, _refreshToken: any, _profile: any) => {
            // Find or create the user here
        },
    ),
);
