'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _token = require('../services/token');

var _token2 = _interopRequireDefault(_token);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    signup: function signup(req, res, next) {
        var _req$body = req.body,
            email = _req$body.email,
            password = _req$body.password,
            firstName = _req$body.firstName,
            lastName = _req$body.lastName;


        if (!email || !password) {
            return res.status(422).send({ error: 'You must provide email and password.' });
        }

        _user2.default.findOne({
            email: email
        }, function (err, existingUser) {
            if (err) return res.status(422).send(err);
            if (existingUser) {
                return res.status(422).send({ error: 'Email is in use' });
            }
            var user = new _user2.default({
                name: {
                    first: firstName,
                    last: lastName
                },
                email: email,
                password: password
            });

            user.save(function (err, savedUser) {
                if (err) {
                    return next(err);
                }

                res.json({
                    success: true,
                    token: _token2.default.generateToken(savedUser)
                });
            });
        });
    },
    signinGoogle: function signinGoogle(req, res, next) {
        var email = req.body.email;
        var password = req.body.password;
        if (!email || !password) {
            return res.status(422).send({ error: 'You must provide email and password.' });
        }
        _user2.default.findOne({
            email: email
        }, function (err, existingUser) {
            if (err || !existingUser) {
                return res.status(401).send(err || { error: "User Not Found" });
            }
            if (existingUser) {
                existingUser.comparedPassword(password, function (err, good) {
                    if (err || !good) {
                        return res.status(401).send(err || 'User not found');
                    }
                    res.send({
                        token: _token2.default.generateToken(existingUser)
                    });
                });
            }
        });
    },

    signin: function signin(req, res, next) {
        var email = req.body.email;
        var password = req.body.password;
        if (!email || !password) {
            return res.status(422).send({ error: 'You must provide email and password.' });
        }
        _user2.default.findOne({
            email: email
        }, function (err, existingUser) {
            if (err || !existingUser) {
                return res.status(401).send(err || { error: "User Not Found" });
            }
            if (existingUser) {
                existingUser.comparedPassword(password, function (err, good) {
                    if (err || !good) {
                        return res.status(401).send(err || 'User not found');
                    }
                    res.send({
                        token: _token2.default.generateToken(existingUser)
                    });
                });
            }
        });
    },

    updateProfile: function updateProfile(req, res, next) {
        req.user.comparedPassword(req.body.password, function (err, good) {
            if (err || !good) return res.status(401).send(err || 'Incorrect Password');
            var userId = req.user._id;
            var newProfile = {
                name: {
                    first: req.body.firstName,
                    last: req.body.lastName
                }
            };
            delete newProfile.email;
            delete newProfile.phone;
            delete newProfile.password;

            _user2.default.findByIdAndUpdate(userId, newProfile, { new: true }).then(function (newUser) {
                res.sendStatus(200);
            }).catch(next);
        });
    }

};
//# sourceMappingURL=authentication.js.map