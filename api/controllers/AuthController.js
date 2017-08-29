/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {
  login: function (req, res) {
    res.send(200, {msg: 'you are logged in, we are redirecting you to your profile'});
  },
  process: function(req, res){
    passport.authenticate('local', function(err, staff, info){
      if ( (err) || (!staff) ) {
        return res.send({
          message: 'login failed'
        });
      }

      req.logIn(staff, function(err){
        if (err) res.send(err);
        return res.send({
          message: 'login successful'
        })
      });
    }) (req, res);
  },
  logout: function(req, res){
    req.logOut();
    res.send('logout successful');
  }
};

