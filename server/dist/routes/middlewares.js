'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _token = require('../services/token');

var _token2 = _interopRequireDefault(_token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  loginRequired: function loginRequired(req, res, next) {
    console.log(req);
    if (!req.header('Authorization')) return res.status(401).send({ message: 'Please make sure your request has an Authorization header.' });

    // Validate jwt
    var try_token = req.header('Authorization').split(' ')[0];

    _token2.default.verifyToken(try_token, function (err, payload) {

      if (err) return res.status(401).send(err);
      _user2.default.findById(payload.sub).exec(function (err, user) {
        if (err || !user) {
          return res.status(404).send(err || {
            error: 'middleware User not found!!!'
          });
        }
        delete user.password;
        req.user = user;
        next();
      });
    });
  }
};
//# sourceMappingURL=middlewares.js.map