var aschJS = require('asch-js');
var axios = require('axios');
var constants = require('./constants.js');
var TransactionTypes = require('./transaction-types.js');

app.route.put('/transactions/withdrawal', async function (req, cb) {
    console.log("calling outTransfer");
    let fee = String(constants.fees.outTransfer * constants.fixedPoint);
    let type = TransactionTypes.OUT_TRANSFER; // withdraw money to mainchain
    let options = {
      fee: fee,
      type: type,
      args: JSON.stringify([constants.defaultCurrency, req.query.amount])
    };
    let secret = req.query.secret;

    let transaction = aschJS.dapp.createInnerTransaction(options, secret)

    let dappId = req.query.dappId;

    let url = `http://localhost:9305/api/dapps/${dappId}/transactions/signed`
    let data = {
      transaction: transaction
    }

    let headers = {
      magic: '594fe0f3',
      version: ''
    }

    var res = await axios.put(url, data, headers)

    console.log("res: ", res.data);
    if(res && res.data && res.data.transactionId) {
      return {transactionId: res.data.transactionId};
    } else {
      return {error: res.data.error};
    }
  });

  app.route.put('/transactions/inTransfer', async function (req, cb) {
    console.log("calling inTransfer");
    let fee = String(constants.fees.inTransfer * constants.fixedPoint);
    let type = TransactionTypes.IN_TRANSFER; // transaction within sidechain
    let options = {
      fee: fee,
      type: type,
      args: JSON.stringify([constants.defaultCurrency, req.query.amount, req.query.recipientId])
    }
    let secret = req.query.secret;

    let transaction = aschJS.dapp.createInnerTransaction(options, secret)

    let dappId = req.query.dappId;

    let url = `http://localhost:9305/api/dapps/${dappId}/transactions/signed`

    let data = {
      transaction: transaction
    }
    console.log("data: ", data);
    let headers = {
      magic: '594fe0f3',
      version: ''
    }

    var res = await axios.put(url, data, headers)

    console.log("res: ", res.data);
    if(res && res.data && res.data.transactionId) {
      return {transactionId: res.data.transactionId};
    } else {
      return {error: "error occured"};
    }
  });
