/**
 * StaffController
 *
 * @description :: Server-side logic for managing staffs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Passwords = require('machinepack-passwords');

module.exports = {

    signup: function (req, res) {
        Passwords.encryptPassword({
            password: req.param('password'),
        }).exec({
            error: function(err) {
                return err.serverError(err);
            },
            success: function(encryptedPassword) {

                //create staff
                Staff.create({
                    username: req.param('username'),
                    full_name: req.param('full_name'),
                    nick_name: req.param('nick_name'),
                    email: req.param('email'),
                    phone_number: req.param('phone_number'),
                    full_name: req.param('full_name'),
                    role: req.param('role'), 
                    password: encryptedPassword
                }).exec(function(err, newStaff){
                    if (err) {

                        // If this is NOT a waterline validation error, it is a mysterious error indeed.
                        var isWLValidationErr = _.isObject(err) && _.isObject(err.invalidAttributes);
                        if (!isWLValidationErr) {
                            return res.serverError(err);
                        }

                        // Otherwise, it must be a waterline validation error.

                        // If it doesn't contain a problem with the password, then just handle is
                        // using `res.badRequest()` like normal.
                        if (!_.isArray(err.invalidAttributes.password)) {
                            return res.badRequest(err);
                        }

                        // Otherwise, something was wrong with the provided encrypted password.
                        // So in this case, we'll modify the validation error in place to improve the error output
                        // and so that we don't inadvertently reveal info about the encrypted password.
                        // (specifically, we loop over the array of attribute errors and modify them).
                        err.invalidAttributes.password = _.map(err.invalidAttributes.password, function eachPasswordErr (passwordError) {
                            return _.reduce(passwordError, function (memo, val, key) {
                                var allOccurrencesOfEncryptedPassMatcher = new RegExp(_.escapeRegExp(encryptedPassword),'g');
                                memo[key] = val.replace(allOccurrencesOfEncryptedPassMatcher, '****');
                                return memo;
                            }, {});
                        });

                        // Finally, respond with the modified waterline validation error and a 400 status code.
                        return res.badRequest(err);
                    }

                    // Otherwise, `err` was falsy, so it worked!  The user was created.
                    // (maybe do other stuff here, or just send a 200 OK response)
                    return res.json(200, newStaff);
                });
            }
        });
    },

    update: function (req, res) {
        var staffId = req.params.staffid;
        Staff.find({
            id: staffId
        }).exec(function(err, staff){
            if (err) {
                res.serverError(err);
            }
            var staffFound = staff.pop();
            staffFound.username = req.body.username;
            staffFound.full_name = req.body.full_name;
            staffFound.nick_name = req.body.nick_name;
            staffFound.email = req.body.email;
            staffFound.phone_number = req.body.phone_number;
            staffFound.role = req.body.role;
            staffFound.save(function(err){
                if (err) {
                    res.serverError(err);
                }
                res.json(200, staffFound);    
            });
        });
    },

    changepassword: function(req, res) {

        var staffId = req.params.staffid;
        Staff.findOne({
            id: staffId
        }).exec(function(err, staff){
            if (err) {
                return res.serverError(err);
            }
            var oldEncryptedPassword = staff.password;
            //check if the password is match with existing using compare function
            var oldPasswordAttempt = req.body.old_password;
            console.log(oldPasswordAttempt);
            console.log(oldEncryptedPassword);
            Passwords.checkPassword({
                passwordAttempt: oldPasswordAttempt,
                encryptedPassword: oldEncryptedPassword,
            }).exec({
               
                error: function (err) {
                    return res.serverError(err);
                },
               
                incorrect: function () {
                    res.json({ msg: "You have entered a wrong password. Please enter your old password again." });
                },
               
                success: function () {
                    Passwords.encryptPassword({
                        password: req.body.new_password,
                    }).exec({
                        error: function(err) {
                            return res.serverError(err);
                        },
                        success: function(password) {
                            staff.password = password;
                            res.json(200, {msg:"You have changed your password successfully"});
                        }
                    });
                },
            });
        });
    },

	all: function(req, res){
      
        Staff.find({
            limit: 3
        }).exec(function afterFind(err, staffs) {
            if (err) {
                // uh oh
                // (handle error; e.g. `return res.serverError(err)`)
                return res.serverError(err);
            }
        
            return res.json(staffs)
        });    
    
    },

    perpage: function(req, res){
        
        var numOfStaffPerPage = req.params.perpage || 2;
        var numberOfPage = req.params.pages;

        Staff.find().paginate({
            page: numberOfPage,
            limit: numOfStaffPerPage
        })
        .populate("leave")
        .exec(function (err, staffs){
            if (err) {
                return res.serverError(err);
            }

            return res.json(200, staffs);
        });
    }
};

