import {
	notify
}
from './slack';
import {
	getSidekiqStats
}
from './sidekiq'

import {
	reportMessage
}
from './rollbar'

export default function(cb) {
	getSidekiqStats(function(err, result) {
		if (err === null) {
			let sidekiq = result.sidekiq;
			let limit = 50;
			let {
				enqueued, failed, processes
			} = sidekiq;

			console.log("enqueued:" + enqueued);
			console.log("failed:" + failed);

			if (enqueued > limit || failed > limit) {
				notify({
					text: 'Current sidekiq statistics',
					fields: {
						enqueued, failed, processes
					}
				}, function() {
					cb(null, 'success,but sidekiq has some problem :(');
				});
			} else {
				cb(null, 'success,and sidekiq works well :)');
			}
		} else {
			reportMessage(err);
			cb(err, 'failed :(');
		}
	});
}