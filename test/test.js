/* jshint node: true */
/* jshint expr: true */
var Tattletale = require('../tattletale.js');
var Bookkeeper = require('../bookkeeper.js');

var sinon = require('sinon');

describe('When starting Tattletale', function() {
	var tattletale;

	before(function(done) {
		tattletale = new Tattletale();
		sinon.stub(tattletale, 'fetchSettings').yields(null, {
			username: 'botnics'
		});
		done();
	});

	after(function(done) {
		tattletale.fetchSettings.restore();
		done();
	});

	it('Should fetch settings from etcd', function(done) {
		tattletale.fetchSettings(function(error, settings) {
			if (error) {
				return done(error);
			} else {
				expect(settings).to.not.be.empty;
				done(null, settings);
			}
		});
	});

	it('Should start a bookkeeper', function() {

	});
});

describe('When starting Bookkeeper', function() {
	var bookkeeper;

	before(function() {
		bookkeeper = new Bookkeeper();
	});
});