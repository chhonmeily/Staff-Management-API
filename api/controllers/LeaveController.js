/**
 * LeaveController
 *
 * @description :: Server-side logic for managing leave
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  
  index: function(req, res){
    Leave.find({})
    .populate('requested_by')
    .exec(function afterFind(err, leaves) {
      if (err) {
        return res.serverError(err);
      }
      return res.json(leaves);
    });
  },

  create: function(req, res) {
    var option = {
      start_date: req.param("start_date"),
      end_date: req.param("end_date")
    };
    var interval = "days";
    Leave.create({
      leave_type: req.param("leave_type"),
      reason: req.param("reason"),
      start_date: req.param("start_date"),
      end_date: req.param("end_date"),
      duration: CommonService.calculateDuration(option,interval),
      requested_by: req.param("requested_by"),
      approved_by: req.param("approved_by")
    })
    .exec(function(err, newLeave){

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
        return res.serverError(err);
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
          return res.serverError(err);
        }
        res.json(200, leaveFound);
      });
    });
  },

  search: function(req, res) {
    var queries = req.param("queries");
    Leave.find(queries).exec(function(err, leaves){
      if(err){
        return res.serverError(err);
      }
      res.send(leaves);
    });  
  },

  getbydate: function(req, res) {
    var data = req.body;
    var queries = {
      from_date: data.from_date,
      to_date: data.to_date
    };
    Leave.find({
      start_date: { 
        '>': data.from_date,
        '<': data.to_date 
      }
    })
    .populate("requested_by")
    .exec(function(err, leaves){
      if (err) {
        return res.serverError(err);
      }
      res.json(200, leaves);
    });
  }

};

