require('./common');module.exports =
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
/******/ 		"app": 0
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
/******/ 	deferredModules.push(["./src/app.tsx","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.scss":
/*!**********************!*\
  !*** ./src/app.scss ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/app.tsx":
/*!*********************!*\
  !*** ./src/app.tsx ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _componentsRn = __webpack_require__(/*! @tarojs/components-rn */ "@tarojs/components-rn");

var _taroRouterRn = __webpack_require__(/*! @tarojs/taro-router-rn */ "@tarojs/taro-router-rn");

var _taroRouterRn2 = _interopRequireDefault(_taroRouterRn);

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _taroRn = __webpack_require__(/*! @tarojs/taro-rn */ "@tarojs/taro-rn");

var _taroReduxRn = __webpack_require__(/*! @tarojs/taro-redux-rn */ "@tarojs/taro-redux-rn");

var _createStore = __webpack_require__(/*! ./store/createStore */ "./src/store/createStore.ts");

var _createStore2 = _interopRequireDefault(_createStore);

__webpack_require__(/*! ./app.scss */ "./src/app.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var assetsTabBarUserActivePng = require('././assets/tab-bar/user-active.png');

var assetsTabBarUserPng = require('././assets/tab-bar/user.png');

var assetsTabBarCartActivePng = require('././assets/tab-bar/cart-active.png');

var assetsTabBarCartPng = require('././assets/tab-bar/cart.png');

var assetsTabBarCateActivePng = require('././assets/tab-bar/cate-active.png');

var assetsTabBarCatePng = require('././assets/tab-bar/cate.png');

var assetsTabBarHomeActivePng = require('././assets/tab-bar/home-active.png');

var assetsTabBarHomePng = require('././assets/tab-bar/home.png');

var pagesHomeSearchComponentsSearchGoodsListIndex = require('./pages/home/search/components/SearchGoodsList/index').default;

var pagesHomeSearchSearchIndex = require('./pages/home/search/Search/index').default;

var pagesCartCartIndex = require('./pages/cart/Cart/index').default;

var pagesUserUserIndex = require('./pages/user/User/index').default;

var pagesReferPageIndex = require('./pages/ReferPage/index').default;

var pagesTestIndex = require('./pages/Test/index').default;

var pagesFormIndex = require('./pages/Form/index').default;

var pagesListIndex = require('./pages/List/index').default;

var pagesIndexIndex = require('./pages/Index/index').default;

var pagesBusinessListIndex = require('./pages/BusinessList/index').default;

var pagesHomeHomeIndex = require('./pages/home/Home/index').default;

var Taro = require('@tarojs/taro-rn');
/* eslint-disable react/sort-comp */

var appStyleSheet = require('./app_styles').default;

var _styleSheet = appStyleSheet;
console.ignoredYellowBox = ["Warning: BackAndroid is deprecated. Please use BackHandler instead.", "source.uri should not be an empty string", "Invalid props.style key"];
console.disableYellowBox = true; // 关闭全部黄色警告
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

var App = function (_Component) {
  _inherits(App, _Component);

  function App(props, context) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props, context));

    Taro._$app = _this;
    _this.RootStack = _taroRouterRn2.default.initRouter([['pages/home/Home/index', pagesHomeHomeIndex], ['pages/BusinessList/index', pagesBusinessListIndex], ['pages/Index/index', pagesIndexIndex], ['pages/List/index', pagesListIndex], ['pages/Form/index', pagesFormIndex], ['pages/Test/index', pagesTestIndex], ['pages/ReferPage/index', pagesReferPageIndex], ['pages/user/User/index', pagesUserUserIndex], ['pages/cart/Cart/index', pagesCartCartIndex], ['pages/home/search/Search/index', pagesHomeSearchSearchIndex], ['pages/home/search/components/SearchGoodsList/index', pagesHomeSearchComponentsSearchGoodsListIndex]], Taro, {
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTextStyle: 'black'
      },
      tabBar: {
        color: '#989CA5',
        selectedColor: '#4381E5',
        list: [{
          pagePath: "pages/home/Home/index",
          iconPath: assetsTabBarHomePng,
          selectedIconPath: assetsTabBarHomeActivePng,
          text: "首页"
        }, {
          pagePath: "pages/BusinessList/index",
          iconPath: assetsTabBarCatePng,
          selectedIconPath: assetsTabBarCateActivePng,
          text: "合作厂商"
        }, {
          pagePath: "pages/cart/Cart/index",
          iconPath: assetsTabBarCartPng,
          selectedIconPath: assetsTabBarCartActivePng,
          text: "购物车"
        }, {
          pagePath: "pages/user/User/index",
          iconPath: assetsTabBarUserPng,
          selectedIconPath: assetsTabBarUserActivePng,
          text: "个人"
        }]
      }
    });
    return _this;
  }

  _createClass(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.componentDidShow();
    } /**
       * 指定config的类型声明为: Taro.Config
       *
       * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
       * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
       * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
       */

  }, {
    key: 'componentDidShow',
    value: function componentDidShow() {}
  }, {
    key: 'componentDidHide',
    value: function componentDidHide() {}
  }, {
    key: 'componentDidCatchError',
    value: function componentDidCatchError() {} // 在 App 类中的 render() 函数没有实际作用
    // 请勿修改此函数


  }, {
    key: 'render',
    value: function render() {
      var RootStack = this.RootStack;
      return _react2.default.createElement(
        _taroReduxRn.Provider,
        { store: _createStore2.default },
        _react2.default.createElement(
          _componentsRn.Provider,
          null,
          _react2.default.createElement(RootStack, null)
        )
      );
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.componentDidHide && this.componentDidHide();
    }
  }]);

  return App;
}(_taroRn.Component);

