/**
 * Staff.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    // e.g., "polly"
    username: {
      type: 'string',
      required: true
    },

    full_name: {
      type: 'string',
      required: true
    },

    nick_name: {
      type: 'string'
    },

    phone_number: {
      type: 'string',
      required: true
    },

    email: {
      type: 'string',
      required: true
    },

    password: {
      type: 'string',
      required: true
    },

    role: {
      type: 'string',
      enum: ['Admin', 'Staff', 'Team Leader'],
      defaultsTo: 'Staff'
    },

    leave: {
      collection: 'Leave',
      via: 'requested_by'
    },

    track_time: {
      collection: 'Tracktime',
      via: 'staff'
    }

  }

};

