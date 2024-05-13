const passport = require('passport');
const LocalStrategy = require('passport-local');

const Admin = require('../models/Admin');

passport.use(new LocalStrategy(async function verify(username, password, cb) {
    const admin = await Admin.findOne({username});

    if(!admin) {
        return cb(null, false, {message: 'Incorrect username or password'});
    }

    if(password != admin.password) {
        return cb(null, false, {message: 'Incorrect username or password'});
    }

    return cb(null, admin);
}));


passport.serializeUser(function(user, cb){
  process.nextTick(function() {
    cb(null, {username: user.username});
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});


module.exports = passport;