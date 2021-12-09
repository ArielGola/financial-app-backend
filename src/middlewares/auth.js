const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../models/User');


const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;


passport.use('signup', new localStrategy({
    usernameField: "email",
    passwordField: "password"
}, async (email, password, done) => {
    try {
        const user = await UserModel.create({email, password});
        return done(null, user);
    } catch (error) {
        done(error)
    }
}));


passport.use('login', new localStrategy({
    usernameField: "email",
    passwordField: "password"
}, async (email, password, done) => {
    try {
        const user = await UserModel.findOne({email});
        if(!user) {
            return done(null, false, {message: "User not found in passport login"})
        };

        const matchPassword = await UserModel.comparePass(password, user.password);
        if (!matchPassword) {
            return done(null, false, {message: "Wrong password in passport login function"})
        };

        return done(null, user, {message: "Success login"})
    } catch (error) {
        return done(error);
    }
}))

passport.use(new JWTStrategy({
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
}, async (token, done) => {
    try {
        return done(null, token.user);
    } catch (error) {
        return done(error)
    }
}));