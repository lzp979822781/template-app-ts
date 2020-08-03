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
/******/ 		"pages/home/Home/index": 0
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
/******/ 	deferredModules.push(["./src/pages/home/Home/index.tsx","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/pages/home/DrugItem/index.scss":
/*!********************************************!*\
  !*** ./src/pages/home/DrugItem/index.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/pages/home/DrugItem/index.tsx":
/*!*******************************************!*\
  !*** ./src/pages/home/DrugItem/index.tsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _taroRn = __webpack_require__(/*! @tarojs/taro-rn */ "@tarojs/taro-rn");

var _componentsRn = __webpack_require__(/*! @tarojs/components-rn */ "@tarojs/components-rn");

var _arrowright = __webpack_require__(/*! ../../../assets/images/arrowright.png */ "./src/assets/images/arrowright.png");

var _arrowright2 = _interopRequireDefault(_arrowright);

var _index = __webpack_require__(/*! ../components/index */ "./src/pages/home/components/index.tsx");

__webpack_require__(/*! ./index.scss */ "./src/pages/home/DrugItem/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var indexStyleSheet = require('./index_styles').default;

var _styleSheet = indexStyleSheet;
var defaultProps = {
  itemData: {},
  onItemClick: function onItemClick() {}
};

var DrugItem = (_temp2 = _class = function (_Component) {
  _inherits(DrugItem, _Component);

  function DrugItem() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DrugItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DrugItem.__proto__ || Object.getPrototypeOf(DrugItem)).call.apply(_ref, [this].concat(args))), _this), _this.getFieldVal = function (field) {
      var itemData = _this.props.itemData;

      return itemData[field];
    }, _this.onClick = function () {
      var _this$props = _this.props,
          itemData = _this$props.itemData,
          onItemClick = _this$props.onItemClick;


      if (onItemClick) {
        onItemClick(itemData);
      }
    }, _this.renderSelfSku = function () {
      var selfSku = _this.getFieldVal("selfSku");
      if (!selfSku) return null;
      return _react2.default.createElement(
        _componentsRn.View,
        { style: _styleSheet["drug-content-title-selfsku"] },
        _react2.default.createElement(
          _componentsRn.Text,
          { style: _styleSheet["drug-content-title-selfsku-txt"] },
          "\u81EA\u8425"
        )
      );
    }, _this.renderReduce = function () {
      var secKill = _this.getFieldVal("secKill");
      if (!secKill) return null;
      return _react2.default.createElement(
        _componentsRn.View,
        { style: _styleSheet["drug-content-price-seckill"] },
        _react2.default.createElement(
          _componentsRn.Text,
          null,
          "\u6EE1\u51CF"
        )
      );
    }, _this.renderContent = function () {
      var _this$props$itemData = _this.props.itemData,
          title = _this$props$itemData.title,
          subTitle = _this$props$itemData.subTitle,
          spec = _this$props$itemData.spec,
          minPrice = _this$props$itemData.minPrice,
          maxPrice = _this$props$itemData.maxPrice,
          isReduce = _this$props$itemData.isReduce,
          secKill = _this$props$itemData.secKill,
          saleShopNum = _this$props$itemData.saleShopNum;

      return _react2.default.createElement(
        _componentsRn.View,
        { style: _styleSheet["drug-content"] },
        _react2.default.createElement(
          _componentsRn.View,
          { style: _styleSheet["drug-content-title-container"] },
          _this.renderSelfSku(),
          _react2.default.createElement(
            _componentsRn.View,
            { style: _styleSheet["drug-content-title-txt-container"] },
            _react2.default.createElement(
              _componentsRn.Text,
              { numberOfLines: 1, style: _styleSheet["drug-content-title-txt"] },
              title
            )
          )
        ),
        _react2.default.createElement(
          _componentsRn.View,
          { style: _styleSheet["drug-content-subtitle-container"] },
          _react2.default.createElement(
            _componentsRn.Text,
            { style: _styleSheet["drug-content-subtitle-txt"] },
            subTitle
          )
        ),
        _react2.default.createElement(
          _componentsRn.View,
          { style: _styleSheet["drug-content-spec-container"] },
          _react2.default.createElement(
            _componentsRn.View,
            { style: _styleSheet["drug-content-spec-container-child"] },
            _react2.default.createElement(
              _componentsRn.Text,
              { style: _styleSheet["drug-content-spec-txt"] },
              "\u89C4\u683C:" + spec
            )
          )
        ),
        _react2.default.createElement(
          _componentsRn.View,
          { style: _styleSheet["drug-content-price-container"] },
          _react2.default.createElement(
            _componentsRn.Text,
            { style: _styleSheet["drug-content-price-txt"] },
            "\uFFE5" + minPrice + "-" + maxPrice
          ),
          _react2.default.createElement(_index.DrugTag, { text: isReduce ? '满减' : '', "custom-cls": "drug-content-price-tag", rnStyle: {
              marginLeft: 4
            }, style: _styleSheet["drug-content-price-tag"] }),
          _react2.default.createElement(_index.DrugTag, { text: secKill ? '秒杀' : '', "custom-cls": "drug-content-price-tag", rnStyle: {
              marginLeft: 4
            }, style: _styleSheet["drug-content-price-tag"] })
        ),
        _react2.default.createElement(
          _componentsRn.View,
          { onClick: _this.onClick, style: _styleSheet["drug-content-shop"] },
          _react2.default.createElement(
            _componentsRn.Text,
            { style: _styleSheet["drug-content-shop-txt"] },
            "\u8BE5\u533A\u57DF\u5171" + saleShopNum + "\u4E2A\u5546\u5BB6\u5728\u552E"
          ),
          _react2.default.createElement(_componentsRn.Image, { src: _arrowright2.default, style: _styleSheet["drug-content-shop-image"] })
        )
      );
    }, _this.renderImage = function () {
      return _react2.default.createElement(
        _componentsRn.View,
        null,
        _react2.default.createElement(_componentsRn.Image, { src: _this.getFieldVal('imgSrc'), style: _styleSheet["drug-image"] })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  } /**
     * 渲染是否满减
     */


  _createClass(DrugItem, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        _componentsRn.View,
        { style: _styleSheet["drug"] },
        this.renderImage(),
        this.renderContent()
      );
    }
  }]);

  return DrugItem;
}(_taroRn.Component), _class.defaultProps = defaultProps, _temp2);
exports.default = DrugItem;

