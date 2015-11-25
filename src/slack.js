import {
	SLACK_WEBHOOK_URL
}
from '../config'
let slack = require('slack-notify')(SLACK_WEBHOOK_URL);


export var notify = slack.extend({
	channel: '#system',
	username: "澤拉圖",
	icon_url: 'http://i.imgur.com/h9bJOPw.png'
});
