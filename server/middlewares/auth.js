const User = require('../models/user'); // get our mongoose model
const jwtsecret = "mysecretkey"; // ключ для подписи JWT
const passport = require('passport'); // passport
const LocalStrategy = require('passport-local'); // локальная стратегия авторизации
const JwtStrategy = require('passport-jwt').Strategy; // авторизация через JWT
const ExtractJwt = require('passport-jwt').ExtractJwt; // авторизация через JWT

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
        if (err) done(err);
        if (!user) done({ error: 'User not found' });
        if (user) {
            if (user.checkPassword(password, user.passwordHash)) done(null, user)
            else {
                done(null, false, { message: 'Incorrect password or name.' })
            }
        }
    });
}))

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtsecret
};

passport.use(new JwtStrategy(jwtOptions, function (payload, done) {
    User.findById(payload.id, (err, user) => {
        if (err) {
            return done(err)
        }
        if (!user) done({ error: 'User not found' });
        if (user) {
            done(null, user)
        } else {
            done(null, false)
        }
    })
})
);

module.exports = passport;