Taro.initNativeApi(Taro);
Taro.initPxTransform({
  "designWidth": 750,
  "deviceRatio": {
    "640": 1.17,
    "750": 1,
    "828": 0.905
  }
});
exports.default = App;

/***/ }),

/***/ "./src/models/hello.ts":
/*!*****************************!*\
  !*** ./src/models/hello.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var helloModel = {
  namespace: 'hello',
  state: {
    count: 0
  },
  effects: {
    add: /*#__PURE__*/_regenerator2.default.mark(function add(param, _ref) {
      var put = _ref.put,
          select = _ref.select;

      var _ref2, count;

      return _regenerator2.default.wrap(function add$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return select(function (state) {
                return state.hello;
              });

            case 2:
              _ref2 = _context.sent;
              count = _ref2.count;
              _context.next = 6;
              return put({
                type: 'updateState',
                payload: {
                  count: count + 1
                }
              });

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, add, this);
    }),
    minus: /*#__PURE__*/_regenerator2.default.mark(function minus(param, _ref3) {
      var put = _ref3.put,
          select = _ref3.select;

      var _ref4, count;

      return _regenerator2.default.wrap(function minus$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return select(function (state) {
                return state.hello;
              });

            case 2:
              _ref4 = _context2.sent;
              count = _ref4.count;
              _context2.next = 6;
              return put({
                type: 'updateState',
                payload: {
                  count: count - 1
                }
              });

            case 6:
            case 'end':
              return _context2.stop();
          }
        }
      }, minus, this);
    })
  },
  reducers: {
    updateState: function updateState(state, _ref5) {
      var payload = _ref5.payload;

      return _extends({}, state, payload);
    }
  }
};
exports.default = helloModel;

/***/ }),

/***/ "./src/models/index.ts":
/*!*****************************!*\
  !*** ./src/models/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test = exports.hello = undefined;

var _hello = __webpack_require__(/*! ./hello */ "./src/models/hello.ts");

var _hello2 = _interopRequireDefault(_hello);

var _test = __webpack_require__(/*! ./test */ "./src/models/test.ts");

var _test2 = _interopRequireDefault(_test);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const requireContext = require("require-context");
// const context = requireContext('./', true, /\.(j|t)s[x]?$/);
/* const context = require.context('./', true, /\.(js|ts)[x]?$/);
// const fs = require('fs');
// const context = require('babel-plugin-require-context-hook/register')('./', true, /\.(j|t)s[x]?$/);
const keysArr: string[] = context.keys().filter(item => item !== './index.js').map(key => context(key));
console.log("context", context);
console.log("keysArr", keysArr);
export default keysArr; */exports.hello = _hello2.default;
exports.test = _test2.default;

/***/ }),

/***/ "./src/models/test.ts":
/*!****************************!*\
  !*** ./src/models/test.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ "babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var helloModel = {
  namespace: 'test',
  state: {
    count: 0
  },
  effects: {
    add: /*#__PURE__*/_regenerator2.default.mark(function add(param, _ref) {
      var put = _ref.put,
          select = _ref.select;

      var _ref2, count;

      return _regenerator2.default.wrap(function add$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return select(function (state) {
                return state.test;
              });

            case 2:
              _ref2 = _context.sent;
              count = _ref2.count;
              _context.next = 6;
              return put({
                type: 'updateState',
                payload: {
                  count: count + 1
                }
              });

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, add, this);
    }),
    minus: /*#__PURE__*/_regenerator2.default.mark(function minus(param, _ref3) {
      var put = _ref3.put,
          select = _ref3.select;

      var _ref4, count;

      return _regenerator2.default.wrap(function minus$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return select(function (state) {
                return state.test;
              });

            case 2:
              _ref4 = _context2.sent;
              count = _ref4.count;
              _context2.next = 6;
              return put({
                type: 'updateState',
                payload: {
                  count: count - 1
                }
              });

            case 6:
            case 'end':
              return _context2.stop();
          }
        }
      }, minus, this);
    })
  },
  reducers: {
    updateState: function updateState(state, _ref5) {
      var payload = _ref5.payload;

      return _extends({}, state, payload);
    }
  }
};
exports.default = helloModel;

/***/ }),

/***/ "./src/store/createStore.ts":
/*!**********************************!*\
  !*** ./src/store/createStore.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = undefined;

var _dvaCore = __webpack_require__(/*! dva-core */ "dva-core");

var _index = __webpack_require__(/*! ../models/index */ "./src/models/index.ts");

var models = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var app = (0, _dvaCore.create)(); /* function loadModels(): void {
                                      require('../models').default.forEach(item => app.model(item.default))
                                  } */

function loadModels() {
  for (var key in models) {
    app.model(models[key]);
  }
}

loadModels();
app.start();
exports.app = app;
exports.default = app._store;

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

/***/ "@tarojs/taro-router-rn":
/*!*****************************************!*\
  !*** external "@tarojs/taro-router-rn" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@tarojs/taro-router-rn");

/***/ }),

/***/ "babel-runtime/regenerator":
/*!********************************************!*\
  !*** external "babel-runtime/regenerator" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/regenerator");

/***/ }),

/***/ "dva-core":
/*!***************************!*\
  !*** external "dva-core" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dva-core");

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