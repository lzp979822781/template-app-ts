module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"pages/BusinessList/index": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	var jsonpArray = global["webpackJsonp"] = global["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/pages/BusinessList/index.tsx","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/pages/BusinessList/index.scss":
/*!*******************************************!*\
  !*** ./src/pages/BusinessList/index.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/pages/BusinessList/index.tsx":
/*!******************************************!*\
  !*** ./src/pages/BusinessList/index.tsx ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _taroRn = __webpack_require__(/*! @tarojs/taro-rn */ "@tarojs/taro-rn");

var _componentsRn = __webpack_require__(/*! @tarojs/components-rn */ "@tarojs/components-rn");

var _index = __webpack_require__(/*! ../../components/DataList/index.rn */ "./src/components/DataList/index.rn.tsx");

var _index2 = _interopRequireDefault(_index);

var _Request = __webpack_require__(/*! ../../utils/Request */ "./src/utils/Request.ts");

var _Request2 = _interopRequireDefault(_Request);

__webpack_require__(/*! ./index.scss */ "./src/pages/BusinessList/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Taro = require('@tarojs/taro-rn');

var indexStyleSheet = require('./index_styles').default;

var _styleSheet = indexStyleSheet;
var ListPage = (_temp = _class = function (_Component) {
  _inherits(ListPage, _Component);

  function ListPage(props) {
    var _this2 = this;

    _classCallCheck(this, ListPage);

    var _this = _possibleConstructorReturn(this, (ListPage.__proto__ || Object.getPrototypeOf(ListPage)).call(this, props));

    _this.loadList = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var currentPage, res, listData, data;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              currentPage = _this.state.currentPage;
              _context.prev = 1;
              _context.next = 4;
              return _Request2.default.get("api_partnerVender_list", {
                currentPage: currentPage,
                pageSize: 10,
                venderType: null
              });

            case 4:
              res = _context.sent;
              listData = _this.state.data;
              data = [];


              if (res.data.data) {
                data = res.data.data.result;
              }

              if (currentPage === 1) {
                listData = data;
              } else {
                listData = listData.concat(data);
              } // console.log("res", res);


              _this.setState(_extends({
                data: listData,
                refreshing: false
              }, res.data.data.page), function () {
                if (data.length < _this.state.pageSize) {
                  _this.canAction = false;
                } else {
                  setTimeout(function () {
                    _this.canAction = true;
                  }, 50);
                }
              });
              _context.next = 15;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context['catch'](1);

              console.log("e", _context.t0);

            case 15:

              Taro.hideLoading();

            case 16:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2, [[1, 12]]);
    }));
    _this.canAction = false;

    _this.state = {
      refreshing: false,
      data: []
    };
    _this.onRefresh = _this.onRefresh.bind(_this);
    _this.onEndReached = _this.onEndReached.bind(_this);
    return _this;
  }

  _createClass(ListPage, [{
    key: 'componentDidShow',
    value: function componentDidShow() {
      this.loadList();
    }
  }, {
    key: 'onRefresh',
    value: function onRefresh() {
      var _this3 = this;

      this.setState({
        refreshing: true,
        currentPage: 1
      }, function () {
        _this3.loadList();
      });
    }
  }, {
    key: 'onEndReached',
    value: function onEndReached() {
      var _this4 = this;

      if (this.canAction) {
        Taro.showLoading({
          title: '加载中'
        });
        this.canAction = false;
        var currentPage = this.state.currentPage + 1;
        this.setState({
          currentPage: currentPage
        }, function () {
          _this4.loadList();
        });
      }
    }
  }, {
    key: 'renderItems',
    value: function renderItems() {
      var data = this.state.data;

      return data.map(function (item) {
        return _react2.default.createElement(
          _componentsRn.View,
          { key: item.venderId, style: _styleSheet["list-item-box"] },
          _react2.default.createElement(
            _componentsRn.View,
            { style: _styleSheet["list-item"] },
            _react2.default.createElement(
              _componentsRn.View,
              { style: _styleSheet["list-image-box"] },
              _react2.default.createElement(_componentsRn.Image, { src: 'http:' + item.shopLogo || false, style: _styleSheet["item-image"] })
            ),
            _react2.default.createElement(
              _componentsRn.View,
              { style: _styleSheet["content-box"] },
              _react2.default.createElement(
                _componentsRn.View,
                null,
                _react2.default.createElement(
                  _componentsRn.Text,
                  { style: _styleSheet["item-title"] },
                  item.companyName
                )
              ),
              _react2.default.createElement(
                _componentsRn.View,
                { style: _styleSheet["item-dec"] },
                _react2.default.createElement(
                  _componentsRn.Text,
                  { style: _styleSheet["item-dec-1"] },
                  '\u4E0A\u67B6'
                ),
                _react2.default.createElement(
                  _componentsRn.Text,
                  { style: _styleSheet["item-dec-3"] },
                  item.upShelfSkuCount
                ),
                _react2.default.createElement(
                  _componentsRn.Text,
                  { style: _styleSheet["item-dec-1"] },
                  '\u54C1\u79CD'
                ),
                _react2.default.createElement(_componentsRn.View, { style: _styleSheet["item-dec-vertical-division"] }),
                _react2.default.createElement(
                  _componentsRn.Text,
                  { style: _styleSheet["item-dec-1"] },
                  '\u8D77\u9001\u91D1\u989D',
                  item.deliveryMoney,
                  '\u5143'
                )
              ),
              _react2.default.createElement(
                _componentsRn.View,
                { style: _styleSheet["item-dec"] },
                _react2.default.createElement(
                  _componentsRn.Text,
                  { style: _styleSheet["item-dec-2"] },
                  '\u914D\u9001\u533A\u57DF\uFF1A',
                  item.operatingArea
                )
              )
            )
          ),
          _react2.default.createElement(_componentsRn.View, { style: _styleSheet["item-dec-division"] })
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _componentsRn.View,
        { style: _styleSheet["list"] },
        _react2.default.createElement(
          _index2.default,
          { minusHeight: 0, refreshing: this.state.refreshing, onRefresh: this.onRefresh, onEndReached: this.onEndReached },
          _react2.default.createElement(
            _componentsRn.Block,
            null,
            this.renderItems()
          )
        )
      );
    }
  }]);

  return ListPage;
}(_taroRn.Component), _class.config = {
  navigationBarTitleText: "商家列表",
  disableScroll: true //currentEnv === "RN"   //使用列表滚动事件，先把外壳默认滚动禁止，防止事件覆盖。

}, _temp);
exports.default = ListPage;

/***/ }),

/***/ "@tarojs/components-rn":
/*!****************************************!*\
  !*** external "@tarojs/components-rn" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@tarojs/components-rn");

/***/ }),

/***/ "@tarojs/taro-rn":
/*!**********************************!*\
  !*** external "@tarojs/taro-rn" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@tarojs/taro-rn");

/***/ }),

/***/ "babel-runtime/regenerator":
/*!********************************************!*\
  !*** external "babel-runtime/regenerator" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/regenerator");

/***/ }),

/***/ "crypto-js/hmac-sha256":
/*!****************************************!*\
  !*** external "crypto-js/hmac-sha256" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("crypto-js/hmac-sha256");

/***/ }),

/***/ "lodash/pick":
/*!******************************!*\
  !*** external "lodash/pick" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash/pick");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-native":
/*!*******************************!*\
  !*** external "react-native" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-native");

/***/ })

/******/ });