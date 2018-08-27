var aschJS = require('asch-js');
var schema = require('../schema/accounts.js');
var httpCall = require('../utils/httpCall.js');
var constants = require('../utils/constants.js');
var z_schema = require('../utils/zschema-express.js');
var TransactionTypes = require('../utils/transaction-types.js');

// Get Account Details
app.route.post('/balance',  async function (req, cb) {
    var validateSchema = await z_schema.validate(req.query, schema.getBalance);

    var dappId = req.query.dappId;
    var address = req.query.address.slice(0, -2);
    var res = await httpCall.call('GET', `/api/dapps/${dappId}/accounts/${address}`);
    return res;
});
