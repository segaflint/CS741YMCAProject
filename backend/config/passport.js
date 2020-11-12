const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../database/models/user');
const dbconfig = require('./database');

module.exports = function(passport) {
    let opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
        secretOrKey: dbconfig.secret
    };
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        // console.log(jwt_payload);
        User.getUserById(jwt_payload.user._id, (error, user) => {
            if (error) {
                return done(error, false);
            }
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        });
    }));
}

