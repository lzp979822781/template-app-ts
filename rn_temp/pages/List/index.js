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
/******/ 		"pages/List/index": 0
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
/******/ 	deferredModules.push(["./src/pages/List/index.tsx","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/SwipeAction/index.rn.tsx":
/*!*************************************************!*\
  !*** ./src/components/SwipeAction/index.rn.tsx ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _swipeAction = __webpack_require__(/*! @ant-design/react-native/lib/swipe-action */ "@ant-design/react-native/lib/swipe-action");

var _swipeAction2 = _interopRequireDefault(_swipeAction);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _taroRn = __webpack_require__(/*! @tarojs/taro-rn */ "@tarojs/taro-rn");

__webpack_require__(/*! ./index.scss */ "./src/components/SwipeAction/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var indexStyleSheet = require('./index_styles').default;

var _styleSheet = indexStyleSheet;

var SwipeActionRn = (_temp = _class = function (_Component) {
  _inherits(SwipeActionRn, _Component);

  function SwipeActionRn(props) {
    _classCallCheck(this, SwipeActionRn);

    return _possibleConstructorReturn(this, (SwipeActionRn.__proto__ || Object.getPrototypeOf(SwipeActionRn)).call(this, props));
  }

  _createClass(SwipeActionRn, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var options = this.props.options.map(function (item) {
        return _extends({}, item, {
          text: item.text,
          style: item.style || {
            backgroundColor: 'orange',
            color: 'white'
          },
          onPress: function onPress() {
            _this2.props.onClick(item);
          }
        });
      });
      return _react2.default.createElement(
        _swipeAction2.default,
        { disabled: this.props.disabled, autoClose: this.props.autoClose, right: options, onOpen: this.props.onOpened, onClose: this.props.onClosed, style: {
            backgroundColor: 'transparent'
          } },
        this.props.children
      );
    }
  }]);

  return SwipeActionRn;
}(_taroRn.Component), _class.defaultProps = {
  disabled: false,
  autoClose: true,
  options: [{
    text: "编辑",
    style: {
      backgroundColor: 'orange',
      color: 'white'
    }
  }, {
    text: "删除",
    style: {
      backgroundColor: 'red',
      color: 'white'
    }
  }],
  onClick: function onClick() {},
  onOpened: function onOpened() {},
  onClosed: function onClosed() {}
}, _temp);
exports.default = SwipeActionRn;

/***/ }),

/***/ "./src/components/SwipeAction/index.scss":
/*!***********************************************!*\
  !*** ./src/components/SwipeAction/index.scss ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/pages/List/index.scss":
/*!***********************************!*\
  !*** ./src/pages/List/index.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/pages/List/index.tsx":
/*!**********************************!*\
  !*** ./src/pages/List/index.tsx ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _taroRn = __webpack_require__(/*! @tarojs/taro-rn */ "@tarojs/taro-rn");

var _componentsRn = __webpack_require__(/*! @tarojs/components-rn */ "@tarojs/components-rn");

var _index = __webpack_require__(/*! ../../components/DataList/index.rn */ "./src/components/DataList/index.rn.tsx");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../../components/SwipeAction/index.rn */ "./src/components/SwipeAction/index.rn.tsx");

var _index4 = _interopRequireDefault(_index3);

