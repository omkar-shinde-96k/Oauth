const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const { User } = require('./models/user')       // User Model
require('./database/connection')()              // Database connection
const passport = require('passport');

const Strategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

app.get('/users', async (req, res) => {   // Get saved user from database
    const users = await User.find()
    res.json(users);
})

//  passport js code  
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

let token = ""

// ***************************  Google start **********************************

passport.use(new GoogleStrategy({
    clientID: "539457339309-59p05pqskojbhmk91kscjjuh9f189thh.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:5000/google",
    profileFields: ['id', 'displayName', 'email']
}, async function (accessToken, refreshToken, profile, cb) {

    let isExists = await User.isExists(profile._json.email)
    if (!isExists) {
        const user = await new User({ name: profile.displayName, email: profile._json.email }).save()
    } else {
        console.log("user already exist, welcome back");
    }
    cb(null, profile);

}
));

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.use('/google', passport.authenticate('google', { failureRedirect: '/failed/login' }),
    async function (req, res) {

        payload = {
            name: req.user.displayName,
            email: req.user._json.email,
        }
        token = jwt.sign(payload, "omkarshinde", { expiresIn: "999 days" })

        res.redirect("http://localhost:3000")
    });

// ***************************  Google auth End **********************************


// ***************************  FB auth Start **********************************

passport.use(new Strategy({
    clientID: '675156530560931',
    clientSecret: 'c8bf248e5761320f2933b232331dc7a8',
    callbackURL: 'http://localhost:5000/fb/auth',
    profileFields: ['id', 'displayName', 'email']
}, async function (accessToken, refreshToken, profile, done) {

    let isExists = await User.isExists(profile._json.email)

    if (!isExists) {
        const user = await new User({ name: profile.displayName, email: profile._json.email }).save()
    } else {
        console.log("user already exist, welcome back");
    }

    done(null, profile);
}
))

app.get('/login/fb', passport.authenticate('facebook'));

app.get('/fb/auth', passport.authenticate('facebook', { failureRedirect: '/failed/login' }), async function (req, res) {
    payload = {
        name: req.user.displayName,
        email: req.user._json.email,
    }
 
    token = jwt.sign(payload, "omkarshinde", { expiresIn: "999 days" })

    res.redirect("http://localhost:3000");
});

// ***************************  FB auth End *********************************


app.get("/getLoginUser", (req, res) => {

    const bearerToken = req.headers.authorization

    if (bearerToken !== "null") {

        if (!bearerToken) {
            return res.status(401).send("login first")
        }

        const loggedInUser = jwt.verify(bearerToken, "omkarshinde")

        res.status(200).json({
            success: true,
            message: "successfull",
            user: loggedInUser,
        });

    } else {

        if (req.user) {
            res.status(200).json({
                success: true,
                message: "successfull",
                user: {
                    name: req.user.displayName,
                },
                token
            });
        } else {
            res.status(404).json({
                success: false,
                message: "login first",
            });
        }
    }
});


app.get('/logout', (req, res) => {
    req.logout();
    console.log("is auth", req.isAuthenticated());
    res.send('user is logged out');
})

app.listen(5000, () => {
    console.log('server is started');
})


