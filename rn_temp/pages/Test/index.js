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
/******/ 		"pages/Test/index": 0
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
/******/ 	deferredModules.push(["./src/pages/Test/index.tsx","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/assets/images/badge.png":
/*!*************************************!*\
  !*** ./src/assets/images/badge.png ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "./src/assets/images/upload.png":
/*!**************************************!*\
  !*** ./src/assets/images/upload.png ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "./src/pages/Test/index.scss":
/*!***********************************!*\
  !*** ./src/pages/Test/index.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/pages/Test/index.tsx":
/*!**********************************!*\
  !*** ./src/pages/Test/index.tsx ***!
  \**********************************/
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

var _taroReduxRn = __webpack_require__(/*! @tarojs/taro-redux-rn */ "@tarojs/taro-redux-rn");

var _componentsRn = __webpack_require__(/*! @tarojs/components-rn */ "@tarojs/components-rn");

var _index = __webpack_require__(/*! ../../components/index */ "./src/components/index.tsx");

var _utils = __webpack_require__(/*! ../../utils/utils */ "./src/utils/utils.ts");

var _badge = __webpack_require__(/*! ../../assets/images/badge.png */ "./src/assets/images/badge.png");

var _badge2 = _interopRequireDefault(_badge);

var _upload = __webpack_require__(/*! ../../assets/images/upload.png */ "./src/assets/images/upload.png");

var _upload2 = _interopRequireDefault(_upload);

__webpack_require__(/*! ./index.scss */ "./src/pages/Test/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Taro = require('@tarojs/taro-rn');

// import SwipperExample from '../SwipperExample';

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
var scrollTop = 0;
var Threshold = 20;

var Test = (_dec = (0, _taroReduxRn.connect)(function (_ref) {
  var hello = _ref.hello,
      other = _objectWithoutProperties(_ref, ['hello']);

  return _extends({}, hello, other);
}), _dec(_class = (_temp = _class2 = function (_Component) {
  _inherits(Test, _Component);

  /**
  * 指定config的类型声明为: Taro.Config
  *
  * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
  * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
  * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
  */function Test(props) {
    var _this2 = this;

    _classCallCheck(this, Test);

    var _this = _possibleConstructorReturn(this, (Test.__proto__ || Object.getPrototypeOf(Test)).call(this, props));

    _this.onScrollToUpper = function () {
      console.log("滚动到顶部");
    };

    _this.onScrollLower = function () {
      console.log("滚动到底部");
    };

    _this.onOpenModal = function () {
      _this.setState({
        visible: true
      });
    };

    _this.onPopupClose = function () {
      _this.setState({
        show: false
      });
    };

    _this.onClose = function () {
      _this.setState({
        visible: false
      });
    };

    _this.onConfirm = function () {
      _this.onClose();
    };

    _this.renderFooter = function () {
      return _react2.default.createElement(
        _componentsRn.View,
        { style: _styleSheet["test-footer"] },
        _react2.default.createElement(
          _componentsRn.Button,
          { onClick: _this.onClose, style: _styleSheet["test-com-btn"] },
          '\u53D6\u6D88'
        ),
        _react2.default.createElement(
          _componentsRn.Button,
          { onClick: _this.onConfirm, style: _styleSheet["test-com-btn"] },
          '\u786E\u5B9A'
        )
      );
    };

    _this.onOpenActionSheet = function () {
      _this.setState({
        show: true
      });
    };

    _this.onCheckboxChange = function (_ref2) {
      var value = _ref2.detail.value;

      _this.setState({
        checkedVal: value
      });
    };

    _this.onDrawerClick = function () {
      _this.setState({
        drawerShow: true
      });
    };

    _this.renderDrawer = function () {
      var drawerShow = _this.state.drawerShow;

      return _react2.default.createElement(
        _index.Drawer,
        { show: drawerShow, renderSidebar: _this.renderSideBar() },
        _react2.default.createElement(
          _componentsRn.Button,
          { type: 'primary', onClick: _this.onDrawerClick },
          '\u62BD\u5C49\u6D4B\u8BD5'
        )
      );
    };

    _this.onCloseDrawer = function () {
      _this.setState({
        drawerShow: false
      });
    };

    _this.renderSideBar = function () {
      return _react2.default.createElement(
        _componentsRn.View,
        { style: _styleSheet["test-drawer"] },
        _react2.default.createElement(
          _componentsRn.Button,
          { type: 'primary', onClick: _this.onCloseDrawer },
          '\u5173\u95ED\u62BD\u5C49\u7EC4\u4EF6'
        )
      );
    };

    _this.renderSwipperItem = function () {
      var data = [{
        backgroundColor: 'red',
        url: 'https://imgcps.jd.com/ling4/4635736/5Lqs6YCJ5aW96LSn/5L2g5YC85b6X5oul5pyJ/p-5c17126882acdd181dd53ce0/95c21515/cr_1125x549_0_72/s1125x690/q70.jpg'
      }, {
        backgroundColor: 'green',
        url: 'https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/30451/34/12138/108202/5cb7720aE6ebf11ec/9945f5b3b9f9547f.jpg!cr_1125x549_0_72!q70.jpg.dpg'
      }, {
        backgroundColor: 'blue',
        url: 'https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/54392/1/2538/95587/5d064ea3E74ca0763/dc1d10fbd105d8a0.jpg!cr_1125x549_0_72!q70.jpg.dpg'
      }];
      return data.map(function (item) {
        var backgroundColor = item.backgroundColor,
            url = item.url;

        return _react2.default.createElement(
          _componentsRn.SwiperItem,
          { style: [_styleSheet["swipper-item"], {
              backgroundColor: backgroundColor
            }], key: (0, _utils.UUID)() },
          _react2.default.createElement(_componentsRn.Image, { src: url })
        );
      });
    };

    _this.renderRnSwipperItem = function () {
      var data = [{
        backgroundColor: 'red',
        url: 'https://imgcps.jd.com/ling4/4635736/5Lqs6YCJ5aW96LSn/5L2g5YC85b6X5oul5pyJ/p-5c17126882acdd181dd53ce0/95c21515/cr_1125x549_0_72/s1125x690/q70.jpg'
      }, {
        backgroundColor: 'green',
        url: 'https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/30451/34/12138/108202/5cb7720aE6ebf11ec/9945f5b3b9f9547f.jpg!cr_1125x549_0_72!q70.jpg.dpg'
      }, {
        backgroundColor: 'blue',
        url: 'https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/54392/1/2538/95587/5d064ea3E74ca0763/dc1d10fbd105d8a0.jpg!cr_1125x549_0_72!q70.jpg.dpg'
      }];
      return data.map(function (item) {
        var backgroundColor = item.backgroundColor,
            url = item.url;

        return _react2.default.createElement(
          _componentsRn.View,
          { style: [_styleSheet["swipper-item"], {
              backgroundColor: backgroundColor
            }], key: (0, _utils.UUID)() },
          _react2.default.createElement(_componentsRn.Image, { src: url })
        );
      });
    };

    _this.renderBadge = function () {
      var customBadge = _react2.default.createElement(
        _componentsRn.View,
        null,
        _react2.default.createElement(_componentsRn.Image, { src: _badge2.default, style: _styleSheet["custom-badge"] })
      );
      return _react2.default.createElement(
        _index.Badge,
        { value: 1000, 'badge-cls': 'badge-cls', rnStyle: {
            marginTop: 30
          } // eslint-disable-next-line taro/render-props
          , renderBadge: customBadge, custom: true },
        _react2.default.createElement(
          _componentsRn.Button,
          { type: 'primary' },
          '\u89D2\u6807\u6309\u94AE'
        )
      );
    };

    _this.onChooseImg = function () {
      Taro.chooseImage({
        count: 2,
        // 默认9
        sizeType: ['original', 'compressed'],
        // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'],
        // 可以指定来源是相册还是相机，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
        success: function success(res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths;

          if (Array.isArray(tempFilePaths) && tempFilePaths.length) {
            tempFilePaths.forEach(function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(item) {
                var file, uploadRes;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        file = {
                          uid: '-1',
                          status: 'done',
                          url: item
                        }; // const { success, data } = await this.uploadFile(file);

                        _context.next = 3;
                        return (0, _utils.upload)({
                          url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
                          file: file
                        });

                      case 3:
                        uploadRes = _context.sent;
                        /* const { fileList } = this.state;
                        if(success) {
                            this.setState({ fileList: fileList.concat})
                        } */
                        console.log("uploadRes", uploadRes);

                      case 5:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, _this2);
              }));

              return function (_x) {
                return _ref3.apply(this, arguments);
              };
            }());
          }
        }
      });
    };

    _this.uploadFile = function (file) {
      return new Promise(function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(resolve) {
          var isWeapp, res;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  isWeapp = Taro.getEnv() === 'WEAPP';

                  if (!isWeapp) {
                    _context2.next = 7;
                    break;
                  }

                  _context2.next = 4;
                  return _this.excludeRnUpload(file);

                case 4:
                  _context2.t0 = _context2.sent;
                  _context2.next = 10;
                  break;

                case 7:
                  _context2.next = 9;
                  return _this.rnUpload(file);

                case 9:
                  _context2.t0 = _context2.sent;

                case 10:
                  res = _context2.t0;

                  resolve(res);

                case 12:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this2);
        }));

        return function (_x2) {
          return _ref4.apply(this, arguments);
        };
      }());
    };

    _this.excludeRnUpload = function (file) {
      return new Promise(function (resolve) {
        Taro.uploadFile({
          url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
          filePath: file.url,
          name: 'file',
          formData: {},
          success: function success(res) {
            resolve({
              data: res,
              success: true
            });
          },
          fail: function fail(res) {
            resolve({
              error: res,
              success: false
            });
          }
        });
      });
    };

    _this.rnUpload = function (file) {
      var formData = new FormData();
      formData.append("file", file);
      return new Promise(function (resolve) {
        fetch('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data;charset=utf-8'
          },
          body: formData
        }).then(function (response) {
          return response.json();
        }).then(function (res) {
          resolve({
            data: res,
            success: true
          });
        }).catch(function (res) {
          resolve({
            error: res,
            success: false
          });
        });
      });
    };

    _this.renderUpload = function () {
      return _react2.default.createElement(
        _componentsRn.View,
        { onClick: _this.onChooseImg, style: _styleSheet["test-upload-container"] },
        _react2.default.createElement(_componentsRn.Image, { src: _upload2.default, style: _styleSheet["test-upload-img"] })
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

    _this.state = {
      visible: false,
      show: false,
      list: [{
        value: '美国',
        text: '美国',
        checked: false
      }, {
        value: '中国',
        text: '中国',
        checked: true
      }, {
        value: '巴西',
        text: '巴西',
        checked: false
      }, {
        value: '日本',
        text: '日本',
        checked: false
      }, {
        value: '英国',
        text: '英国',
        checked: false
      }, {
        value: '法国',
        text: '法国',
        checked: false
      }],
      checkedVal: [],
      // fileList: [],
      drawerShow: false // 抽屉是否展示

    };
    return _this;
  }

  _createClass(Test, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'onScroll',
    value: function onScroll(e) {
      console.log(e.detail);
    } /**
       * 复选框onChange事件
       */
    /**
     * rnStyle为设置rn端组件样式，rn端样式是以标准屏为标准, Taro本身是以2倍屏为标准
     * 所以在class中设置为10px rnStyle中设置为5
     * @returns
     */

  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          visible = _state.visible,
          show = _state.show,
          _state$checkedVal = _state.checkedVal,
          checkedVal = _state$checkedVal === undefined ? [] : _state$checkedVal;

      var isRn = Taro.getEnv().toLowerCase() === 'rn';
      return _react2.default.createElement(
        _componentsRn.View,
        { style: _styleSheet["test"] },
        _react2.default.createElement(
          _componentsRn.Button,
          { type: 'primary', onClick: this.onOpenModal },
          '\u5F39\u6846\u6D4B\u8BD5'
        ),
        _react2.default.createElement(
          _componentsRn.Button,
          { type: 'primary', onClick: this.onOpenActionSheet, style: _styleSheet["test-actionsheet"] },
          'popup \u5F39\u6846\u6D4B\u8BD5'
        ),
        !isRn && _react2.default.createElement(
          _componentsRn.Button,
          { type: 'primary', onClick: this.onDrawerClick },
          '\u62BD\u5C49\u6D4B\u8BD5'
        ),
        this.renderDrawer(),
        this.renderBadge(),
        this.renderUpload(),
        _react2.default.createElement(_index.Modal, { visible: visible, title: '\u5F39\u6846' // eslint-disable-next-line taro/render-props
          , renderFooter: this.renderFooter(), renderHeader: _react2.default.createElement(
            _componentsRn.View,
            null,
            _react2.default.createElement(
              _componentsRn.Text,
              null,
              '\u6807\u9898'
            )
          ) // footer={footer}
          , onCancel: this.onClose, onConfirm: this.onConfirm, renderContent: _react2.default.createElement(
            _componentsRn.View,
            null,
            _react2.default.createElement(
              _componentsRn.Text,
              null,
              'content'
            )
          ), confirmText: '\u786E\u5B9A', cancelText: '\u53D6\u6D88', customFooter: true, customHeader: true, style: _styleSheet["test-modal"] }),
        _react2.default.createElement(
          _componentsRn.Swiper,
          { indicatorColor: '#999', indicatorActiveColor: '#333', circular: true, indicatorDots: true, interval: 2000, autoplay: true // onChange={(event) => { console.log('Swiper: onChange', event.detail.current) }}
            , style: _styleSheet["swipper-container"] },
          this.renderSwipperItem()
        ),
        _react2.default.createElement(
          _componentsRn.View,
          { style: _styleSheet["page-section-1"] },
          _react2.default.createElement(
            _componentsRn.Text,
            null,
            '\u9ED8\u8BA4\u6837\u5F0F'
          ),
          _react2.default.createElement(
            _componentsRn.CheckboxGroup,
            { style: {
                flexDirection: 'row',
                alignItems: 'center'
              }, onChange: this.onCheckboxChange },
            _react2.default.createElement(
              _componentsRn.Label,
              { style: {
                  flexDirection: 'row',
                  alignItems: 'center'
                } },
              _react2.default.createElement(_componentsRn.Checkbox, { value: '1', checked: checkedVal.includes("1") }),
              _react2.default.createElement(
                _componentsRn.Text,
                null,
                '\u9009\u4E2D'
              )
            ),
            _react2.default.createElement(
              _componentsRn.Label,
              { style: {
                  flexDirection: 'row',
                  alignItems: 'center'
                } },
              _react2.default.createElement(_componentsRn.Checkbox, { value: '2', checked: checkedVal.includes("2") }),
              _react2.default.createElement(
                _componentsRn.Text,
                null,
                '\u672A\u9009\u4E2D'
              )
            )
          )
        ),
        _react2.default.createElement(
          _componentsRn.ScrollView,
          { scrollY: true, scrollWithAnimation: true, scrollTop: scrollTop, lowerThreshold: Threshold, upperThreshold: -20, onScrollToUpper: this.onScrollToUpper // 使用箭头函数的时候 可以这样写 `onScrollToUpper={this.onScrollToUpper}`
            , onScrollToLower: this.onScrollLower, onScroll: this.onScroll, style: _styleSheet["scrollview"] },
          _react2.default.createElement(
            _componentsRn.View,
            { style: _styleSheet["vStyleA"] },
            _react2.default.createElement(
              _componentsRn.Text,
              null,
              'A'
            )
          ),
          _react2.default.createElement(
            _componentsRn.View,
            { style: _styleSheet["vStyleB"] },
            _react2.default.createElement(
              _componentsRn.Text,
              null,
              'B'
            )
          ),
          _react2.default.createElement(
            _componentsRn.View,
            { style: _styleSheet["vStyleC"] },
            _react2.default.createElement(
              _componentsRn.Text,
              null,
              'C'
            )
          )
        ),
        _react2.default.createElement(
          _index.PopUp,
          { visible: show, onClose: this.onPopupClose, 'pop-class': 'pop-up-rn' // style={{ borderRadius: '4px'}}
            // container-cls='container-cls'
            // header-cls='header-cls'
            , title: '\u9009\u62E9\u65E5\u671F' },
          _react2.default.createElement(
            _componentsRn.View,
            null,
            _react2.default.createElement(
              _componentsRn.View,
              null,
              _react2.default.createElement(
                _componentsRn.View,
                { style: _styleSheet["page-section-1"] },
                _react2.default.createElement(
                  _componentsRn.Text,
                  null,
                  '\u9ED8\u8BA4\u6837\u5F0F'
                ),
                _react2.default.createElement(
                  _componentsRn.Label,
                  { style: {
                      flexDirection: 'row',
                      alignItems: 'center'
                    } },
                  _react2.default.createElement(_componentsRn.Checkbox, { value: '\u9009\u4E2D', checked: true }),
                  _react2.default.createElement(
                    _componentsRn.Text,
                    null,
                    '\u9009\u4E2D'
                  )
                ),
                _react2.default.createElement(
                  _componentsRn.Label,
                  { style: {
                      flexDirection: 'row',
                      alignItems: 'center'
                    } },
                  _react2.default.createElement(_componentsRn.Checkbox, { style: 'margin-left: 20px', value: '\u672A\u9009\u4E2D' }),
                  _react2.default.createElement(
                    _componentsRn.Text,
                    null,
                    '\u672A\u9009\u4E2D'
                  )
                )
              ),
              _react2.default.createElement(
                _componentsRn.View,
                { style: _styleSheet["page-section-2"] },
                _react2.default.createElement(
                  _componentsRn.Text,
                  null,
                  '\u63A8\u8350\u5C55\u793A\u6837\u5F0F'
                ),
                this.state.list.map(function (item, i) {
                  return _react2.default.createElement(
                    _componentsRn.Label,
                    { 'for': i, key: (0, _utils.UUID)(), style: [_styleSheet["checkbox-list__label"], {
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                      }] },
                    _react2.default.createElement(_componentsRn.Checkbox, { value: item.value, checked: item.checked, style: _styleSheet["checkbox-list__checkbox"] }),
                    _react2.default.createElement(
                      _componentsRn.View,
                      { style: _styleSheet["check-item-text"] },
                      _react2.default.createElement(
                        _componentsRn.Text,
                        null,
                        item.text
                      )
                    )
                  );
                })
              )
            ),
            _react2.default.createElement(
              _componentsRn.View,
              { style: _styleSheet["vStyleA"] },
              _react2.default.createElement(
                _componentsRn.Text,
                null,
                'A'
              )
            ),
            _react2.default.createElement(
              _componentsRn.View,
              { style: _styleSheet["vStyleB"] },
              _react2.default.createElement(
                _componentsRn.Text,
                null,
                'B'
              )
            ),
            _react2.default.createElement(
              _componentsRn.View,
              { style: _styleSheet["vStyleC"] },
              _react2.default.createElement(
                _componentsRn.Text,
                null,
                'C'
              )
            )
          )
        )
      );
    }
  }]);

  return Test;
}(_taroRn.Component), _class2.config = {
  navigationBarTitleText: '测试页'
}, _class2.options = {
  addGlobalClass: true
}, _temp)) || _class); // #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion


exports.default = Test;

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