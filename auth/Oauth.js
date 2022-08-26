import 'dotenv/config';
import passport from 'passport';
import User from '../model/UserModel.js'
import GoogleStrategy from 'passport-google-oauth20';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_OAUTH_CLIENTID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
    },
    (accessToken, refreshToken, profile, cb) => {
        User.findOrCreate({googleId: profile.id}, (err, user) => {
            return cb(err, user)
        })
    }
))

export default passport