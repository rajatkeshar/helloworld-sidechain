var belriumJS = require('belrium-js');
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
