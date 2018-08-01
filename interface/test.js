var aschJS = require('asch-js');
var axios = require('axios');

app.route.get('/test',  async function (req) {
  return { message: 'DAPP API is ready' }
})

app.route.put('/ping/:seq',  async function (req) {
  return { pong: Number(req.params.seq) + 1 }
})

app.route.post('/sleep',  async function (req, cb) {
  if (!req.query || !req.query.seconds) {
    throw new Error('Invalid params')
  }
  await new Promise(resolve => setTimeout(resolve, Math.floor(Number(req.query.seconds) * 1000)))
})

app.route.put('/withdrawal', async function (req, cb) {
  let fee = String(0.1 * 100000000)
  let type = 2 // withdraw money to mainchain
  let options = {
    fee: fee,
    type: type,
    args: JSON.stringify(['BEL', '10000000000'])
  }
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
  let fee = String(0.1 * 100000000)
  let type = 3 // transaction within sidechain
  let options = {
    fee: fee,
    type: type,
    args: JSON.stringify(['XAS', '100000000', 'A4q6RGhAzKBBRHQg1X7NqXmrekrEe4YRZ7'])
  }
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
    return {error: "error occured"};
  }
});