/***/ }),

/***/ "./src/pages/home/ExplosiveActivities/index.scss":
/*!*******************************************************!*\
  !*** ./src/pages/home/ExplosiveActivities/index.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/pages/home/ExplosiveActivities/index.tsx":
/*!******************************************************!*\
  !*** ./src/pages/home/ExplosiveActivities/index.tsx ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _taroRn = __webpack_require__(/*! @tarojs/taro-rn */ "@tarojs/taro-rn");

var _componentsRn = __webpack_require__(/*! @tarojs/components-rn */ "@tarojs/components-rn");

var _ = __webpack_require__(/*! ../../../assets/images/03.png */ "./src/assets/images/03.png");

var _2 = _interopRequireDefault(_);

var _3 = __webpack_require__(/*! ../../../assets/images/04.png */ "./src/assets/images/04.png");

var _4 = _interopRequireDefault(_3);

var _index = __webpack_require__(/*! ../components/index */ "./src/pages/home/components/index.tsx");

__webpack_require__(/*! ./index.scss */ "./src/pages/home/ExplosiveActivities/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var indexStyleSheet = require('./index_styles').default;

var _styleSheet = indexStyleSheet;

var WonderfulVenue = (_temp2 = _class = function (_Component) {
  _inherits(WonderfulVenue, _Component);

  function WonderfulVenue() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, WonderfulVenue);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = WonderfulVenue.__proto__ || Object.getPrototypeOf(WonderfulVenue)).call.apply(_ref, [this].concat(args))), _this), _this.renderSubCard = function () {
      return _react2.default.createElement(
        _componentsRn.View,
        { style: _styleSheet["explosive-subcard"] },
        _react2.default.createElement(
          _componentsRn.View,
          { style: _styleSheet["explosive-subcard-container"] },
          _react2.default.createElement(_index.BaseCard, { title: "\u9650\u552E\u7545\u9500\u54C1", description: "\u7206\u6B3E\u76F4\u964D \u597D\u8D27\u62A2\u5148", "custom-cls": "explosive-subcard-left", mainTitleStyle: {
              color: '#fff'
            }, subTitleStyle: {
              color: '#fff'
            }, appendConStyle: {
              backgroundColor: '#fff'
            }, appendTxtStyle: {
              color: '#828CC6'
            }, customStyle: {
              backgroundColor: '#828CC6'
            } }),
          _react2.default.createElement(_index.BaseCard, { title: "\u9650\u552E\u7545\u9500\u54C1", description: "\u7206\u6B3E\u76F4\u964D \u597D\u8D27\u62A2\u5148", "custom-cls": "explosive-subcard-right", customStyle: {
              backgroundColor: '#EB7E7D'
            }, mainTitleStyle: {
              color: '#fff'
            }, subTitleStyle: {
              color: '#fff'
            }, appendConStyle: {
              backgroundColor: '#fff'
            }, appendTxtStyle: {
              color: '#EB7E7D'
            } })
        ),
        _react2.default.createElement(
          _componentsRn.View,
          { style: _styleSheet["explosive-subcard-sub-container"] },
          _react2.default.createElement(_index.SubCard, { title: "\u6D3B\u52A8\u6807\u9898", description: "\u6EE11000\u51CF90", src: _2.default }),
          _react2.default.createElement(_index.SubCard, { title: "\u6D3B\u52A8\u6807\u9898", description: "\u6EE11000\u51CF90", src: _4.default }),
          _react2.default.createElement(_index.SubCard, { title: "\u6D3B\u52A8\u6807\u9898", description: "\u6EE11000\u51CF90", src: _2.default }),
          _react2.default.createElement(_index.SubCard, { title: "\u6D3B\u52A8\u6807\u9898", description: "\u6EE11000\u51CF90", src: _4.default })
        )
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(WonderfulVenue, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        _componentsRn.View,
        { style: [_styleSheet["explosive"], _styleSheet["custom-cls"]] },
        _react2.default.createElement(_index.Title, { title: "\u7206\u54C1\u6D3B\u52A8", description: "\u8DDF\u6211\u73A9\u62A2\u7206\u54C1" }),
        this.renderSubCard()
      );
    }
  }]);

  return WonderfulVenue;
}(_taroRn.Component), _class.externalClasses = ['custom-cls'], _temp2);
exports.default = WonderfulVenue;

