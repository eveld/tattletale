/* jshint node: true */
/* jshint expr: true */
var Bookkeeper = require('../bookkeeper.js');

var sinon = require('sinon');
var etcd = require('etcd');

describe('fetchChannels', function() {
	var channels = [];

	describe('on channelsReceived', function() {
		var bookkeeper;

		before(function(done) {
			bookkeeper = new Bookkeeper();
			done();
		});

		it('should return a list of available channels', function onChannelsReceived(done) {
			done();
		});
	});
});

describe('claimChannels', function() {
	describe('when claiming one channel', function() {
		var bookkeeper;

		before(function(done) {
			bookkeeper = new Bookkeeper();
			done();
		});

		it('should fetch one channel from the available channel pool', function onChannelsReceived(done) {
			done();
		});

		it('should remove one channel from the available channel pool', function onChannelsReceived(done) {
			done();
		});
	});

	describe('when claiming multiple channels', function() {
		var bookkeeper;

		before(function(done) {
			bookkeeper = new Bookkeeper();
			done();
		});

		it('should fetch multiple channels from the available channel pool', function onChannelsReceived(done) {
			done();
		});

		it('should remove multiple channels from the available channel pool', function onChannelsReceived(done) {
			done();
		});
	});
});

describe('releaseChannels', function() {
	describe('when releasing one channel', function() {
		var bookkeeper;

		before(function(done) {
			bookkeeper = new Bookkeeper();
			done();
		});

		it('should release one channel back into the available channel pool', function onChannelsReleased(done) {
			done();
		});
	});

	describe('when releasing multiple channels', function() {
		var bookkeeper;

		before(function(done) {
			bookkeeper = new Bookkeeper();
			done();
		});

		it('should release multiple channels back into the available channel pool', function onChannelsReleased(done) {
			done();
		});
	});
});

describe('removeNode', function() {
	var bookkeeper;

	before(function(done) {
		bookkeeper = new Bookkeeper();
		done();
	});

	it('should remove one node from the alive pool', function onNodeRemoved(done) {
		done();
	});
});

describe('watchNodes', function() {
	var bookkeeper;

	before(function(done) {
		bookkeeper = new Bookkeeper();
		done();
	});

	it('should react when a node dies', function onNodeDied(done) {
		done();
	});
});