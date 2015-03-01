/* jshint node: true */
/* jshint expr: true */
var Tattletale = require('../tattletale.js');
var Bookkeeper = require('../bookkeeper.js');

var sinon = require('sinon');
var etcd = require('etcd');

describe('fetchSettings', function() {
	var tattletale;
	var mockedEtcd;

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
		stubbedEtcdGet = sinon.stub(etcd, 'get');
		stubbedEtcdGet.onFirstCall().yields(null, settings);
		stubbedEtcdGet.onSecondCall().yields(new Error());
		done();
	});

	it('Should receive settings if everything went well and an error if something went wrong.', function(done) {
		tattletale.fetchSettings();

		tattletale.on('receivedSettings', function(settings) {
			expect(settings).to.not.be.null;
			expect(settings).to.be.an('object');
			done();
		});

		tattletale.on('error', function(error) {
			expect(error).to.not.be.null;
			done();
		});

		done();
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