var TransactionTypes = require('../utils/transaction-types.js');
var constants = require('../utils/constants.js');
var httpCall = require('../utils/httpCall.js');
var belriumJS = require('chain-js');

app.route.put('/set',  async function (req) {
    console.log("req: ", req);

    let set = req.query.set;
    let fee = String(constants.fees.set * constants.fixedPoint);
    let type = TransactionTypes.SET; // withdraw money to mainchain
    let options = {
        fee: fee,
        type: type,
        args: JSON.stringify([set])
    };
    let secret = req.query.secret;

    let transaction = belriumJS.dapp.createInnerTransaction(options, secret);

    let dappId = app.id;

    let params = {
        transaction: transaction
    };

    console.log("set data: ", params);
    var res = await httpCall.call('PUT', `/api/dapps/${dappId}/transactions/signed`, params);

    return res;
})

app.route.get('/get',  async function (req) {
    console.log("req: ", req);
    let result = await app.model.Storage.findOne({
        condition: { owner: req.query.address }
    });
    return result;
})
