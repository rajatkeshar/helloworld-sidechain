var schema = require('../schema/accounts.js');
var httpCall = require('../utils/httpCall.js');
var z_schema = require('../utils/zschema-express.js');

// Get Account Details by Secret of User
app.route.post('/accounts/open', async function (req, cb) {
    var validateSchema = await z_schema.validate(req.query, schema.open);

    var params = {
        secret: req.query.secret
    };

    var dappId = app.id;

    var res = await httpCall.call('POST', `/api/dapps/${dappId}/login`, params);
    return res;
});

// Get Account Balance By Address
app.route.get('/accounts/balance',  async function (req, cb) {
    var validateSchema = await z_schema.validate(req.query, schema.getBalance);

    var dappId = app.id;
    var address = req.query.address;

    var res = await httpCall.call('GET', `/api/dapps/${dappId}/accounts/${address}`);
    return res;
});
