var aschJS = require('asch-js');
var constants = require('../utils/constants.js');
var TransactionTypes = require('../utils/transaction-types.js');
var httpCall = require('../utils/httpCall.js');

// OutTransfer
app.route.put('/transactions/withdrawal', async function (req, cb) {
    console.log("calling outTransfer");

    var ac_params = {
        secret: req.query.secret,
        countryCode: req.query.countryCode
    };
    var response = await httpCall.call('POST', `/api/accounts/open`, ac_params);

    if(response && response.account) {
        if(response.account.status) {
            let fee = String(constants.fees.outTransfer * constants.fixedPoint);
            let type = TransactionTypes.OUT_TRANSFER; // withdraw money to mainchain
            let options = {
                fee: fee,
                type: type,
                args: JSON.stringify([constants.defaultCurrency, String(req.query.amount)])
            };
            let secret = req.query.secret;

            let transaction = aschJS.dapp.createInnerTransaction(options, secret);

            let dappId = req.query.dappId;

            let params = {
                transaction: transaction
            };

            var res = await httpCall.call('PUT', `/api/dapps/${dappId}/transactions/signed`, params);

            return res;
        } else {
            return {error: "wallet not verified!"};
        }
    } else {
        return response;
    }
});

// InTransfer (Internal transfer in DAPP)
app.route.put('/transactions/inTransfer', async function (req, cb) {
    console.log("calling inTransfer");

    var ac_params = {
        secret: req.query.secret,
        countryCode: req.query.countryCode
    };
    var response = await httpCall.call('POST', `/api/accounts/open`, ac_params);

    if(response && response.account) {
        if(response.account.status) {
            let fee = String(constants.fees.inTransfer * constants.fixedPoint);
            let type = TransactionTypes.IN_TRANSFER; // transaction within sidechain
            let options = {
                fee: fee,
                type: type,
                args: JSON.stringify([constants.defaultCurrency, String(req.query.amount), req.query.recipientId])
            }
            let secret = req.query.secret;

            let transaction = aschJS.dapp.createInnerTransaction(options, secret);

            let dappId = req.query.dappId;

            let params = {
                transaction: transaction
            };

            var res = await httpCall.call('PUT', `/api/dapps/${dappId}/transactions/signed`, params);

            return res;
        } else {
            return {error: "wallet not verified!"};
        }
    } else {
        return response;
    }
});

// Get Account Details
app.route.post('/accounts',  async function (req) {
    console.log("calling get account details");
    var params = {
        secret: req.query.secret,
        countryCode: req.query.countryCode
    };

    console.log("params: ", params);

    var res = await httpCall.call('POST', `/api/accounts/open`, params);

    return res;
})
