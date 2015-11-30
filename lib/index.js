'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (cb) {
	(0, _sidekiq.getSidekiqStats)(function (err, result) {
		if (err === null) {
			var sidekiq = result.sidekiq;
			var limit = 50;
			var enqueued = sidekiq.enqueued;
			var failed = sidekiq.failed;
			var processes = sidekiq.processes;

			console.log("enqueued:" + enqueued);
			console.log("failed:" + failed);

			if (enqueued > limit || failed > limit) {
				(0, _slack.notify)({
					text: 'Current sidekiq statistics',
					fields: {
						enqueued: enqueued, failed: failed, processes: processes
					}
				}, function () {
					cb(null, 'success,but sidekiq has some problem :(');
				});
			} else {
				cb(null, 'success,and sidekiq works well :)');
			}
		} else {
			(0, _rollbar.reportMessage)(err);
			cb(err, 'failed :(');
		}
	});
};

var _slack = require('./slack');

var _sidekiq = require('./sidekiq');

var _rollbar = require('./rollbar');