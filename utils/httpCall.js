'use strict';

var request = require('request');
var constants = require('./constants.js');
const URL = constants.URL;
module.exports = {
	call: function(method, url_path, payload, cb){
		var options = {
			method: method,
			url: URL + '' + url_path,
			headers:{
				'Content-Type':'application/json'
			},
			body: JSON.stringify(payload)
		};
		function callback(error, response, body) {
  			if (!error && response.statusCode == 200) {
    			cb(null, JSON.parse(body));
  			} else {
  				cb(error, null);
  			}
		}
		request(options, callback);
	}
}
