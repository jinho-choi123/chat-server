import Router from 'express';
import passport from '../auth/passport.js'

const router = Router();

router.get('/logout', (req, res) =>{
    //handle with passport
    res.send("logout from google")
})

router.get('/google', passport.authenticate("google", {
    scope: ['profile']
})
)

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('http://localhost:3000/');
})

export default router