/***/ }),

/***/ "./src/pages/home/Home/index.scss":
/*!****************************************!*\
  !*** ./src/pages/home/Home/index.scss ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/pages/home/Home/index.tsx":
/*!***************************************!*\
  !*** ./src/pages/home/Home/index.tsx ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dec, _class, _class2, _temp;

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _taroRn = __webpack_require__(/*! @tarojs/taro-rn */ "@tarojs/taro-rn");

var _componentsRn = __webpack_require__(/*! @tarojs/components-rn */ "@tarojs/components-rn");

var _taroReduxRn = __webpack_require__(/*! @tarojs/taro-redux-rn */ "@tarojs/taro-redux-rn");

var _ = __webpack_require__(/*! ../../../assets/images/01.png */ "./src/assets/images/01.png");

var _2 = _interopRequireDefault(_);

var _3 = __webpack_require__(/*! ../../../assets/images/02.png */ "./src/assets/images/02.png");

var _4 = _interopRequireDefault(_3);

var _5 = __webpack_require__(/*! ../../../assets/images/03.png */ "./src/assets/images/03.png");

var _6 = _interopRequireDefault(_5);

var _7 = __webpack_require__(/*! ../../../assets/images/04.png */ "./src/assets/images/04.png");

var _8 = _interopRequireDefault(_7);

var _utils = __webpack_require__(/*! ../../../utils/utils */ "./src/utils/utils.ts");

var _index = __webpack_require__(/*! ../components/index */ "./src/pages/home/components/index.tsx");

var _index2 = __webpack_require__(/*! ../WonderfulVenue/index */ "./src/pages/home/WonderfulVenue/index.tsx");

var _index3 = _interopRequireDefault(_index2);

var _index4 = __webpack_require__(/*! ../ExplosiveActivities/index */ "./src/pages/home/ExplosiveActivities/index.tsx");

var _index5 = _interopRequireDefault(_index4);

var _index6 = __webpack_require__(/*! ../DrugItem/index */ "./src/pages/home/DrugItem/index.tsx");

var _index7 = _interopRequireDefault(_index6);

