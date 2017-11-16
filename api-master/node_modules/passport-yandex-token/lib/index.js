'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _passportOauth = require('passport-oauth');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * `Strategy` constructor.
 * The Yandex authentication strategy authenticates requests by delegating to Yandex using OAuth2 access tokens.
 * Applications must supply a `verify` callback which accepts a accessToken, refreshToken, profile and callback.
 * Callback supplying a `user`, which should be set to `false` if the credentials are not valid.
 * If an exception occurs, `error` should be set.
 *
 * Options:
 * - clientID          Identifies client to Yandex App
 * - clientSecret      Secret used to establish ownership of the consumer key
 * - passReqToCallback If need, pass req to verify callback
 *
 * @param {Object} _options
 * @param {Function} _verify
 * @example
 * passport.use(new YandexTokenStrategy({
 *   clientID: '123456789',
 *   clientSecret: 'shhh-its-a-secret'
 * }), function(req, accessToken, refreshToken, profile, next) {
 *   User.findOrCreate({yandexId: profile.id}, function(error, user) {
 *     done(error, user);
 *   })
 * });
 */

var YandexTokenStrategy = function (_OAuth2Strategy) {
  _inherits(YandexTokenStrategy, _OAuth2Strategy);

  function YandexTokenStrategy(_options, _verify) {
    _classCallCheck(this, YandexTokenStrategy);

    var options = _options || {};
    var verify = _verify;

    options.authorizationURL = options.authorizationURL || 'https://oauth.yandex.ru/authorize';
    options.tokenURL = options.tokenURL || 'https://oauth.yandex.ru/token';

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(YandexTokenStrategy).call(this, options, verify));

    _this.name = 'yandex-token';
    _this._accessTokenField = options.accessTokenField || 'access_token';
    _this._refreshTokenField = options.refreshTokenField || 'refresh_token';
    _this._profileURL = options.profileURL || 'https://login.yandex.ru/info?format=json';
    _this._passReqToCallback = options.passReqToCallback;

    _this._oauth2.setAccessTokenName("oauth_token");
    _this._oauth2.useAuthorizationHeaderforGET(true);
    return _this;
  }

  /**
   * Authenticate method
   * @param {Object} req
   * @param {Object} options
   * @returns {*}
   */

  _createClass(YandexTokenStrategy, [{
    key: 'authenticate',
    value: function authenticate(req, options) {
      var _this2 = this;

      var accessToken = req.body && req.body[this._accessTokenField] || req.query && req.query[this._accessTokenField];
      var refreshToken = req.body && req.body[this._refreshTokenField] || req.query && req.query[this._refreshTokenField];

      if (!accessToken) return this.fail({ message: 'You should provide ' + this._accessTokenField });

      this._loadUserProfile(accessToken, function (error, profile) {
        if (error) return _this2.error(error);

        var verified = function verified(error, user, info) {
          if (error) return _this2.error(error);
          if (!user) return _this2.fail(info);

          return _this2.success(user, info);
        };

        if (_this2._passReqToCallback) {
          _this2._verify(req, accessToken, refreshToken, profile, verified);
        } else {
          _this2._verify(accessToken, refreshToken, profile, verified);
        }
      });
    }

    /**
     * Parse user profile
     * @param {String} accessToken Yandex OAuth2 access token
     * @param {Function} done
     */

  }, {
    key: 'userProfile',
    value: function userProfile(accessToken, done) {
      this._oauth2.get(this._profileURL, accessToken, function (error, body, res) {
        if (error) return done(new _passportOauth.InternalOAuthError('Failed to fetch user profile', error.statusCode));

        try {
          var json = JSON.parse(body);
          var profile = {
            provider: 'yandex',
            id: json.id,
            displayName: json.display_name,
            name: {
              familyName: json.real_name ? json.real_name.split(' ', 2)[0] : '',
              givenName: json.real_name ? json.real_name.split(' ', 2)[1] : ''
            },
            emails: [{ value: json.default_email }],
            photos: [],
            _raw: body,
            _json: json
          };

          return done(null, profile);
        } catch (e) {
          return done(e);
        }
      });
    }
  }]);

  return YandexTokenStrategy;
}(_passportOauth.OAuth2Strategy);

exports.default = YandexTokenStrategy;
module.exports = exports['default'];