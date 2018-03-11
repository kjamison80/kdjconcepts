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

var _Html = __webpack_require__(6);

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
  var title = 'Server side Rendering with Styled Components';

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

var _templateObject = _taggedTemplateLiteral(['\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  font-size: 40px;\n  background: #333;\n  color: red;\n  font-family: arial;\n'], ['\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  font-size: 40px;\n  background: #333;\n  color: red;\n  font-family: arial;\n']);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _styledComponents = __webpack_require__(1);

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

// Our single Styled Component definition
var AppContaienr = _styledComponents2.default.div(_templateObject);

var App = function App() {
  return _react2.default.createElement(
    AppContaienr,
    null,
    'Coming Soon.'
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
/**
 * Html
 * This Html.js file acts as a template that we insert all our generated
 * application strings into before sending it to the client.
 */
var Html = function Html(_ref) {
  var body = _ref.body,
      styles = _ref.styles,
      title = _ref.title;
  return "\n  <!DOCTYPE html>\n  <html>\n    <head>\n      <title>" + title + "</title>\n      " + styles + "\n    </head>\n    <body style=\"margin:0\">\n      <div id=\"app\">" + body + "</div>\n    </body>\n  </html>\n";
};

exports.default = Html;

/***/ })
/******/ ]);