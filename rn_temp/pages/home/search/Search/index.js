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
/******/ 		"pages/home/search/Search/index": 0
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
/******/ 	deferredModules.push(["./src/pages/home/search/Search/index.tsx","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/assets/search/delete.png":
/*!**************************************!*\
  !*** ./src/assets/search/delete.png ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "./src/assets/search/down.png":
/*!************************************!*\
  !*** ./src/assets/search/down.png ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAbCAYAAAA3d3w1AAAAAXNSR0IArs4c6QAAAsVJREFUWAntV89PE0EUnmm5Uv8F+Q+IxoMx0TskJl56EAwLNymN3BWMoHdNqd5gicVDLyYmcEdjPBgJ/wH8C5YjbMf3dTubme3M7uyPakncpJnOm/fe977ZN1+njP1/rtcO8Hi5nvfsjhBXD2GvVNjnvb32SdxnEubLy41b/T57hFo4n/ri++9+qnVpxDxvbUMIsaU5cPZxerqy1mq1eqr9X31vNpu1i4v+jhDsiVoD53zT93e2pS0iNtyBX3JBH/lZtSoWdnfbP3T7352trDTuBgE/YEzMmJCpw27LDqtIB/la5VwfxUwQsG9LS43Nbrdb1dfGPwMmsFGDjRSqUDlExBzKA6FXR0dfjz1v/aaDfykuwAImsOnjvKkRMRxAl0roDN5j7PKUzuNjF/8iPiHG5WmImZ5J5RCdMYThddOAnXF6+JiExSYQKUW93N9vR8KnEUMgdokU5wP1ci0l0XC5XGFJE4jRmniPNvgpKeIndW2EGBbDM3TVcW0BCgnoszU//+BNvV7H98wPBOLw8Pg5BaJrnM4SSfx3xqYWff/teRzQSAxOAKJD+4LIbdC0MFAcWJ3n2UgitT03d/+1bSOtxCRw1tagtvhNd4HVeGvIfPExFAjxntr/RnzNPHdr/VRiSD48zABfMIOZrLxTq/GG7caCnL2eaNNZXjRFm2y0aQd0C1q15VRjnIjJgLKEZdxdgHozEUNAnvNAYQNhQXyZAoF8ticzMSTKLyzUeIMfeFs5mj1IEwjNOzbJRUzmyNpSMi59dBOIpDzRlSrJybaG2z4JxCx1dMfmk90+EJ3Zov8kCr0xtejssq1G489itp8JPXp0VhoxpM4hLIOKkm4QoyW7WUolBsiMwlJIIJIolk5MgqULS3GBkFimsZB4mBJKW7KwlCMQEss0ju2NqWBSWEKb+z1SzTGx3yEsobhMbInXo7A/MVlToLiiaYgAAAAASUVORK5CYII="

/***/ }),

