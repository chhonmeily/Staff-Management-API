/**
 * TracktimeController
 *
 * @description :: Server-side logic for managing tracktimes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  //index = view all created tracktime
  index: function(req, res) {
    Tracktime.find({}).exec(function(err, tracktimes){
      if(err) return res.serverError(err);
      return res.send(tracktimes);
    });
  },
  //create trackingtime
  create: function(req, res) {
    Tracktime.create({
      staff: req.body.staffid,
      time_in: options.start_time
    }).exect(function(err, tracktimes){
      if (err) return res.serverError(err);
      return res.send(tracktimes);
    });
  },
  //update trackingtime by change status from false
  update: function(req, res) {

  },
  //delete
  delete: function(req, res) {

  }
};