__webpack_require__(/*! ./index.scss */ "./src/pages/List/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Taro = require('@tarojs/taro-rn');

var indexStyleSheet = require('./index_styles').default;

var _styleSheet = indexStyleSheet;

function _getClassName() {
  var className = [];
  var args = arguments[0];
  var type = Object.prototype.toString.call(args).slice(8, -1).toLowerCase();

  if (type === 'string') {
    args = args.trim();
    args && className.push(args);
  } else if (type === 'array') {
    args.forEach(function (cls) {
      cls = _getClassName(cls).trim();
      cls && className.push(cls);
    });
  } else if (type === 'object') {
    for (var k in args) {
      k = k.trim();

      if (k && args.hasOwnProperty(k) && args[k]) {
        className.push(k);
      }
    }
  }

  return className.join(' ').trim();
}

function _getStyle(classNameExpression) {
  var className = _getClassName(classNameExpression);

  var classNameArr = className.split(/\s+/);
  var style = [];

  if (classNameArr.length === 1) {
    style.push(_styleSheet[classNameArr[0].trim()]);
  } else {
    classNameArr.forEach(function (cls) {
      style.push(_styleSheet[cls.trim()]);
    });
  }

  return style;
}

var currentEnv = Taro.getEnv(); // 获取当前环境平台

var ListPage = (_temp = _class = function (_Component) {
  _inherits(ListPage, _Component);

  function ListPage(props) {
    _classCallCheck(this, ListPage);

    var _this = _possibleConstructorReturn(this, (ListPage.__proto__ || Object.getPrototypeOf(ListPage)).call(this, props));

    _this.onClickSwipeAction = function (index, item) {
      Taro.showToast({
        title: '\u7B2C ' + index + ' \u6761 | \u70B9\u51FB: ' + item.text,
        icon: "none",
        duration: 2000
      }).then(function (res) {
        return console.log(res);
      });
    };

    _this.state = {
      refreshing: false,
      current: 0
    };
    _this.onRefresh = _this.onRefresh.bind(_this);
    _this.onEndReached = _this.onEndReached.bind(_this);
    _this.onChangeTabs = _this.onChangeTabs.bind(_this);
    return _this;
  }

  _createClass(ListPage, [{
    key: 'componentDidShow',
    value: function componentDidShow() {
      this.loadList();
    }
  }, {
    key: 'loadList',
    value: function loadList() {
      var _this2 = this;

      setTimeout(function () {
        _this2.setState({
          refreshing: false
        });
      }, 3000);
    }
  }, {
    key: 'onRefresh',
    value: function onRefresh() {
      this.setState({
        refreshing: true
      });
      this.loadList();
    }
  }, {
    key: 'onEndReached',
    value: function onEndReached() {
      Taro.showToast({
        title: "底部",
        icon: "none",
        duration: 500
      }).then(function (res) {
        return console.log(res);
      });
    }
  }, {
    key: 'alertFn',
    value: function alertFn() {
      Taro.showToast({
        title: "按钮",
        icon: "none",
        duration: 500
      }).then(function (res) {
        return console.log(res);
      });
    }
  }, {
    key: 'renderItems',
    value: function renderItems() {
      var _this3 = this;

      var dataSource = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      var options = [{
        code: 1,
        text: "编辑",
        style: {
          backgroundColor: "orange",
          color: "white"
        }
      }, {
        code: 2,
        text: "删除",
        style: {
          backgroundColor: "red",
          color: "white"
        }
      }];
      var Shadow = {
        shadowColor: "#242424",
        shadowOffset: {
          w: 10,
          h: 2
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 2
      };
      return dataSource.map(function (item, index) {
        var className = index === 0 ? "list-item-box top-gap" : "list-item-box";
        return _react2.default.createElement(
          _componentsRn.View,
          { key: item, style: [_getStyle(className), currentEnv === "RN" ? Shadow : {}] },
          _react2.default.createElement(
            _index4.default,
            { options: options, onClick: _this3.onClickSwipeAction.bind(_this3, index) },
            _react2.default.createElement(
              _componentsRn.View,
              { style: _styleSheet["list-item"] },
              _react2.default.createElement(
                _componentsRn.View,
                { style: _styleSheet["list-image-box"] },
                _react2.default.createElement(_componentsRn.Image, { src: 'https://taro-ui.jd.com/img/logo-taro.png', style: _styleSheet["item-image"] })
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
                    '\u6D4B\u8BD5\u5546\u54C1\u65E5\u7528\u767E\u8D27-',
                    item
                  )
                ),
                _react2.default.createElement(
                  _componentsRn.View,
                  { style: _styleSheet["item-dec"] },
                  _react2.default.createElement(
                    _componentsRn.View,
                    { style: _styleSheet["item-dec-1-icon"] },
                    _react2.default.createElement(
                      _componentsRn.Text,
                      { style: _styleSheet["item-dec-1-icon-text"] },
                      '\u5382'
                    )
                  ),
                  _react2.default.createElement(
                    _componentsRn.Text,
                    { style: _styleSheet["item-dec-1"] },
                    '\u4E1C\u4EAC\u8D2D\u7269\u7CBE\u534E\u7BC7\u65E5\u672C\u836F\u5986\u5E97\u4FBF\u654F\u2026'
                  )
                ),
                _react2.default.createElement(
                  _componentsRn.View,
                  { style: _styleSheet["item-dec"] },
                  _react2.default.createElement(
                    _componentsRn.Text,
                    { style: _styleSheet["item-dec-2"] },
                    '\u6709\u6548\u671F\uFF1A2019-09-24'
                  ),
                  _react2.default.createElement(_componentsRn.View, { style: _styleSheet["item-dec-vertical-division"] }),
                  _react2.default.createElement(
                    _componentsRn.Text,
                    { style: _styleSheet["item-dec-2"] },
                    '2\u76D210\u7C92'
                  )
                ),
                _react2.default.createElement(
                  _componentsRn.View,
                  { style: _styleSheet["item-dec"] },
                  _react2.default.createElement(
                    _componentsRn.Text,
                    { style: _styleSheet["item-dec-3"] },
                    '\xA5'
                  ),
                  _react2.default.createElement(
                    _componentsRn.Text,
                    { style: _styleSheet["item-dec-3-1"] },
                    '399.00'
                  ),
                  _react2.default.createElement(
                    _componentsRn.Text,
                    { style: _styleSheet["item-dec-4"] },
                    '\u6708\u9500248'
                  )
                ),
                _react2.default.createElement(
                  _componentsRn.View,
                  { style: _styleSheet["item-dec"] },
                  _react2.default.createElement(
                    _componentsRn.Text,
                    { style: _styleSheet["item-dec-5"] },
                    '\u5317\u4EAC\u4EAC\u4E1C\u4F73\u5EB7\u65D7\u8230\u5E97'
                  )
                ),
                _react2.default.createElement(_componentsRn.View, { style: _styleSheet["item-dec-division"] }),
                _react2.default.createElement(
                  _componentsRn.View,
                  { style: _styleSheet["item-dec-bottom"] },
                  _react2.default.createElement(
                    _componentsRn.View,
                    { style: _styleSheet["item-dec-bottom-left"] },
                    _react2.default.createElement(
                      _componentsRn.Text,
                      { style: _styleSheet["item-dec-4"] },
                      '\u4F63\u91D1'
                    ),
                    _react2.default.createElement(
                      _componentsRn.Text,
                      { style: _styleSheet["item-dec-3"] },
                      '\xA5'
                    ),
                    _react2.default.createElement(
                      _componentsRn.Text,
                      { style: _styleSheet["item-dec-3-1"] },
                      '399.00'
                    )
                  ),
                  _react2.default.createElement(
                    _componentsRn.View,
                    { style: _styleSheet["item-dec-bottom-rignt"] },
                    _react2.default.createElement(
                      _componentsRn.View,
                      { onClick: _this3.alertFn, style: _styleSheet["btn-1"] },
                      _react2.default.createElement(
                        _componentsRn.Text,
                        { style: _styleSheet["btn-1-text"] },
                        '\u590D\u5236PC\u94FE\u63A5'
                      )
                    ),
                    _react2.default.createElement(
                      _componentsRn.View,
                      { onClick: _this3.alertFn, style: _styleSheet["btn-2"] },
                      _react2.default.createElement(
                        _componentsRn.Text,
                        { style: _styleSheet["btn-2-text"] },
                        '\u590D\u5236\u6807\u9898'
                      )
                    )
                  )
                )
              )
            )
          )
        );
      });
    }
  }, {
    key: 'onChangeTabs',
    value: function onChangeTabs(value) {
      console.log(value);
      this.setState({
        current: value.index
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
  navigationBarTitleText: "列表",
  disableScroll: true //currentEnv === "RN"   //使用列表滚动事件，先把外壳默认滚动禁止，防止事件覆盖。

}, _temp);
exports.default = ListPage;

/***/ }),

/***/ "@ant-design/react-native/lib/swipe-action":
/*!************************************************************!*\
  !*** external "@ant-design/react-native/lib/swipe-action" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@ant-design/react-native/lib/swipe-action");

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