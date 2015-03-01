var EventEmitter = require('events').EventEmitter;
var util = require('util');
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
 */
Bookkeeper.prototype.fetchChannels = function() {
	/**
	 * @event Bookkeeper#channelsReceived
	 * @type {Object}
	 * @property {Array} channels - The available channels.
	 */
	this.emit('channelsReceived');
};

/**
 * Claim 1 or more channels.
 * @fires Bookkeeper#channelClaimed
 */
Bookkeeper.prototype.claimChannels = function() {
	/**
	 * @event Bookkeeper#channelClaimed
	 * @type {Object}
	 * @property {string} channel - The name of the claimed channel.
	 */
	this.emit('channelClaimed');
};

/**
 * Release 1 or more channels back into the pool.
 * @fires Bookkeeper#channelReleased
 */
Bookkeeper.prototype.releaseChannels = function() {
	/**
	 * @event Bookkeeper#channelReleased
	 * @type {Object}
	 * @property {string} channel - The name of the released channel.
	 */
	this.emit('channelReleased');
};

/**
 * Remove dead node.
 * @fires Bookkeeper#nodeRemoved
 */
Bookkeeper.prototype.removeNode = function() {
	/**
	 * @event Bookkeeper#nodeRemoved
	 * @type {Object}
	 * @property {string} node - The id of the removed node.
	 */
	this.emit('nodeRemoved');
};

/**
 * Watch for dead nodes.
 * @fires Bookkeeper#nodeDied
 */
Bookkeeper.prototype.watchNodes = function() {
	/**
	 * @event Bookkeeper#nodeDied
	 * @type {Object}
	 * @property {string} node - The id of the dead node.
	 */
	this.emit('nodeDied');
};

module.exports = Bookkeeper;