__webpack_require__(/*! ./index.scss */ "./src/pages/home/Home/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Taro = require('@tarojs/taro-rn');

var indexStyleSheet = require('./index_styles').default;

var _styleSheet = indexStyleSheet;

var Home = (_dec = (0, _taroReduxRn.connect)(function (_ref) {
  var hello = _ref.hello,
      other = _objectWithoutProperties(_ref, ['hello']);

  return _extends({}, hello, other);
}), _dec(_class = (_temp = _class2 = function (_Component) {
  _inherits(Home, _Component);

  function Home(props) {
    _classCallCheck(this, Home);

    var _this = _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this, props));

    _this.onScan = function () {
      console.log("扫描事件");
      var type = Taro.getEnv();

      if (type !== 'RN') {
        Taro.scanCode({
          scanType: ['barCode', 'qrCode']
        }).then(function (res) {
          console.log("res", res);
        }).catch(function (e) {
          console.log("扫描错误", e);
        });
      }
    };

    _this.onSearchClick = function () {
      Taro.navigateTo({
        url: '/pages/home/search/Search/index'
      });
    };

    _this.onListScrollLower = function (event) {
      console.log("scrollLower", event);
    };

    _this.onListItemClick = function (itemData) {
      console.log('itemData', itemData);
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
              backgroundColor: '#8EA7E1'
            }] },
          _react2.default.createElement(
            _componentsRn.View,
            null,
            _react2.default.createElement(_componentsRn.Image, { src: url })
          )
        );
      });
    };

    _this.renderListTitle = function () {
      return _react2.default.createElement(
        _componentsRn.View,
        null,
        _react2.default.createElement(_index.Title, { title: '\u5E38\u8D2D\u836F\u54C1', more: '\u66F4\u591A\u5E38\u8D2D\u836F\u54C1' })
      );
    };

    _this.renderList = function () {
      var data = [{
        imgSrc: _2.default,
        selfSku: true,
        title: '澳佳宝原味深海原鱼油',
        subTitle: '广西玉林制药集团有限公司',
        spec: '10g*9袋',
        minPrice: '2.68',
        maxPrice: '186.00',
        isReduce: true,
        // 是否满减
        secKill: true,
        // 秒杀
        saleShopNum: 22
      }, {
        imgSrc: _4.default,
        selfSku: true,
        title: 'HECH赫熙天然鱼子酱鱼子酱',
        subTitle: '广西玉林制药集团有限公司',
        spec: '10g*9袋',
        minPrice: '2.68',
        maxPrice: '186.00',
        isReduce: false,
        // 是否满减
        secKill: false,
        // 秒杀
        saleShopNum: 22
      }, {
        imgSrc: _6.default,
        selfSku: false,
        title: '润肺定喘去痰止咳',
        subTitle: '广西玉林制药集团有限公司',
        spec: '10g*9袋',
        minPrice: '2.68',
        maxPrice: '186.00',
        isReduce: true,
        // 是否满减
        secKill: false,
        // 秒杀
        saleShopNum: 22
      }];
      return _react2.default.createElement(
        _componentsRn.View,
        { style: _styleSheet["home-list"] },
        _this.renderListTitle(),
        _react2.default.createElement(
          _componentsRn.ScrollView,
          { scrollY: true, scrollWithAnimation: true, scrollTop: 0, lowerThreshold: 20, onScrollToLower: _this.onListScrollLower },
          data.map(function (item) {
            return _react2.default.createElement(_index7.default, { itemData: item, onItemClick: _this.onListItemClick, key: (0, _utils.UUID)() });
          })
        )
      );
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

    _this.state = {};
    return _this;
  }
  /**
  * 指定config的类型声明为: Taro.Config
  *
  * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
  * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
  * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
  */

  _createClass(Home, [{
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

    /**
     * 列表滚动到底部时触发
     */

  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _componentsRn.View,
        { style: _styleSheet["home"] },
        _react2.default.createElement(
          _componentsRn.View,
          { style: _styleSheet["nav"] },
          _react2.default.createElement(
            _componentsRn.View,
            { style: _styleSheet["header"] },
            _react2.default.createElement(_index.HomeSearch, { onClick: this.onSearchClick })
          )
        ),
        _react2.default.createElement(
          _componentsRn.Swiper,
          { indicatorColor: '#999', indicatorActiveColor: '#333', circular: true, indicatorDots: true, interval: 2000, autoplay: true, style: _styleSheet["swipper-container"] },
          this.renderSwipperItem()
        ),
        _react2.default.createElement(_index3.default, null),
        _react2.default.createElement(_index5.default, { 'custom-cls': 'explosive-custom' }),
        this.renderList()
      );
    }
  }]);

  return Home;
}(_taroRn.Component), _class2.config = {
  navigationBarTitleText: '首页'
}, _temp)) || _class);
exports.default = Home;

/***/ }),

/***/ "./src/pages/home/WonderfulVenue/index.scss":
/*!**************************************************!*\
  !*** ./src/pages/home/WonderfulVenue/index.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/pages/home/WonderfulVenue/index.tsx":
/*!*************************************************!*\
  !*** ./src/pages/home/WonderfulVenue/index.tsx ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _taroRn = __webpack_require__(/*! @tarojs/taro-rn */ "@tarojs/taro-rn");

var _componentsRn = __webpack_require__(/*! @tarojs/components-rn */ "@tarojs/components-rn");

