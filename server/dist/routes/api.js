'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _authentication = require('../controllers/authentication');

var _authentication2 = _interopRequireDefault(_authentication);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = require('express').Router();

router.get('/', function (req, res) {
    res.send('connected');
    console.log(res);
});

router.get('/users', function (req, res) {
    res.send(req.user);
});

router.post('/userProfile', _authentication2.default.updateProfile);

exports.default = router;
//# sourceMappingURL=api.js.map