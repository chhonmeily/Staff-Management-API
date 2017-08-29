/**
 * TracktimeController
 *
 * @description :: Server-side logic for managing tracktimes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var moment = require('moment');
moment().format();

module.exports = {
  //index = view all created tracktime
  index: function(req, res) {
    var staffid = req.param('staffid');
    var data = {};
    if (staffid) {
      data = {
        staff: staffid
      }
    } 
    Tracktime.find(data)
    .populate('staff')
    .exec(function(err, tracktimes){
      if(err) return res.serverError(err);
      return res.send(tracktimes);
    });
  },
  
  //create trackingtime
  create: function(req, res) {
    Tracktime.create({
      staff: req.body.staff,
      time_in: req.body.time_in,
      status: 'active'
    }).exec(function(err, tracktimes){
      if (err) return res.serverError(err);
      return res.send(tracktimes);
    });
  },

  //update trackingtime by change status from false to true
  update: function(req, res) {
    var data = req.body;
    var staffid = req.param('staffid');
    var time_out = req.body.time_out;
    Tracktime.findOne({
      staff: staffid
    }).exec(function(err, updateTracktime){
      var option = {
        start_date: updateTracktime.time_in,
        end_date: req.body.time_out
      };
      var interval = 'hours';
      if (err) {
        return res.serverError(err);
      }
      updateTracktime.time_out = req.body.time_out;
      updateTracktime.duration = CommonService.calculateDuration(option,interval),
      updateTracktime.status = 'inactive';
      var isToday = moment(time_out).isSame(Date.now(), 'day');
      if (isToday) {
        updateTracktime.save(function(err){
          if (err) {
            return res.serverError(err);
          }
          return res.send(200, updateTracktime);
        });
      } else {
        return res.send(400, 'Please check the Time and Date Setting on your device.');
      }
    });
  }
};

