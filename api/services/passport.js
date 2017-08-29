// api/services/passport.js

var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;
// bcrypt = require('bcrypt');

var Passwords = require('machinepack-passwords');

passport.serializeUser(function(staff, done) {
  done(null, staff.id);
});

passport.deserializeUser(function(id, done) {
  Staff.findById(id, function(err, staff) {
    done(err, staff);
  });
});

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
},
  function(username, password, done) {
      Staff.findOne({ username: username }).exec(function(err, staff) {
        if(err) { return done(err); }
        if(!staff) { return done(null, false, { message: 'Unknown staff ' + username }); }
        // bcrypt.compare(password, staff.password, function(err, res) {
        //   if(!res) return done(null, false, {message: 'Invalid Password'});
        //   return done(null, staff);
        // });

        var oldEncryptedPassword = staff.password;
        var oldPasswordAttempt = password;
        //check if the password is match with existing using compare function
        Passwords.checkPassword({
          passwordAttempt: oldPasswordAttempt,
          encryptedPassword: oldEncryptedPassword,
        }).exec({
          error: function (err) {
            return res.serverError(err);
          },
          incorrect: function () {
            res.json({ msg: "You have entered a wrong password. Please re-enter your password again." });
          },
          success: function () {
            return done(null, staff);
          },
        });
      });
  }
));