var _ = __webpack_require__(/*! ../../../assets/images/01.png */ "./src/assets/images/01.png");

var _2 = _interopRequireDefault(_);

var _3 = __webpack_require__(/*! ../../../assets/images/02.png */ "./src/assets/images/02.png");

var _4 = _interopRequireDefault(_3);

var _index = __webpack_require__(/*! ../components/index */ "./src/pages/home/components/index.tsx");

__webpack_require__(/*! ./index.scss */ "./src/pages/home/WonderfulVenue/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var indexStyleSheet = require('./index_styles').default;

var _styleSheet = indexStyleSheet;

var WonderfulVenue = function (_Component) {
  _inherits(WonderfulVenue, _Component);

  function WonderfulVenue() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, WonderfulVenue);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = WonderfulVenue.__proto__ || Object.getPrototypeOf(WonderfulVenue)).call.apply(_ref, [this].concat(args))), _this), _this.onMoreClick = function () {
      console.log("点击更多按钮");
    }, _this.renderMainCard = function () {
      return _react2.default.createElement(
        _componentsRn.View,
        { style: _styleSheet["wonderful-venue-maincard"] },
        _react2.default.createElement(
          _componentsRn.View,
          { style: _styleSheet["wonderful-venue-maincard-title-container"] },
          _react2.default.createElement(
            _componentsRn.Text,
            { style: _styleSheet["wonderful-venue-maincard-title"] },
            "\u65B0\u54C1\u5B63\u672B\u51FA\u6E05"
          )
        ),
        _react2.default.createElement(
          _componentsRn.View,
          null,
          _react2.default.createElement(
            _componentsRn.Text,
            { style: _styleSheet["wonderful-venue-maincard-subtitle"] },
            "\u7206\u6B3E\u76F4\u964D \u597D\u8D27\u62A2\u5148"
          )
        ),
        _react2.default.createElement(
          _componentsRn.View,
          { style: _styleSheet["wonderful-venue-maincard-btn"] },
          _react2.default.createElement(
            _componentsRn.Text,
            { style: _styleSheet["wonderful-venue-maincard-btn-txt"] },
            "\u66F4\u591A"
          )
        )
      );
    }, _this.renderSubCard = function () {
      return _react2.default.createElement(
        _componentsRn.View,
        { style: _styleSheet["wonderful-venue-subcard"] },
        _react2.default.createElement(_index.BaseCard, { title: "\u54C1\u724C\u6D3B\u52A8\u3002", description: "\u5168\u573A\u54C1\u724C\u6EE1\u51CF90", src: _2.default }),
        _react2.default.createElement(_index.BaseCard, { title: "\u65B0\u54C1\u5B63\u672B\u51FA\u6E05", description: "\u7206\u6B3E\u76F4\u964D \u597D\u8D27\u62A2\u5148", src: _4.default })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(WonderfulVenue, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        _componentsRn.View,
        { style: _styleSheet["wonderful-venue"] },
        _react2.default.createElement(_index.Title, { title: "\u4EAC\u91C7\u4F1A\u573A", description: "\u901B\u4F1A\u573A\u4EAB\u949C\u60E0", onMoreClick: this.onMoreClick }),
        this.renderMainCard(),
        this.renderSubCard()
      );
    }
  }]);

  return WonderfulVenue;
}(_taroRn.Component);

exports.default = WonderfulVenue;

/***/ }),

/***/ "./src/pages/home/components/BaseCard/index.scss":
/*!*******************************************************!*\
  !*** ./src/pages/home/components/BaseCard/index.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/pages/home/components/BaseCard/index.tsx":
/*!******************************************************!*\
  !*** ./src/pages/home/components/BaseCard/index.tsx ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _taroRn = __webpack_require__(/*! @tarojs/taro-rn */ "@tarojs/taro-rn");

var _componentsRn = __webpack_require__(/*! @tarojs/components-rn */ "@tarojs/components-rn");

