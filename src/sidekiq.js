let request = require('request');
let url = require("url");
import {
  SIDEKIQ_HOST, SIDEKIQ_USER, SIDEKIQ_PASSWORD
}
from '../config.js'

export function getSidekiqStats(cb) {
  let url = SIDEKIQ_HOST + '/sidekiq/dashboard/stats';
  let user = SIDEKIQ_USER;
  let password = SIDEKIQ_PASSWORD;

  let options = {
    url: url,
    'auth': {
      'user': user,
      'pass': password,
      'sendImmediately': false
    }
  };

  request(options, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      let result = JSON.parse(body);
      cb(null, result);
    } else {
      cb('Sidekiq stats error');
    }
  });
}