import Router from 'express';
import passport from '../auth/passport.js'

const router = Router();

router.get('/logout', (req, res) =>{
    //handle with passport
    req.logout((err) => {
        if(err) {console.log(err)} 
        console.log("Someone request to logout")
        req.session.save(() => {
            res.send('logout success')
        })
    })
})

router.get('/verify', (req, res) => {
    if(req.user) {
        console.log('verified')
        console.log(req.user)
        res.status(200).send({'verification': true, 'nickname': req.user.nickName, 'id': req.user.id})
    } else {
        console.log('not verified')
        res.status(202).send({'verification': false})
    }
})

router.get('/google', passport.authenticate("google", {
    scope: ['profile']
})
)

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('http://localhost:3000/');
})

export default router