'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _authentication = require('../controllers/authentication');

var _authentication2 = _interopRequireDefault(_authentication);

var _middlewares = require('./middlewares');

var _middlewares2 = _interopRequireDefault(_middlewares);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var passport = require('passport');

var twitterAuth = passport.authenticate('twitter');
var googleAuth = passport.authenticate('google', { scope: ['profile'] });
var facebookAuth = passport.authenticate('facebook');
var githubAuth = passport.authenticate('github');

var router = require('express').Router();

router.use('/api', _middlewares2.default.loginRequired, _api2.default);

router.post('/signup', _authentication2.default.signup);
router.post('/signin', _authentication2.default.signin);
router.get('/ping', function (req, res) {
  return res.send('pong');
});
router.get('/', function (req, res) {
  return res.json({ 'source': '' });
});

router.post('/signin/google', _authentication2.default.signinGoogle);

router.get('/google/callback', googleAuth, _authentication2.default.google);

// Setting up the passport middleware for each of the OAuth providers


// Routes that are triggered by the callbacks from each OAuth provider once 
// the user has authenticated successfully
//router.get('/twitter/callback', twitterAuth, authController.twitter)

//router.get('/facebook/callback', facebookAuth, authController.facebook)
//router.get('/github/callback', githubAuth, authController.github)

// This custom middleware allows us to attach the socket id to the session
// With that socket id we can send back the right user info to the right 
// socket
router.use(function (req, res, next) {
  req.session.socketId = req.query.socketId;
  next();
});

// Routes that are triggered on the client
//router.get('/twitter', twitterAuth)
//router.get('/google', googleAuth)
//router.get('/facebook', facebookAuth)
//router.get('/github', githubAuth)

exports.default = router;
//# sourceMappingURL=index.js.map