__webpack_require__(/*! ./index.scss */ "./src/pages/home/components/BaseCard/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var indexStyleSheet = require('./index_styles').default;

var _styleSheet = indexStyleSheet;
var defaultProps = {
  showGo: true,
  onClick: function onClick() {},
  mainTitleStyle: {
    color: '#333840'
  },
  subTitleStyle: {
    color: '#989CA5'
  },
  appendConStyle: {
    backgroundColor: '#4381E5'
  },
  appendTxtStyle: {
    color: '#fff'
  },
  customStyle: {
    backgroundColor: '#F7F8FB'
  }
};

var BaseCard = (_temp = _class = function (_Component) {
  _inherits(BaseCard, _Component);

  function BaseCard() {
    _classCallCheck(this, BaseCard);

    return _possibleConstructorReturn(this, (BaseCard.__proto__ || Object.getPrototypeOf(BaseCard)).apply(this, arguments));
  }

  _createClass(BaseCard, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          title = _props.title,
          description = _props.description,
          showGo = _props.showGo,
          src = _props.src,
          onClick = _props.onClick,
          customStyle = _props.customStyle,
          mainTitleStyle = _props.mainTitleStyle,
          subTitleStyle = _props.subTitleStyle,
          appendConStyle = _props.appendConStyle,
          appendTxtStyle = _props.appendTxtStyle;

      return _react2.default.createElement(
        _componentsRn.View,
        { style: [_styleSheet["basecard"], _styleSheet["custom-cls"], customStyle] },
        _react2.default.createElement(
          _componentsRn.View,
          { style: _styleSheet["basecard-title-container"] },
          _react2.default.createElement(
            _componentsRn.Text,
            { style: [_styleSheet["basecard-title-txt"], mainTitleStyle] },
            title
          )
        ),
        _react2.default.createElement(
          _componentsRn.View,
          { style: _styleSheet["basecard-desc-container"] },
          _react2.default.createElement(
            _componentsRn.Text,
            { style: [_styleSheet["basecard-desc-txt"], subTitleStyle] },
            description
          )
        ),
        _react2.default.createElement(
          _componentsRn.View,
          { style: _styleSheet["basecard-footer"] },
          _react2.default.createElement(
            _componentsRn.View,
            { style: _styleSheet["basecard-footer-container"] },
            showGo ? _react2.default.createElement(
              _componentsRn.View,
              { onClick: onClick, style: [_styleSheet["basecard-footer-container-container"], appendConStyle] },
              _react2.default.createElement(
                _componentsRn.Text,
                { style: [_styleSheet["basecard-footer-container-txt"], appendTxtStyle] },
                "Go"
              )
            ) : null
          ),
          src ? _react2.default.createElement(_componentsRn.Image, { src: src, style: _styleSheet["basecard-footer-container-img"] }) : null
        )
      );
    }
  }]);

  return BaseCard;
}(_taroRn.Component), _class.externalClasses = ['custom-cls'], _class.defaultProps = defaultProps, _temp);
exports.default = BaseCard;

/***/ }),

/***/ "./src/pages/home/components/DrugTag/index.scss":
/*!******************************************************!*\
  !*** ./src/pages/home/components/DrugTag/index.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/pages/home/components/DrugTag/index.tsx":
/*!*****************************************************!*\
  !*** ./src/pages/home/components/DrugTag/index.tsx ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Taro) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _taroRn = __webpack_require__(/*! @tarojs/taro-rn */ "@tarojs/taro-rn");

var _componentsRn = __webpack_require__(/*! @tarojs/components-rn */ "@tarojs/components-rn");

__webpack_require__(/*! ./index.scss */ "./src/pages/home/components/DrugTag/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var DrugTag = (_temp = _class = function (_Component) {
  _inherits(DrugTag, _Component);

  function DrugTag() {
    _classCallCheck(this, DrugTag);

    return _possibleConstructorReturn(this, (DrugTag.__proto__ || Object.getPrototypeOf(DrugTag)).apply(this, arguments));
  }

  _createClass(DrugTag, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          text = _props.text,
          rnStyle = _props.rnStyle,
          className = _props.className;

      if (!text) return null;
      var style = Taro.getEnv() === 'RN' ? rnStyle : {};
      return _react2.default.createElement(
        _componentsRn.View,
        { style: [_getStyle("tag custom-cls " + className), style] },
        _react2.default.createElement(
          _componentsRn.Text,
          { style: _styleSheet["tag-txt"] },
          text
        )
      );
    }
  }]);

  return DrugTag;
}(_taroRn.Component), _class.externalClasses = ['custom-cls'], _temp);
exports.default = DrugTag;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! @tarojs/taro-rn */ "@tarojs/taro-rn")))

/***/ }),

/***/ "./src/pages/home/components/HomeSearch/index.scss":
/*!*********************************************************!*\
  !*** ./src/pages/home/components/HomeSearch/index.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/pages/home/components/HomeSearch/index.tsx":
/*!********************************************************!*\
  !*** ./src/pages/home/components/HomeSearch/index.tsx ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _taroRn = __webpack_require__(/*! @tarojs/taro-rn */ "@tarojs/taro-rn");

