'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSidekiqStats = getSidekiqStats;

var _config = require('../config.js');

var request = require('request');
var url = require("url");
function getSidekiqStats(cb) {
  var url = _config.SIDEKIQ_HOST + '/sidekiq/dashboard/stats';
  var user = _config.SIDEKIQ_USER;
  var password = _config.SIDEKIQ_PASSWORD;

  var options = {
    url: url,
    'auth': {
      'user': user,
      'pass': password,
      'sendImmediately': false
    }
  };

  request(options, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var result = JSON.parse(body);
      cb(null, result);
    } else {
      cb('Sidekiq stats error');
    }
  });
}