'use strict';

module.exports = {
  outTransfer: {
    type: 'object',
    properties: {
      secret: {
        type: "string",
        minLength: 1,
        maxLength: 100
      },
      /*amount: {
        type: "integer",
        minimum: 1,
        maximum: constants.totalSupply
      },*/
      publicKey: {
        type: "string",
        format: "publicKey"
      },
      secondSecret: {
        type: "string",
        minLength: 1,
        maxLength: 100
      },
      dappId: {
        type: "string",
        format: "publicKey"
      }
    },
    required: ['secret', 'amount']
  },
  inTransfer: {
    type: 'object',
    properties: {
      secret: {
        type: "string",
        minLength: 1,
        maxLength: 100
      },
      /*amount: {
        type: "integer",
        minimum: 1,
        maximum: constants.totalSupply
      },*/
      recipientId: {
        type: 'string',
        minLength: 1
      },
      publicKey: {
        type: "string",
        format: "publicKey"
      },
      secondSecret: {
        type: "string",
        minLength: 1,
        maxLength: 100
      },
      dappId: {
        type: "string",
        format: "publicKey"
      }
    },
    required: ['secret', 'amount', 'recipientId']
  }
};
