/* jshint node: true */
'use strict';

var EventEmitter = require('events').EventEmitter;
var util = require('util');
var path = require('path');
var Etcd = require('node-etcd');
var bunyan = require('bunyan');

var etcd = new Etcd(['192.168.1.118:4001']);
var settings;

/**
 * Tattletale collects messages from Twitch chat.
 */
function Tattletale() {
	EventEmitter.call(this);
}
util.inherits(Tattletale, EventEmitter);

/**
 * Fetch settings for this node from etcd.
 * @emit gotsettings
 */
Tattletale.prototype.fetchSettings = function() {
	var location = path.join('/tattletale', 'settings');
	var options = {
		wait: false
	};

	// etcd.get(location, options, function gotSettings(error, value) {
	// 	if (error) console.error(error);

	// 	var settings = JSON.parse(value.node.value);
	// 	console.log('settings: ', settings);
	// });
};

module.exports = Tattletale;