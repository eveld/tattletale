/* jshint node: true */
'use strict';

var EventEmitter = require('events').EventEmitter;
var util = require('util');
var path = require('path');
var Etcd = require('etcd');
var bunyan = require('bunyan');

var etcd = require('etcd');
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
Tattletale.prototype.fetchSettings = function(callback) {
	var location = path.join('/tattletale', 'settings');

	etcd.get(location, function gotSettings(error, value) {
		if (error) {
			callback(error);
		} else {
			callback(null, JSON.parse(value.node.value));
		}
	});
};

module.exports = Tattletale;