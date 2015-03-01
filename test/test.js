/* jshint node: true */
/* jshint expr: true */
var Tattletale = require('../tattletale.js');
var Bookkeeper = require('../bookkeeper.js');

var sinon = require('sinon');
var etcd = require('etcd');

describe('When fetching settings', function() {
	var tattletale;
	var mock;

	var settings = {
		action: 'get',
		node: {
			key: '/tattletale/settings',
			value: '{}',
			modifiedIndex: 0,
			createdIndex: 0
		}
	};

	before(function(done) {
		tattletale = new Tattletale();
		mock = sinon.mock(etcd).expects('get').once().yields(null, settings);
		done();
	});

	it('should call fetchSettings', function(done) {
		tattletale.fetchSettings(function(error, settings) {
			// Expect etcd.get to be called once.
			mock.verify();

			// Check if we got the expected data.
			expect(error).to.be.null;
			expect(settings).to.not.be.null;
			expect(settings).to.be.an('object');

			done();
		});
	});

	after(function(done) {
		etcd.get.restore();
		done();
	});
});

describe('When starting Bookkeeper', function() {
	var bookkeeper;

	before(function() {
		bookkeeper = new Bookkeeper();
	});
});