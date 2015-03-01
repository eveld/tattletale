var bunyan = require('bunyan');

var Tattletale = require('./tattletale');

// create a tattletale worker
// create a bookkeeper worker
// fork the workers into their own process

var tattletale = new Tattletale();
tattletale.fetchSettings();