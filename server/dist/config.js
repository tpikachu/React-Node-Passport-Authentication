'use strict';

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (process.env.NODE_ENV != 'production') {
  _dotenv2.default.config({ path: _path2.default.resolve(__dirname, '.env') });
  console.log(_dotenv2.default);
}

module.exports = {
  jwt_secret: process.env.JWT_SECRET || 'unsafe_jwt_secret',
  mongoose: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost/mern-stack'
  }
};
//# sourceMappingURL=config.js.map