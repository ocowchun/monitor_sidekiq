"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.reportMessage = reportMessage;

var _config = require("../config.js");

var rollbar = require("rollbar");
rollbar.init(_config.ROLLBAR_TOKEN, {
	environment: "production"
});

function reportMessage(error) {
	rollbar.handleErrorWithPayloadData(error, {
		level: "error",
		custom: {
			function_name: _config.FUNCTION_NAME
		}
	});
}