var _componentsRn = __webpack_require__(/*! @tarojs/components-rn */ "@tarojs/components-rn");

var _search = __webpack_require__(/*! ../../../../assets/images/search.png */ "./src/assets/images/search.png");

var _search2 = _interopRequireDefault(_search);

var _scan = __webpack_require__(/*! ../../../../assets/images/scan.png */ "./src/assets/images/scan.png");

var _scan2 = _interopRequireDefault(_scan);

__webpack_require__(/*! ./index.scss */ "./src/pages/home/components/HomeSearch/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var indexStyleSheet = require('./index_styles').default;

var _styleSheet = indexStyleSheet;
var defaultProps = {
  leftSrc: _search2.default,
  rightSrc: _scan2.default,
  onLeftClick: function onLeftClick() {},
  onRightClick: function onRightClick() {},
  onClick: function onClick() {}
};

var HomeSearch = (_temp = _class = function (_Component) {
  _inherits(HomeSearch, _Component);

  function HomeSearch(props) {
    _classCallCheck(this, HomeSearch);

    var _this = _possibleConstructorReturn(this, (HomeSearch.__proto__ || Object.getPrototypeOf(HomeSearch)).call(this, props));

    _this.renderSearchIcon = function () {
      var _this$props = _this.props,
          leftSrc = _this$props.leftSrc,
          onLeftClick = _this$props.onLeftClick;

      return _react2.default.createElement(
        _componentsRn.View,
        { onClick: onLeftClick, style: _styleSheet["home-search-icon"] },
        _react2.default.createElement(_componentsRn.Image, { src: leftSrc, style: _styleSheet["home-search-icon-image"] })
      );
    };

    _this.renderScan = function () {
      var _this$props2 = _this.props,
          rightSrc = _this$props2.rightSrc,
          onRightClick = _this$props2.onRightClick;

      return _react2.default.createElement(
        _componentsRn.View,
        { onClick: onRightClick, style: _styleSheet["home-search-scan"] },
        rightSrc ? _react2.default.createElement(_componentsRn.Image, { src: rightSrc, style: _styleSheet["home-search-scan-image"] }) : null
      );
    };

    _this.state = {};
    return _this;
  } /**
     * 左侧搜索图标的渲染
     * @returns
     */

  _createClass(HomeSearch, [{
    key: "render",
    value: function render() {
      var onClick = this.props.onClick;

      return _react2.default.createElement(
        _componentsRn.View,
        { style: [_styleSheet["home-search-header"], _styleSheet["search-cls"]] },
        this.renderSearchIcon(),
        _react2.default.createElement(_componentsRn.View, { onClick: onClick, style: _styleSheet["home-search-input"] })
      );
    }
  }]);

  return HomeSearch;
}(_taroRn.Component), _class.defaultProps = defaultProps, _class.externalClasses = ['search-cls'], _temp);
exports.default = HomeSearch;

/***/ }),

/***/ "./src/pages/home/components/SubCard/index.scss":
/*!******************************************************!*\
  !*** ./src/pages/home/components/SubCard/index.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/pages/home/components/SubCard/index.tsx":
/*!*****************************************************!*\
  !*** ./src/pages/home/components/SubCard/index.tsx ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _taroRn = __webpack_require__(/*! @tarojs/taro-rn */ "@tarojs/taro-rn");

var _componentsRn = __webpack_require__(/*! @tarojs/components-rn */ "@tarojs/components-rn");

__webpack_require__(/*! ./index.scss */ "./src/pages/home/components/SubCard/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var indexStyleSheet = require('./index_styles').default;

var _styleSheet = indexStyleSheet;
var defaultProps = {
  showGo: true,
  onClick: function onClick() {},
  customStyle: {
    backgroundColor: '#F7F8FB'
  }
};

var BaseCard = (_temp = _class = function (_Component) {
  _inherits(BaseCard, _Component);

  function BaseCard() {
    _classCallCheck(this, BaseCard);

    return _possibleConstructorReturn(this, (BaseCard.__proto__ || Object.getPrototypeOf(BaseCard)).apply(this, arguments));
  }

  _createClass(BaseCard, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          title = _props.title,
          description = _props.description,
          src = _props.src,
          customStyle = _props.customStyle;

      return _react2.default.createElement(
        _componentsRn.View,
        { style: [_styleSheet["subcard"], _styleSheet["custom-cls"], customStyle] },
        _react2.default.createElement(
          _componentsRn.View,
          { style: _styleSheet["subcard-title-container"] },
          _react2.default.createElement(
            _componentsRn.Text,
            { style: _styleSheet["subcard-title-txt"] },
            title
          )
        ),
        _react2.default.createElement(
          _componentsRn.View,
          { style: _styleSheet["subcard-desc-container"] },
          _react2.default.createElement(
            _componentsRn.Text,
            { style: _styleSheet["subcard-desc-txt"] },
            description
          )
        ),
        _react2.default.createElement(
          _componentsRn.View,
          { style: _styleSheet["subcard-footer"] },
          _react2.default.createElement(_componentsRn.Image, { src: src, style: _styleSheet["subcard-footer-image"] })
        )
      );
    }
  }]);

  return BaseCard;
}(_taroRn.Component), _class.externalClasses = ['custom-cls'], _class.defaultProps = defaultProps, _temp);
exports.default = BaseCard;