/***/ "./src/assets/search/up.png":
/*!**********************************!*\
  !*** ./src/assets/search/up.png ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAbCAYAAAA3d3w1AAAAAXNSR0IArs4c6QAAA/9JREFUWAntV19IU2EU/75vekOcRmh/KAiEIKMiExLyoaiHinooiKR6CNsynFvQQsUKYkFUZmV6p8HUefcQlFQvPhjVQ9AfghFm9dIfU8TqZUpQw7ncbr+L3TXX3bd7WysCL4z77Zzfd875fefsfGeEzD7/1wnQvxVuZWXdIkJCdYTIkiS5X2barynTDnp6ekxm8yI7IeHbsixvIoRWlZaum1tevuOJ3/8gnCn/Gc2Y1XqkLBKRr4JQ6a8E6ChkR30+961fdelLMkLMZmuYNzHx9SzCOwxSjBcmpeSOIDCHxyMO8nBGdX+cmMVy5EAkEm1CIAv0BgNyIVkm5/LzWaMoipN69/Fwf4xYVZVzZTgcboezDTyHPB2l9C2ai12S2u7xcHp0aROrra3NHRsLnULJOXHq2XqcpsKA4A3GyDGv1/0xFTaZPi1ilZWOXSDTglNemszB78pRnl+w99T27RvFioqKiFE7v0Xs0CFH0dQUEZGlHUYdGsUjewO4IqolSXxqZK8hYi6XSxgaCuCSJSeRpRwjjtLEyiDYaTJlN3R1NY/rsaWb2MGDjs3IUDtKb7kew9oYGsSB5GrrdEkDjNF6r1eUQFTm7UhJbHoUmrgEUvt5hng6BKG08AuCUHh+cjKwD+tGECzg7eHpYO8x9DbeaJaUmDIK9fU9tMly9AyyNJfniK+j9wVBtnd0tL1RcXa7vSAYpI04LAtkSWNQ8dpvOsWY3JKTM9/V3u76mojRNMofhRJNJPtOP6FajuFOup4MYbHY10ejVBm51iTDpJbTUWSwBs2lNx47YwiGAzo8PNaEDHVhvTgeaGAdwR3kzstjuz0e9zPevv5+/+iJE7Udg4Mjn4Erx2cOD59El4+y3ltSUhYYGPD7VcyMjOFe6gQhq6o0+sbJoSVnofavPDe6t7rauSQU+tYM/3uM7lXw8B0lhBVLUiuml7j6BqnVMPpCERp9YHQcWT6OcujAmtutUtnGrLkFs2YbcMtSYRP1uNSbUPr1ijw2eSOgnYlAHd9xvxBJEOYsx98PT7qkFH9o5XcxDK+CLZcyHOuIIR6CP7PTT5a6QJ3m/VzrWdFXJpPJ5vW2PNKDNoL5MeGftlqd1yKRb25U0lY9+9EiAiouljFUZeyHpyq13zSIS7KuqKhwbSZIxfvElPEOd9U2xpjyu/sQr9Nes2uqPEbMbCZol3REVWi9UR63GRNWdHe7L2K8mtLCZELW3S3ezM2dX0wpu4wYNf0qpevztca6cGJXLEZgD5D6hfEBotbfI0sO/I3oi5f/i/V0kyNO+N6NPpWF8nsNspd8PjGWLSWuGcQUQU2NyxwMjlnwmysBIYZu14uy60WGwop+9pk9gcycwHegxWTw+mfz7wAAAABJRU5ErkJggg=="

/***/ }),

/***/ "./src/pages/home/search/Search/index.scss":
/*!*************************************************!*\
  !*** ./src/pages/home/search/Search/index.scss ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/pages/home/search/Search/index.tsx":
/*!************************************************!*\
  !*** ./src/pages/home/search/Search/index.tsx ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dec, _class;

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _taroRn = __webpack_require__(/*! @tarojs/taro-rn */ "@tarojs/taro-rn");

var _taroReduxRn = __webpack_require__(/*! @tarojs/taro-redux-rn */ "@tarojs/taro-redux-rn");

var _componentsRn = __webpack_require__(/*! @tarojs/components-rn */ "@tarojs/components-rn");

var _index = __webpack_require__(/*! ../../../../components/index */ "./src/components/index.tsx");

var _arrowLeft = __webpack_require__(/*! ../../../../assets/images/arrow-left.png */ "./src/assets/images/arrow-left.png");

var _arrowLeft2 = _interopRequireDefault(_arrowLeft);

var _delete = __webpack_require__(/*! ../../../../assets/search/delete.png */ "./src/assets/search/delete.png");

var _delete2 = _interopRequireDefault(_delete);

var _up = __webpack_require__(/*! ../../../../assets/search/up.png */ "./src/assets/search/up.png");

var _up2 = _interopRequireDefault(_up);

var _down = __webpack_require__(/*! ../../../../assets/search/down.png */ "./src/assets/search/down.png");

var _down2 = _interopRequireDefault(_down);

