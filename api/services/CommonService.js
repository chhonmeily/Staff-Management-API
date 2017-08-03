
// api/services/CommonService.js

module.exports = {

    calculateDuration: function( options ) {
        var time_in = new Date(options.start_date);
        var time_out = new Date(options.end_date);
        console.log(time_in);
        console.log(time_out);
    }

};