/***/ }),

/***/ "./src/pages/home/components/Title/index.scss":
/*!****************************************************!*\
  !*** ./src/pages/home/components/Title/index.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/pages/home/components/Title/index.tsx":
/*!***************************************************!*\
  !*** ./src/pages/home/components/Title/index.tsx ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _taroRn = __webpack_require__(/*! @tarojs/taro-rn */ "@tarojs/taro-rn");

var _componentsRn = __webpack_require__(/*! @tarojs/components-rn */ "@tarojs/components-rn");

var _arrowright = __webpack_require__(/*! ../../../../assets/images/arrowright.png */ "./src/assets/images/arrowright.png");

var _arrowright2 = _interopRequireDefault(_arrowright);

__webpack_require__(/*! ./index.scss */ "./src/pages/home/components/Title/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var indexStyleSheet = require('./index_styles').default;

var _styleSheet = indexStyleSheet;
var defaultProps = {
  more: '更多活动',
  onMoreClick: function onMoreClick() {}
};

var Title = (_temp = _class = function (_Component) {
  _inherits(Title, _Component);

  function Title() {
    _classCallCheck(this, Title);

    return _possibleConstructorReturn(this, (Title.__proto__ || Object.getPrototypeOf(Title)).apply(this, arguments));
  }

  _createClass(Title, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          title = _props.title,
          description = _props.description,
          more = _props.more,
          onMoreClick = _props.onMoreClick;

      return _react2.default.createElement(
        _componentsRn.View,
        { style: _styleSheet["title"] },
        _react2.default.createElement(
          _componentsRn.View,
          { style: _styleSheet["title-title-container"] },
          _react2.default.createElement(
            _componentsRn.Text,
            { style: _styleSheet["title-title-text"] },
            title
          )
        ),
        _react2.default.createElement(
          _componentsRn.View,
          { style: _styleSheet["title-desc-container"] },
          _react2.default.createElement(
            _componentsRn.Text,
            { style: _styleSheet["title-desc-text"] },
            description
          )
        ),
        _react2.default.createElement(
          _componentsRn.View,
          { onClick: onMoreClick, style: _styleSheet["title-more-container"] },
          _react2.default.createElement(
            _componentsRn.Text,
            { style: _styleSheet["title-more-text"] },
            more
          ),
          _react2.default.createElement(_componentsRn.Image, { src: _arrowright2.default, style: _styleSheet["title-more-image"] })
        )
      );
    }
  }]);

  return Title;
}(_taroRn.Component), _class.defaultProps = defaultProps, _temp);
exports.default = Title;

/***/ }),

/***/ "./src/pages/home/components/index.tsx":
/*!*********************************************!*\
  !*** ./src/pages/home/components/index.tsx ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HomeSearch = exports.DrugTag = exports.SubCard = exports.BaseCard = exports.Title = undefined;

var _index = __webpack_require__(/*! ./Title/index */ "./src/pages/home/components/Title/index.tsx");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ./BaseCard/index */ "./src/pages/home/components/BaseCard/index.tsx");

var _index4 = _interopRequireDefault(_index3);

var _index5 = __webpack_require__(/*! ./SubCard/index */ "./src/pages/home/components/SubCard/index.tsx");

var _index6 = _interopRequireDefault(_index5);

var _index7 = __webpack_require__(/*! ./DrugTag/index */ "./src/pages/home/components/DrugTag/index.tsx");

var _index8 = _interopRequireDefault(_index7);

var _index9 = __webpack_require__(/*! ./HomeSearch/index */ "./src/pages/home/components/HomeSearch/index.tsx");

var _index10 = _interopRequireDefault(_index9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Title = _index2.default;
exports.BaseCard = _index4.default;
exports.SubCard = _index6.default;
exports.DrugTag = _index8.default;
exports.HomeSearch = _index10.default;

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