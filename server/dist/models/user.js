'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Define the model
var userSchema = new _mongoose2.default.Schema({
    name: {
        first: String,
        last: String
    },
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    password: String,
    phone: {
        number: {
            type: String
        },
        verified: {
            type: Boolean,
            default: false
        }
    }
});

userSchema.pre('save', function (next) {
    // get access to user model, then we can use user.email, user.password
    var user = this;

    _bcryptNodejs2.default.genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }

        _bcryptNodejs2.default.hash(user.password, salt, null, function (err, hash) {
            if (err) {
                return next(err);
            }

            user.password = hash;
            next();
        });
    });
});

// Make use of methods for comparedPassword
userSchema.methods.comparedPassword = function (candidatePassword, cb) {
    _bcryptNodejs2.default.compare(candidatePassword, this.password, function (err, good) {
        if (err) {
            return cb(err);
        };
        cb(null, good);
    });
};

// Export the model
exports.default = _mongoose2.default.model('User', userSchema);
//# sourceMappingURL=user.js.map