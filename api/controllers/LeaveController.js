/**
 * LeaveController
 *
 * @description :: Server-side logic for managing leave
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    calcuateLeaveDuration: function () {
        var leaveDuration = CommonService.calcuateLeaveDuration({
            start_date: req.param('start_date'),
            end_date: req.param('end_date')
        });
        


    }
};