var _utils = __webpack_require__(/*! ../../../../utils/utils */ "./src/utils/utils.ts");

var _index2 = __webpack_require__(/*! ../components/index */ "./src/pages/home/search/components/index.tsx");

__webpack_require__(/*! ./index.scss */ "./src/pages/home/search/Search/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Taro = require('@tarojs/taro-rn');

var indexStyleSheet = require('./index_styles').default;

var _styleSheet = indexStyleSheet;
var historyArr = [{
  text: '感冒清热',
  hot: false
}, {
  text: '维生素E乳',
  hot: false
}, {
  text: '葡萄籽',
  hot: false
}, {
  text: '精华'
}, {
  text: '化学药制剂'
}, {
  text: '美林布洛芬悬浮液',
  hot: true
}];
var listData = [{
  text: '感冒维生素E乳'
}, {
  text: '感冒清热'
}, {
  text: '浮液感冒清热'
}, {
  text: '感冒化学药制剂'
}, {
  text: '感冒清热'
}];

var Search = (_dec = (0, _taroReduxRn.connect)(function (_ref) {
  var hello = _ref.hello,
      other = _objectWithoutProperties(_ref, ['hello']);

  return _extends({}, hello, other);
}), _dec(_class = function (_Component) {
  _inherits(Search, _Component);

  function Search(props) {
    _classCallCheck(this, Search);

    var _this = _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this, props));

    _this.onClear = function () {
      Taro.showToast({
        title: '清除'
      });
      _this.setState({
        searchVal: ''
      });
    };

    _this.onSpeechClick = function () {
      Taro.showToast({
        title: 'speech'
      });
    };

    _this.onInput = function (e) {
      var value = e.target.value;

      _this.setState({
        searchVal: value
      });
    };

    _this.doSearch = function () {
      Taro.showToast({
        title: '搜索'
      });
    };

    _this.onHotClick = function (data) {
      Taro.showToast({
        title: JSON.stringify(data)
      });
    };

    _this.jointParam = function (param) {
      var keys = Object.keys(param);
      return keys.reduce(function (total, key) {
        return total + '&' + key + '=' + param[key];
      }, '');
    };

    _this.onHistoryClick = function (data) {
      /* Taro.showToast({ 
          title: JSON.stringify(data)
      }); */var url = _this.jointParam(data);
      Taro.navigateTo({
        url: '/pages/home/search/components/SearchGoodsList/index?' + url
      });
    };

    _this.onDelete = function () {
      Taro.showToast({
        title: '删除搜索历史'
      });
    };

    _this.onSearchShop = function () {
      Taro.showToast({
        title: '店铺搜索'
      });
    };

    _this.onDropClick = function (data) {
      Taro.showToast({
        title: JSON.stringify(data)
      });
    };

    _this.showMore = function () {
      var isOpen = _this.state.isOpen;

      _this.setState({
        isOpen: !isOpen
      });
    };

    _this.renderSearch = function () {
      var searchVal = _this.state.searchVal;

      return _react2.default.createElement(
        _componentsRn.View,
        { style: _styleSheet["search-list-header"] },
        _react2.default.createElement(
          _componentsRn.View,
          { style: _styleSheet["search-list-header-back"] },
          _react2.default.createElement(_componentsRn.Image, { src: _arrowLeft2.default, style: _styleSheet["search-list-header-back-icon"] })
        ),
        _react2.default.createElement(_index.SearchBar, { onClear: _this.onClear, onSpeechClick: _this.onSpeechClick, onInput: _this.onInput, value: searchVal }),
        _react2.default.createElement(
          _componentsRn.View,
          { onClick: _this.doSearch, style: _styleSheet["search-list-header-btn"] },
          _react2.default.createElement(
            _componentsRn.Text,
            { style: _styleSheet["search-list-header-btn-text"] },
            '\u641C\u7D22'
          )
        )
      );
    };

    _this.renderHstHeader = function () {
      return _react2.default.createElement(
        _componentsRn.View,
        { style: _styleSheet["search-history-header"] },
        _react2.default.createElement(
          _componentsRn.Text,
          { style: _styleSheet["search-history-header-text"] },
          '\u641C\u7D22\u5386\u53F2'
        ),
        _react2.default.createElement(
          _componentsRn.View,
          { onClick: _this.onDelete },
          _react2.default.createElement(_componentsRn.Image, { src: _delete2.default, style: _styleSheet["search-history-header-img"] })
        )
      );
    };

    _this.renderHistory = function () {
      var idArr = (0, _utils.addId)(historyArr);
      return _react2.default.createElement(
        _componentsRn.View,
        { style: _styleSheet["search-history"] },
        idArr.map(function (item) {
          var text = item.text,
              id = item.id;

          return _react2.default.createElement(_index2.SearchItem, { text: text, key: id, data: item, onClick: _this.onHistoryClick });
        })
      );
    };

    _this.renderHisTail = function () {
      var isOpen = _this.state.isOpen;

      return _react2.default.createElement(
        _componentsRn.View,
        { onClick: _this.showMore, style: _styleSheet["search-history-tail"] },
        _react2.default.createElement(
          _componentsRn.Text,
          { style: _styleSheet["search-history-tail-text"] },
          '\u66F4\u591A\u641C\u7D22\u5386\u53F2'
        ),
        _react2.default.createElement(_componentsRn.Image, { src: isOpen ? _up2.default : _down2.default, style: _styleSheet["search-history-tail-img"] })
      );
    };

    _this.hasSearchVal = function () {
      var searchVal = _this.state.searchVal;

      return searchVal !== undefined && searchVal !== '';
    };

    _this.renderEmptySearch = function () {
      return _react2.default.createElement(
        _componentsRn.View,
        null,
        _this.renderHstHeader(),
        _this.renderHistory(),
        _this.renderHisTail(),
        _react2.default.createElement(_index2.Hot, { data: historyArr, onClick: _this.onHotClick })
      );
    };

    _this.renderSearchList = function () {
      var _this$state = _this.state,
          searchList = _this$state.searchList,
          searchVal = _this$state.searchVal;

      var idArr = (0, _utils.addId)(searchList);
      if (!searchVal) return null;
      return _react2.default.createElement(
        _componentsRn.View,
        { style: _styleSheet["search-list-body"] },
        _react2.default.createElement(_index2.ShopItem, { searchVal: searchVal, onClick: _this.onSearchShop }),
        idArr.map(function (item) {
          var id = item.id;

          return _react2.default.createElement(_index2.SearchListItem, { key: id, data: item, searchVal: searchVal, onClick: _this.onDropClick });
        })
      );
    };

    _this.state = {
      searchVal: '',
      isOpen: false,
      searchList: listData
    };
    return _this;
  } /**
     * 清除搜索数据
     * @memberof Search
     */

  /**
   * 语音按钮点击事件
   * @memberof Search
   */
  /**
   * 点击热门中的标签触发
   */
  /**
   *  点击搜索历史触发
   */
  /**
   * 删除搜索历史
   */


  _createClass(Search, [{
    key: 'render',
    /**
     * 先获取到jsx元素再返回,如果直接返回会报错
     * @returns
     */ /* renderContent = () => {
            const { searchVal } = this.state;
            const SearchList = this.renderSearchList();
            const EmptySearch = this.renderEmptySearch();
            return searchVal && SearchList || EmptySearch;
        } */

    value: function render() {
      var searchVal = this.state.searchVal;

      return _react2.default.createElement(
        _componentsRn.View,
        { style: _styleSheet["search-list"] },
        this.renderSearch(),
        !searchVal && this.renderEmptySearch(),
        this.renderSearchList()
      );
    }
  }]);

  return Search;
}(_taroRn.Component)) || _class);
exports.default = Search;

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

/***/ "classnames":
/*!*****************************!*\
  !*** external "classnames" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("classnames");

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