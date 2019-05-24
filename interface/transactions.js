var crypto = require('crypto');
var belriumJS = require('chain-js');
var ed = require('../utils/ed.js');
var httpCall = require('../utils/httpCall.js');
var constants = require('../utils/constants.js');
var schema = require('../schema/transactions.js');
var addressHelper = require('../utils/address.js');
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

    let transaction = belriumJS.dapp.createInnerTransaction(options, secret);

    let dappId = req.query.dappId;

    let params = {
        transaction: transaction
    };

    /*var data = {
        secret: secret,
        fee: fee,
        type: type,
        args: JSON.stringify([constants.defaultCurrency, String(req.query.amount)])
    };*/
    console.log("outTransfer data: ", params);
    var res = await httpCall.call('PUT', `/api/dapps/${dappId}/transactions/signed`, params);

    return res;
});

// InTransfer (Internal transfer in DAPP)
app.route.put('/transaction/inTransfer', async function (req, cb) {
    var validateSchema = await z_schema.validate(req.query, schema.inTransfer);

    let fee = String(constants.fees.inTransfer * constants.fixedPoint);
    let type = TransactionTypes.IN_TRANSFER; // transaction within sidechain
    let options = {
        fee: fee,
        type: type,
        args: JSON.stringify([constants.defaultCurrency, String(req.query.amount), recipientId])
    }
    let secret = req.query.secret;

    let transaction = belriumJS.dapp.createInnerTransaction(options, secret);

    let dappId = req.query.dappId;

    let params = {
        transaction: transaction
    };

    /*let newData = {
        secret: secret,
        fee: fee,
        type: type, // internal transfer
        args: JSON.stringify([constants.defaultCurrency, String(req.query.amount), recipientId])
    };*/
    console.log("inTransfer data: ", params);
    var res = await httpCall.call('PUT', `/api/dapps/${dappId}/transactions/signed`, params);

    return res;
});

// Get Unconfirmed Transactions
app.route.get('/transaction/unconfirmed',  async function (req) {
    var dappId = req.query.dappId;
    var offset = (req.query.offset)? req.query.offset: 0;
    var limit = (req.query.limit)? req.query.limit: 20;

    var res = await httpCall.call('GET', `/api/dapps/${dappId}/transactions/unconfirmed?offset=${offset}&limit=${limit}`);

    // res.transactions.forEach(function(trs, index) {
    //     trs.args = JSON.parse(trs.args);
    //     trs.recipientId = addressHelper.isBase58CheckAddress(trs.args[trs.args.length-1])? trs.args[trs.args.length-1]: null;
    //     trs.currency = trs.args[0];
    //     trs.amount = parseInt(trs.args[1]);
    //     delete trs.args;
    // });

    return res;
});

// Get Transactions by transactionId
app.route.get('/transaction/confirmed',  async function (req) {
    var dappId = req.query.dappId;
    var offset = (req.query.offset)? req.query.offset: 0;
    var limit = (req.query.limit)? req.query.limit: 20;

    var res = await httpCall.call('GET', `/api/dapps/${dappId}/transactions?offset=${offset}&limit=${limit}`);

    // res.transactions.forEach(function(trs, index) {
    //     trs.args = JSON.parse(trs.args);
    //     trs.recipientId = addressHelper.isBase58CheckAddress(trs.args[trs.args.length-1])? trs.args[trs.args.length-1]: null;
    //     trs.currency = trs.args[0];
    //     trs.amount = parseInt(trs.args[1]);
    //     delete trs.args;
    // });

    return res;
});

// Get Internal Transactions
app.route.get('/transaction/transfers',  async function (req) {
    var dappId = req.query.dappId;
    var offset = (req.query.offset)? req.query.offset: 0;
    var limit = (req.query.limit)? req.query.limit: 20;

    var res = await httpCall.call('GET', `/api/dapps/${dappId}/transfers?offset=${offset}&limit=${limit}`);

    return res;
});
