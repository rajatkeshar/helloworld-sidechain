'use strict';

module.exports = {
  getBalance: {
    type: 'object',
    properties: {
      address: {
        type: 'string',
        minLength: 1
      }
    },
    required: ['address']
  },
  open: {
    type: 'object',
      properties: {
        secret: {
          type: "string",
          minLength: 1,
          maxLength: 100
        }
      },
      required: ['secret']
  }
};
