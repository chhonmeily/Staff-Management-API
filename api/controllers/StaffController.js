/**
 * StaffController
 *
 * @description :: Server-side logic for managing staffs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

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
        
        var numOfStaffPerPage = req.params.perpage;

        Staff.find({
            skip:0,
            limit: numOfStaffPerPage,
            sort: 'createAt DESC'
        }).exec(function (err, staffs){
            if (err) {
                return res.serverError(err);
            }

            return res.json(200, staffs);
        });
    }
};

