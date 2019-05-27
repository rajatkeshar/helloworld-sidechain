var chainJS = require('chain-js');
var httpCall = require('../utils/httpCall.js');
var constants = require('../utils/constants.js');
var schema = require('../schema/transactions.js');
var z_schema = require('../utils/zschema-express.js');
var TransactionTypes = require('../utils/transaction-types.js');

// OutTransfer
app.route.put('/transaction/withdrawal', async function (req, cb) {
    var validateSchema = await z_schema.validate(req.query, schema.outTransfer);

    let fee = String(constants.fees.outTransfer * constants.fixedPoint);
    let type = TransactionTypes.OUT_TRANSFER; // withdraw money to mainchain
    let options = {
        fee: fee,
        type: type,
        args: JSON.stringify([constants.defaultCurrency, String(req.query.amount)])
    };
    let secret = req.query.secret;

    let transaction = chainJS.dapp.createInnerTransaction(options, secret);

    let dappId = app.id;

    let params = {
        transaction: transaction
    };

    console.log("outTransfer data: ", params);
    var res = await httpCall.call('PUT', `/api/dapps/${dappId}/transactions/signed`, params);

    return res;
});

// InTransfer (Internal transfer in DAPP)
app.route.put('/transaction/inTransfer', async function (req, cb) {
    var validateSchema = await z_schema.validate(req.query, schema.inTransfer);

    let secret = req.query.secret;
    let recipientId = req.query.recipientId;
    let fee = String(constants.fees.inTransfer * constants.fixedPoint);
    let type = TransactionTypes.IN_TRANSFER; // transaction within sidechain
    let options = {
        fee: fee,
        type: type,
        args: JSON.stringify([constants.defaultCurrency, String(req.query.amount), recipientId])
    }

    let transaction = chainJS.dapp.createInnerTransaction(options, secret);

    let dappId = app.id;

    let params = {
        transaction: transaction
    };

    console.log("inTransfer data: ", params);
    var res = await httpCall.call('PUT', `/api/dapps/${dappId}/transactions/signed`, params);

    return res;
});

// Get Unconfirmed Transactions
app.route.get('/transaction/unconfirmed',  async function (req) {
    var dappId = app.id;
    var offset = (req.query.offset)? req.query.offset: 0;
    var limit = (req.query.limit)? req.query.limit: 20;

    var res = await httpCall.call('GET', `/api/dapps/${dappId}/transactions/unconfirmed?offset=${offset}&limit=${limit}`);
    return res;
});

// Get Transactions by transactionId
app.route.get('/transaction/confirmed',  async function (req) {
    var dappId = app.id;
    var offset = (req.query.offset)? req.query.offset: 0;
    var limit = (req.query.limit)? req.query.limit: 20;

    var res = await httpCall.call('GET', `/api/dapps/${dappId}/transactions?offset=${offset}&limit=${limit}`);
    return res;
});

// Get Internal Transactions
app.route.get('/transaction/transfers',  async function (req) {
    var dappId = app.id;
    var offset = (req.query.offset)? req.query.offset: 0;
    var limit = (req.query.limit)? req.query.limit: 20;

    var res = await httpCall.call('GET', `/api/dapps/${dappId}/transfers?offset=${offset}&limit=${limit}`);
    return res;
});
