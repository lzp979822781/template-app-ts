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
/******/ 		"pages/Index/index": 0
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
/******/ 	deferredModules.push(["./src/pages/Index/index.tsx","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/pages/Index/index.scss":
/*!************************************!*\
  !*** ./src/pages/Index/index.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/pages/Index/index.tsx":
/*!***********************************!*\
  !*** ./src/pages/Index/index.tsx ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dec, _class, _class2, _temp;

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _taroRn = __webpack_require__(/*! @tarojs/taro-rn */ "@tarojs/taro-rn");

var _componentsRn = __webpack_require__(/*! @tarojs/components-rn */ "@tarojs/components-rn");

var _taroReduxRn = __webpack_require__(/*! @tarojs/taro-redux-rn */ "@tarojs/taro-redux-rn");

var _ = __webpack_require__(/*! ../../assets/images/01.png */ "./src/assets/images/01.png");

var _2 = _interopRequireDefault(_);

var _3 = __webpack_require__(/*! ../../assets/images/02.png */ "./src/assets/images/02.png");

var _4 = _interopRequireDefault(_3);

var _5 = __webpack_require__(/*! ../../assets/images/03.png */ "./src/assets/images/03.png");

var _6 = _interopRequireDefault(_5);

var _7 = __webpack_require__(/*! ../../assets/images/04.png */ "./src/assets/images/04.png");

var _8 = _interopRequireDefault(_7);

var _index = __webpack_require__(/*! ../../components/index */ "./src/components/index.tsx");

var _Request = __webpack_require__(/*! ../../utils/Request */ "./src/utils/Request.ts");

var _Request2 = _interopRequireDefault(_Request);

var _utils = __webpack_require__(/*! ../../utils/utils */ "./src/utils/utils.ts");

__webpack_require__(/*! ./index.scss */ "./src/pages/Index/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Taro = require('@tarojs/taro-rn');

var indexStyleSheet = require('./index_styles').default;

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

var _styleSheet = indexStyleSheet;

var Index = (_dec = (0, _taroReduxRn.connect)(function (_ref) {
  var hello = _ref.hello,
      other = _objectWithoutProperties(_ref, ['hello']);

  return _extends({}, hello, other);
}), _dec(_class = (_temp = _class2 = function (_Component) {
  _inherits(Index, _Component);

  function Index(props) {
    var _this2 = this;

    _classCallCheck(this, Index);

    var _this = _possibleConstructorReturn(this, (Index.__proto__ || Object.getPrototypeOf(Index)).call(this, props));

    _this.getData = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var res;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _Request2.default.get("api_user_userInfo", {
                content: "hello"
              });

            case 3:
              res = _context.sent;

              console.log("res", res);
              _context.next = 10;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context['catch'](0);

              console.log("e", _context.t0);

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2, [[0, 7]]);
    }));

    _this.onAdd = function () {
      _this.callModel("add");
    };

    _this.onDec = function () {
      _this.callModel("minus");
    };

    _this.onScan = function () {
      console.log("扫描事件");
      var type = Taro.getEnv();

      if (type !== "RN") {
        Taro.scanCode({
          scanType: ["barCode", "qrCode"]
        }).then(function (res) {
          console.log("res", res);
        }).catch(function (e) {
          console.log("扫描错误", e);
        });
      }
    };

    _this.routerTo = function (url) {
      Taro.navigateTo({
        url: url
      });
    };

    _this.onMulti = function () {};

    _this.onToTest = function () {
      Taro.navigateTo({
        url: "/pages/Test/index"
      });
    };

    _this.onToHome = function () {
      Taro.navigateTo({
        url: "/pages/home/Home/index"
      });
    };

    _this.onNameInput = function (e) {
      var _e$detail = e.detail;
      _e$detail = _e$detail === undefined ? {} : _e$detail;
      var _e$detail$value = _e$detail.value,
          value = _e$detail$value === undefined ? "" : _e$detail$value;

      console.log("value", value);
      _this.setState({
        name: value
      });
    };

    _this.onSumbmit = function (e) {
      console.log("e", e);
      var _e$detail2 = e.detail;
      _e$detail2 = _e$detail2 === undefined ? {} : _e$detail2;
      var _e$detail2$value = _e$detail2.value,
          value = _e$detail2$value === undefined ? {} : _e$detail2$value;

      console.log("submit value", value);
    };

    _this.renderForm = function () {
      var name = _this.state.name;

      return _react2.default.createElement(
        _componentsRn.View,
        null,
        _react2.default.createElement(
          _componentsRn.Form,
          { onSubmit: _this.onSumbmit },
          _react2.default.createElement(_componentsRn.Input, { name: 'name', type: 'text', onInput: _this.onNameInput, placeholder: '\u8BF7\u8F93\u5165\u540D\u79F0', value: name }),
          _react2.default.createElement(
            _componentsRn.Button,
            { formType: 'submit' },
            '\u63D0\u4EA4'
          )
        )
      );
    };

    _this.renderSwipperItem = function () {
      var data = [{
        url: _2.default
      }, {
        url: _4.default
      }, {
        url: _6.default
      }, {
        url: _8.default
      }].map(function (item) {
        return _extends({}, item, {
          key: (0, _utils.UUID)()
        });
      });
      return data.map(function (item) {
        var url = item.url,
            key = item.key;

        return _react2.default.createElement(
          _componentsRn.SwiperItem,
          { key: key, style: [_styleSheet["swipper-item"], {
              backgroundColor: "#8EA7E1"
            }] },
          _react2.default.createElement(_componentsRn.Image, { src: url })
        );
      });
    };

    _this.callModel = function (type) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return new Promise(function (resolve) {
        _this.props.dispatch({
          type: 'hello/' + type,
          payload: data,
          resolve: resolve
        });
      });
    };

    _this.state = {
      name: ""
    };
    return _this;
  }
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */

  _createClass(Index, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      console.log(this.props, nextProps);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'componentDidShow',
    value: function componentDidShow() {// this.getData();
    }
  }, {
    key: 'componentDidHide',
    value: function componentDidHide() {} /**
                                           * 搜索框扫描
                                           */

  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        _componentsRn.View,
        { style: _styleSheet["index"] },
        _react2.default.createElement(
          _componentsRn.View,
          { style: _styleSheet["nav"] },
          _react2.default.createElement(
            _componentsRn.View,
            { style: _styleSheet["header"] },
            _react2.default.createElement(_index.SearchBar, { onRightClick: this.onScan })
          )
        ),
        _react2.default.createElement(
          _componentsRn.Swiper,
          { indicatorColor: '#999', indicatorActiveColor: '#333', circular: true, indicatorDots: true, interval: 2000, autoplay: true, style: _styleSheet["swipper-container"] },
          this.renderSwipperItem()
        ),
        _react2.default.createElement(
          _componentsRn.View,
          null,
          _react2.default.createElement(
            _componentsRn.Button,
            { onClick: this.onAdd, style: _styleSheet["add_btn"] },
            '+'
          ),
          _react2.default.createElement(
            _componentsRn.Button,
            { onClick: this.onDec, style: _styleSheet["dec_btn"] },
            '-'
          ),
          _react2.default.createElement(
            _componentsRn.Button,
            { onClick: this.onMulti, style: _styleSheet["dec_btn"] },
            'other'
          ),
          _react2.default.createElement(
            _componentsRn.Button,
            { onClick: function onClick() {
                _this3.routerTo("/pages/List/index?id=2");
              }, style: _styleSheet["add_btn"] },
            '\u901A\u7528\u5217\u8868\u5B9E\u73B0'
          ),
          _react2.default.createElement(
            _componentsRn.Button,
            { onClick: function onClick() {
                _this3.routerTo("/pages/Form/index?type=test");
              }, style: _styleSheet["add_btn"] },
            '\u901A\u7528\u8868\u5355'
          ),
          _react2.default.createElement(
            _componentsRn.Button,
            { onClick: this.onToTest, style: _styleSheet["add_btn"] },
            '\u6D4B\u8BD5\u57FA\u7840\u7EC4\u4EF6'
          ),
          _react2.default.createElement(
            _componentsRn.Button,
            { onClick: this.onToHome, style: _styleSheet["add_btn"] },
            '\u9996\u9875'
          )
        ),
        this.renderForm(),
        _react2.default.createElement(
          _componentsRn.Text,
          null,
          this.props.count
        ),
        _react2.default.createElement(
          _componentsRn.View,
          null,
          _react2.default.createElement(
            _componentsRn.Text,
            null,
            'Hello, World'
          )
        )
      );
    }
  }]);

  return Index;
}(_taroRn.Component), _class2.config = {
  navigationBarTitleText: "首页"
}, _temp)) || _class); // #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion


exports.default = Index;

/***/ }),

/***/ "@ant-design/react-native/lib/drawer":
/*!******************************************************!*\
  !*** external "@ant-design/react-native/lib/drawer" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@ant-design/react-native/lib/drawer");

/***/ }),

/***/ "@ant-design/react-native/lib/modal":
/*!*****************************************************!*\
  !*** external "@ant-design/react-native/lib/modal" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@ant-design/react-native/lib/modal");

/***/ }),

/***/ "@tarojs/components-rn":
/*!****************************************!*\
  !*** external "@tarojs/components-rn" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@tarojs/components-rn");

/***/ }),

/***/ "@tarojs/taro-redux-rn":
/*!****************************************!*\
  !*** external "@tarojs/taro-redux-rn" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@tarojs/taro-redux-rn");

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

/***/ "expo-linear-gradient":
/*!***************************************!*\
  !*** external "expo-linear-gradient" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("expo-linear-gradient");

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

/***/ })

/******/ });