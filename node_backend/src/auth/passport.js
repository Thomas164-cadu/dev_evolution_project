const passport = require('passport');
const passportJWT = require('passport-jwt');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT. ExtractJwt;

const modelUsuario = require('../models/usuario');

passport.use('token', new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret'
}, async (payload, done)=>{
    try {
        const user = await modelUsuario.findOne({ _id: payload });
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}))

module.exports = passport