/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(3);

var _express2 = _interopRequireDefault(_express);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(4);

var _App = __webpack_require__(5);

var _App2 = _interopRequireDefault(_App);

var _Html = __webpack_require__(9);

var _Html2 = _interopRequireDefault(_Html);

var _styledComponents = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// <-- importing ServerStyleSheet

var port = 3000;
var server = (0, _express2.default)();

// Creating a single index route to server our React application from.
server.get('/', function (req, res) {
  var sheet = new _styledComponents.ServerStyleSheet(); // <-- creating out stylesheet

  var body = (0, _server.renderToString)(sheet.collectStyles(_react2.default.createElement(_App2.default, null))); // <-- collecting styles
  var styles = sheet.getStyleTags(); // <-- getting all the tags from the sheet
  var title = 'KDJ Concepts';

  res.send((0, _Html2.default)({
    body: body,
    styles: styles, // <-- passing the styles to our Html template
    title: title
  }));
});

server.listen(port);
console.log('Serving at http://localhost:' + port);

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['\n  text-align: center;\n  font-family: arial;\n'], ['\n  text-align: center;\n  font-family: arial;\n']);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _styledComponents = __webpack_require__(1);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _Grocery = __webpack_require__(6);

var _Grocery2 = _interopRequireDefault(_Grocery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

// Our single Styled Component definition
var AppContaienr = _styledComponents2.default.div(_templateObject);

var App = function App() {
  return _react2.default.createElement(
    AppContaienr,
    null,
    _react2.default.createElement(_Grocery2.default, null)
  );
};

exports.default = App;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(7);

var _axios2 = _interopRequireDefault(_axios);

var _reactTransmit = __webpack_require__(8);

var _reactTransmit2 = _interopRequireDefault(_reactTransmit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Grocery = function (_Component) {
	_inherits(Grocery, _Component);

	function Grocery() {
		_classCallCheck(this, Grocery);

		return _possibleConstructorReturn(this, (Grocery.__proto__ || Object.getPrototypeOf(Grocery)).apply(this, arguments));
	}

	_createClass(Grocery, [{
		key: 'render',
		value: function render() {
			console.log('this.props');
			console.log(this.props);
			return _react2.default.createElement(
				'main',
				null,
				_react2.default.createElement(
					'h1',
					null,
					'Coming Soon.'
				)
			);
		}
	}]);

	return Grocery;
}(_react.Component);

exports.default = Grocery;

// export default Transmit.createContainer(Grocery, {
//   // These must be set or else it would fail to render
//   initialVariables: {},
//   // Each fragment will be resolved into a prop
//   fragments: {
//     posts() {
//       return axios.get('https://rbb3nrkjc1.execute-api.us-west-2.amazonaws.com/dev/users/1').then((resp) => resp.data);
//     }
//   }
// });

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("react-transmit");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Html
 * This Html.js file acts as a template that we insert all our generated
 * application strings into before sending it to the client.
 */
var Html = function Html(_ref) {
  var body = _ref.body,
      styles = _ref.styles,
      title = _ref.title;
  return "\n  <!DOCTYPE html>\n  <html>\n    <head>\n      <meta name=\"viewport\" content=\"width=device-width\">\n      <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n      <title>" + title + "</title>\n      " + styles + "\n    </head>\n    <body style=\"margin:0;background:#333;color:#fff;\">\n      <div id=\"app\">" + body + "</div>\n    </body>\n  </html>\n";
};

exports.default = Html;

/***/ })
/******/ ]);