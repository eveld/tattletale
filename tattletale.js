/* jslint node: true */
'use strict';

var strings = {
	USERCOLOR: 'USERCOLOR',
	EMOTESET: 'EMOTESET',
	SPECIALUSER: 'SPECIALUSER',
	CLEARCHAT: 'CLEARCHAT',
	HISTORYEND: 'HISTORYEND',
	SUBONLY_ON: 'This room is now in subscribers-only mode.',
	SUBONLY_OFF: 'This room is no longer in subscribers-only mode.',
	SLOWMODE_ON: 'This room is now in slow mode.',
	SLOWMODE_OFF: 'This room is no longer in slow mode.',
	R9K_ON: 'This room is now in r9k mode.',
	R9K_OFF: 'This room is no longer in r9k mode.',
	HOSTING: 'is now hosting you for'
};

var util = require('util');
var EventEmitter = require('events').EventEmitter;

var path = require('path');
var Etcd = require('node-etcd');
var factory = require('irc-factory');

// Set up logging.
var winston = require('winston');
var logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)({
			name: 'tattletale',
			level: 'debug',
			colorize: true,
			json: false,
			prettyprint: false
		})
	]
});

// Listener that handles all communication with twitch.
var Listener = function() {
	EventEmitter.call(this);

	this.api = new factory.Api();
};
util.inherits(Listener, EventEmitter);

// Connect to twitch.
Listener.prototype.start = function(user, host, port, auth, client) {
	var that = this;
	this.client = this.api.createClient(user, {
		nick: user,
		user: user,
		realname: user,
		server: host,
		port: port,
		password: auth
	});

	this.api.hookEvent(user, 'closed', function(error, message) {
		logger.error(message);
	});

	this.api.hookEvent(user, 'failed', function(error, message) {
		logger.error(message);
	});

	this.api.hookEvent(user, 'unknown', function(error, message) {
		logger.error(message);
	});

	// When connected, send twitchclient.
	this.api.hookEvent(user, 'registered', function() {
		logger.debug('Set twitchclient to %s', client);
		that.client.irc.raw('twitchclient ' + client, function(response) {
			logger.debug(response);
		});

		that.emit('connected', {});

		logger.debug('test');


	});
};

Listener.prototype.listen = function() {
	var that = this;
	// Process incoming messages.
	that.api.hookEvent('key', 'privmsg', function(message) {
		if(message.nickname === 'jtv') {
			that.processJtvMessage(message);
		}
		else if(message.nickname == 'twitchnotify') {
			that.processTwitchNotifyMessage(message);
		}
		else {
			that.processMessage(message);
		}
	});
};

// Process generic messages.
Listener.prototype.processMessage = function() {

};

// Process messages from twitchnotify.
Listener.prototype.processTwitchNotifyMessage = function(message) {
	var words = message.message.split(' ');
	if(words[1] == 'just' && words[2] == 'subscribed!') {
		var user = words[0];
		var count = words[3];

		logger.debug('%s %s', user, count);
	}
};

// Process messages from jtv.
Listener.prototype.processJtvMessage = function(message) {
	// The color of a user's nickname.
	if(message.message.indexOf(strings.USERCOLOR) === 0) {

	}
	// The emotes the user has access to.
	else if(message.message.indexOf(strings.EMOTESET) === 0) {
		
	}
	// The level of the user in this channel.
	else if(message.message.indexOf(strings.SPECIALUSER) === 0) {
		
	}
	// A user has been timed out.
	else if(message.message.indexOf(strings.CLEARCHAT) === 0) {
		
	}
	// History replay ended.
	else if(message.message.indexOf(strings.HISTORYEND) === 0) {

	}
	// Subscriber-only mode enabled.
	else if(message.message.indexOf(strings.SUBONLY_ON) === 0) {

	}
	// Subscriber-only mode disabled.
	else if(message.message.indexOf(strings.SUBONLY_OFF) === 0) {

	}
	// Slow-mode enabled.
	else if(message.message.indexOf(strings.SLOWMODE_ON) === 0) {

	}
	// Slow-mode disabled.
	else if(message.message.indexOf(strings.SLOWMODE_OFF) === 0) {

	}
	// R9k mode enabled.
	else if(message.message.indexOf(strings.R9K_ON) === 0) {

	}
	// R9k mode disabled.
	else if(message.message.indexOf(strings.R9K_OFF) === 0) {

	}
	// Channel is being hosted.
	else if(message.message.indexOf(strings.HOSTING) > -1) {
		var words = message.message.split(' ');
		var user = words[0];
		var viewers = words[6];

		logger.debug('%s %s', user, viewers);
	}
};

// Join twitch channel.
Listener.prototype.joinChannel = function(channel) {
	var that = this;
	this.client.irc.join(channel, function(error) {
		if(error) throw error;
	
		that.emit('join', {});
	});
};

// Leave twitch channel.
Listener.prototype.leaveChannel = function(channel) {
	var that = this;
	that.client.irc.part(channel, function(error) {
		if(error) throw error;
	});
};

// Disconnect from twitch.
Listener.prototype.stop = function(user) {
	var that = this;
	that.client.irc.disconnect();
	that.api.destroyClient(user);
};

// Connect to etcd
var etcd = new Etcd(['192.168.1.129:4001']);
etcd.get(path.join('/', 'services', 'tattletale', 'settings'), {
	wait: false
}, function(error, value) {
	if(error) throw error;

	var settings = JSON.parse(value.node.value);

	// Create a listener to fetch chat messages.
	var listener = new Listener();
	listener.start(settings.twitch.user, settings.twitch.host, settings.twitch.port, settings.twitch.auth, settings.twitch.client, settings.twitch.channels);

	listener.on('connected', function() {
		logger.debug('Connected');
		
		settings.twitch.channels.forEach(function(channel) {
			logger.debug('Joining %s', channel);
			//listener.joinChannel(channel);
		});	
	});

	listener.on('join', function(message) {
		logger.debug('Joined channel: %j', message);
	});
});