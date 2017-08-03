/**
 * Leave.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    leave_type: {
      type: 'string',
      enum: ["Sick Day","Leave Early","Personal Leave","Family Leave","Temporary Disable Leave","Paid Leave","Other"],
      defaultsTo: "Personal Leave"
    },

    reason: {
      type: 'string'
    },

    start_date: {
      type: 'date'
    },

    end_date: {
      type: 'date'
    },

    duration: {
      type: 'integer'
    },

    requested_by: {
      model: 'Staff'
    },

    approved_by: {
      model: 'Staff'
    }
    
  }

};

