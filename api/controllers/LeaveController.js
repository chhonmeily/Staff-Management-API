/**
 * LeaveController
 *
 * @description :: Server-side logic for managing leave
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  create: function(req, res) {
    Leave.create({
      leave_type: req.param("leave_type"),
      reason: req.param("reason"),
      start_date: req.param("start_date"),
      end_date: req.param("end_date"),
      duration: req.param("duration"),
      requested_by: req.param("requested_by"),
      approved_by: req.param("approved_by")
    }).exec(function(err, newLeave){
      if (err) {
        return res.serverError(err);
      }

      res.json(200, newLeave);
    });
  },

  update: function(req, res) {
    var leaveId = req.params.leaveid;
    Leave.find({
        id: leaveId
    }).exec(function(err, leave){
      if (err) {
        res.serverError(err);
      }
      var leaveFound = leave.pop();
      leaveFound.leave_type = req.body.leave_type;
      leaveFound.reason = req.body.reason;
      leaveFound.start_date = req.body.start_date;
      leaveFound.end_date = req.body.end_date;
      leaveFound.duration = req.body.duration;
      leaveFound.requested_by = req.body.requested_by;
      leaveFound.approved_by = req.body.approved_by;
      leaveFound.save(function(err){
        if (err) {
          res.serverError(err);
        }
        res.json(200, leaveFound);
      });
    });
  },

  byday: function(req, res) {
    var dayprovided
    var leaveid = req.params.leaveid;
    Leave.find({}).where({}).exec(function(err, leave){
      res.json(200, leave);
    });
  }
};

