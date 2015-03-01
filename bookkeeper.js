var EventEmitter = require('events').EventEmitter;
var util = require('util');
var path = require('path');
var Etcd = require('etcd');
var bunyan = require('bunyan');

var etcd = require('etcd');
var channels = [];

/**
 * Bookkeeper keeps track of available channels and dead nodes.
 */
function Bookkeeper() {
	EventEmitter.call(this);
}
util.inherits(Bookkeeper, EventEmitter);

/**
 * Fetches the available channels from the pool.
 * @fires Bookkeeper#channelsReceived
 *
 * @event Bookkeeper#channelsReceived
 * @type {Object}
 * @property {Array} channels - The available channels.
 */
Bookkeeper.prototype.fetchChannels = function() {
	var bookkeeper = this;
	var location = path.join('/tattletale', 'channels');

	etcd.list(location, function gotSettings(error, value) {
		if (error) {
			bookkeeper.emit('fetchChannelsFailed', error);
		} else {
			bookkeeper.emit('fetchChannelsReceived', value);
		}
	});
};

/**
 * Claim 1 or more channels.
 * @fires Bookkeeper#channelClaimed
 *
 * @event Bookkeeper#channelClaimed
 * @type {Object}
 * @property {string} channel - The name of the claimed channel.
 */
Bookkeeper.prototype.claimChannels = function() {
	var bookkeeper = this;
	var location = path.join('/tattletale', 'channels');

	this.emit('channelClaimed', 'channel');
};

/**
 * Release 1 or more channels back into the pool.
 * @fires Bookkeeper#channelReleased
 *
 * @event Bookkeeper#channelReleased
 * @type {Object}
 * @property {string} channel - The name of the released channel.
 */
Bookkeeper.prototype.releaseChannels = function() {
	var bookkeeper = this;
	var location = path.join('/tattletale', 'channels');

	this.emit('channelReleased', 'channel');
};

/**
 * Remove dead node.
 * @fires Bookkeeper#nodeRemoved
 *
 * @event Bookkeeper#nodeRemoved
 * @type {Object}
 * @property {string} node - The id of the removed node.
 */
Bookkeeper.prototype.removeNode = function() {
	var bookkeeper = this;
	var location = path.join('/tattletale', 'nodes');

	this.emit('nodeRemoved', 'node');
};

/**
 * Watch for dead nodes.
 * @fires Bookkeeper#nodeDied
 *
 * @event Bookkeeper#nodeDied
 * @type {Object}
 * @property {string} node - The id of the dead node.
 */
Bookkeeper.prototype.watchNodes = function() {
	var bookkeeper = this;
	var location = path.join('/tattletale', 'nodes');

	this.emit('nodeDied', 'node');
};

module.exports = Bookkeeper;