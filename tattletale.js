/* jshint node: true */
'use strict';

var EventEmitter = require('events').EventEmitter;
var util = require('util');
var path = require('path');
var Etcd = require('etcd');
var bunyan = require('bunyan');

var etcd = require('etcd');
etcd.configure({
	host: 'localhost',
	port: 4001
});

/**
 * Tattletale collects messages from Twitch chat.
 */
function Tattletale() {
	EventEmitter.call(this);
}
util.inherits(Tattletale, EventEmitter);

/**
 * Fetch settings for this node from etcd.
 * @fires Tattletale#fetchSettingsFailed
 * @fires Tattletale#fetchSettingsReceived
 *
 * @event Tattletale#fetchSettingsFailed
 * @type {Object}
 * @property {Error} error - The reason why retrieving the settings failed.
 *
 * @event Tattletale#fetchSettingsReceived
 * @type {Object}
 * @property {Object} settings - The settings for this node.
 */
Tattletale.prototype.fetchSettings = function() {
	var tattletale = this;
	var location = path.join('/tattletale', 'settings');

	etcd.get(location, function gotSettings(error, value) {
		if (error) {
			tattletale.emit('fetchSettingsFailed', error);
		} else {
			tattletale.emit('fetchSettingsReceived', JSON.parse(value.node.value));
		}
	});
};

module.exports = Tattletale;