'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!process.env.JWT_SECRET) {
    var err = new Error('No JWT_SECRET in env variable');
    console.error(err);
}

var app = (0, _express2.default)();

_mongoose2.default.connect(_config2.default.mongoose.uri, { useMongoClient: true }).catch(function (err) {
    return console.error(err);
});

_mongoose2.default.Promise = global.Promise;

// App Setup
app.use((0, _cors2.default)());
app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use('/', _routes2.default);

app.use(function (err, req, res, next) {
    console.log('Error:', err.message);
    res.status(422).json(err.message);
});

// Server Setup
var port = process.env.PORT || 8000;
_http2.default.createServer(app).listen(port, function () {
    console.log('\x1B[32m', 'Server listening on: ' + port, '\x1B[0m');
});
//# sourceMappingURL=server.js.map