import {
	ROLLBAR_TOKEN, FUNCTION_NAME
}
from '../config.js'
var rollbar = require("rollbar");
rollbar.init(ROLLBAR_TOKEN, {
	environment: "production"
});

export function reportMessage(error) {
	rollbar.handleErrorWithPayloadData(error, {
		level: "error",
		custom: {
			function_name: FUNCTION_NAME
		}
	})
}