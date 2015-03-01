/* jshint node: true */
/* jshint expr: true */
var Tattletale = require('../tattletale.js');

var sinon = require('sinon');
var etcd = require('etcd');

/**
 * Test the fetching of settings.
 */
describe('fetchSettings', function() {
	var settings = {
		action: 'get',
		node: {
			key: '/tattletale/settings',
			value: '{}',
			modifiedIndex: 0,
			createdIndex: 0
		}
	};

	/**
	 * Test the case where settings were correctly received.
	 */
	describe('on fetchSettingsReceived', function() {
		var tattletale;
		var mockedEtcd;

		before(function(done) {
			tattletale = new Tattletale();
			mockedEtcd = sinon.mock(etcd).expects('get').once().yields(null, settings);
			done();
		});

		it('should return settings', function(done) {
			tattletale.fetchSettings();
			mockedEtcd.verify();

			tattletale.on('settingsReceived', function onSettingsReceived(settings) {
				expect(settings).to.not.be.null;
				expect(settings).to.be.an.instanceOf(Object);
			});

			done();
		});

		after(function(done) {
			etcd.get.restore();
			done();
		});
	});

	/**
	 * Test the case where retrieving the settings failed.
	 */
	describe('on settingsFailed', function() {
		var tattletale;
		var mockedEtcd;

		before(function(done) {
			tattletale = new Tattletale();
			mockedEtcd = sinon.mock(etcd).expects('get').once().yields(new Error());
			done();
		});

		it('should return an error', function(done) {
			tattletale.fetchSettings();
			mockedEtcd.verify();

			tattletale.on('settingsFailed', function onSettingsFailed(error) {
				expect(error).to.not.be.null;
				expect(error).to.be.an.instanceof(Error);
			});

			done();
		});

		after(function(done) {
			etcd.get.restore();
			done();
		});
	});
});