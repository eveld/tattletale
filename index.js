var bunyan = require('bunyan');

var Tattletale = require('./tattletale');
var Bookkeeper = require('./bookkeeper');

// create a tattletale worker
// create a bookkeeper worker
// fork the workers into their own process

var tattletale = new Tattletale();
tattletale.fetchSettings();

var bookkeeper = new Bookkeeper();
bookkeeper.fetchChannels();