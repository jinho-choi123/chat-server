import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import 'dotenv/config';
import {User} from '../model/UserModel.js'

passport.serializeUser((user, done) => {
    done(null, user.id);
})

//get user id and find user data
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then((user) => {
            done(null, user)
        })
        .catch((err) => {
            console.log(err)
        })
})

passport.use(
    new GoogleStrategy({
    //options for google strategy
    clientID: process.env.GOOGLE_OAUTH_CLIENTID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    callbackURL: "http://localhost:9000/auth/google/redirect",
    }, (accessToken, refreshToken, profile, done) => {
        console.log('passport callback function fired')
        //passport callback function 
        const firstname = profile.name.givenName;
        const lastname = profile.name.familyName;
        const googleId = profile.id;
        const nickname = profile.displayName;

        User.findOne({googleId: googleId})
            .then((doc) => {
                if (doc) {
                    //if exists
                    done(null, doc)
                } else {
                    new User({
                        firstName: firstname,
                        lastName: lastname,
                        nickName: nickname,
                        googleId: googleId,
                        joinedRoom:[]
                    }).save()
                    .then((res) => {
                        done(null, res)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
        
    })

    )

export default passport