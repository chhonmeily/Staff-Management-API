/**
 * Tracktime.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    staff: {
      model: 'Staff'
    },
    
    time_in: {
      type: 'date'
    },

    time_out: {
      type: 'date'
    },

    duration: {
      type: 'integer'
    },

    break: {
      type: 'date'
    },
    
    status: {
      type: 'boolean',
      defaulTo: false
    }
  }
};

