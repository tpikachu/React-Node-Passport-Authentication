'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jwtSimple = require('jwt-simple');

var _jwtSimple2 = _interopRequireDefault(_jwtSimple);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    generateToken: function generateToken(user) {
        var timeStamp = new Date().getTime();
        var payload = {
            sub: user.id,
            iat: timeStamp
        };
        return _jwtSimple2.default.encode(payload, _config2.default.jwt_secret);
    },
    verifyToken: function verifyToken(token, cb) {
        var decode = _jwtSimple2.default.decode(token, _config2.default.jwt_secret);
        if (!decode) return cb({ error: 'Token is not verified.' });
        cb(null, decode);
    }
};
//# sourceMappingURL=token.js.map