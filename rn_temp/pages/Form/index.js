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
/******/ 		"pages/Form/index": 0
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
/******/ 	deferredModules.push(["./src/pages/Form/index.tsx","common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/DatePicker/index.rn.tsx":
/*!************************************************!*\
  !*** ./src/components/DatePicker/index.rn.tsx ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _datePicker = __webpack_require__(/*! @ant-design/react-native/lib/date-picker */ "@ant-design/react-native/lib/date-picker");

var _datePicker2 = _interopRequireDefault(_datePicker);

var _list = __webpack_require__(/*! @ant-design/react-native/lib/list */ "@ant-design/react-native/lib/list");

var _list2 = _interopRequireDefault(_list);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _taroRn = __webpack_require__(/*! @tarojs/taro-rn */ "@tarojs/taro-rn");

__webpack_require__(/*! ./index.scss */ "./src/components/DatePicker/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var indexStyleSheet = require('./index_styles').default;

var _styleSheet = indexStyleSheet;

var YaoDatePicker = (_temp = _class = function (_Component) {
  _inherits(YaoDatePicker, _Component);

  function YaoDatePicker(props) {
    _classCallCheck(this, YaoDatePicker);

    var _this = _possibleConstructorReturn(this, (YaoDatePicker.__proto__ || Object.getPrototypeOf(YaoDatePicker)).call(this, props));

    _this.onChange = function (value) {
      _this.setState({
        value: value
      });

      if (_this.props.onChange) {
        clearTimeout(_this.timer);
        _this.timer = setTimeout(function () {
          _this.props.onChange(value);
        }, 300);
      }
    };

    _this.timer = null;
    _this.state = {
      value: undefined
    };
    return _this;
  }

  _createClass(YaoDatePicker, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        _datePicker2.default,
        { value: new Date(this.state.value), mode: "date", defaultDate: new Date(), minDate: new Date(2015, 7, 6), maxDate: new Date(2026, 11, 3), onChange: this.onChange, format: "YYYY-MM-DD" },
        _react2.default.createElement(
          _list2.default.Item,
          null,
          this.props.title
        )
      );
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      return {
        value: props.value || undefined
      };
    }
  }]);

  return YaoDatePicker;
}(_taroRn.Component), _class.defaultProps = {
  title: "日期",
  placeholder: "请输入",
  onChange: function onChange() {
    console.log("");
  }
}, _temp);
exports.default = YaoDatePicker;

/***/ }),

/***/ "./src/components/DatePicker/index.scss":
/*!**********************************************!*\
  !*** ./src/components/DatePicker/index.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/components/InputText/index.rn.tsx":
/*!***********************************************!*\
  !*** ./src/components/InputText/index.rn.tsx ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inputItem = __webpack_require__(/*! @ant-design/react-native/lib/input-item */ "@ant-design/react-native/lib/input-item");

var _inputItem2 = _interopRequireDefault(_inputItem);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _taroRn = __webpack_require__(/*! @tarojs/taro-rn */ "@tarojs/taro-rn");

__webpack_require__(/*! ./index.scss */ "./src/components/InputText/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var indexStyleSheet = require('./index_styles').default;

var _styleSheet = indexStyleSheet;

var InputText = (_temp = _class = function (_Component) {
  _inherits(InputText, _Component);

  function InputText(props) {
    _classCallCheck(this, InputText);

    var _this = _possibleConstructorReturn(this, (InputText.__proto__ || Object.getPrototypeOf(InputText)).call(this, props));

    _this.timer = null;

    _this.onChange = function (value) {
      _this.setState({
        value: value
      }, function () {
        if (_this.props.onChange) {
          clearTimeout(_this.timer);
          _this.timer = setTimeout(function () {
            _this.props.onChange(value);
          }, 300);
        }
      });
    };

    _this.state = {
      value: ""
    };
    return _this;
  }

  _createClass(InputText, [{
    key: "render",
    value: function render() {
      var value = this.state.value;

      return _react2.default.createElement(
        _inputItem2.default,
        { type: this.props.type, defaultValue: value, onChange: this.onChange, placeholder: this.props.placeholder },
        this.props.title
      );
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      return {
        value: props.value || ""
      };
    }
  }]);

  return InputText;
}(_taroRn.Component), _class.defaultProps = {
  value: "",
  title: "单行文本",
  type: "text",
  placeholder: "请输入",
  onChange: function onChange() {}
}, _temp);
exports.default = InputText;

/***/ }),

/***/ "./src/components/InputText/index.scss":
/*!*********************************************!*\
  !*** ./src/components/InputText/index.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/components/PickerItem/index.rn.tsx":
/*!************************************************!*\
  !*** ./src/components/PickerItem/index.rn.tsx ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _picker = __webpack_require__(/*! @ant-design/react-native/lib/picker */ "@ant-design/react-native/lib/picker");

var _picker2 = _interopRequireDefault(_picker);

var _list = __webpack_require__(/*! @ant-design/react-native/lib/list */ "@ant-design/react-native/lib/list");

var _list2 = _interopRequireDefault(_list);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _taroRn = __webpack_require__(/*! @tarojs/taro-rn */ "@tarojs/taro-rn");

__webpack_require__(/*! ./index.scss */ "./src/components/PickerItem/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var indexStyleSheet = require('./index_styles').default;

var _styleSheet = indexStyleSheet;

var PickerItem = (_temp = _class = function (_Component) {
  _inherits(PickerItem, _Component);

  function PickerItem(props) {
    _classCallCheck(this, PickerItem);

    var _this = _possibleConstructorReturn(this, (PickerItem.__proto__ || Object.getPrototypeOf(PickerItem)).call(this, props));

    _this.onChange = function (value) {
      _this.setState({
        value: value
      });

      if (_this.props.onChange) {
        _this.props.onChange(value[0]);
      }
    };

    _this.state = {
      value: [0]
    };
    return _this;
  }

  _createClass(PickerItem, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        _picker2.default,
        { data: this.props.dataSource, cols: 1, value: this.state.value, onChange: this.onChange },
        _react2.default.createElement(
          _list2.default.Item,
          { onPress: this.onPress },
          this.props.title
        )
      );
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      return {
        value: [props.value] || false
      };
    }
  }]);

  return PickerItem;
}(_taroRn.Component), _class.defaultProps = {
  title: "标题",
  placeholder: "请输入",
  dataSource: [{
    label: "美国",
    value: 0
  }],
  onChange: function onChange() {
    console.log("");
  }
}, _temp);
exports.default = PickerItem;

/***/ }),

/***/ "./src/components/PickerItem/index.scss":
/*!**********************************************!*\
  !*** ./src/components/PickerItem/index.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/components/Referto/index.rn.tsx":
/*!*********************************************!*\
  !*** ./src/components/Referto/index.rn.tsx ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _list = __webpack_require__(/*! @ant-design/react-native/lib/list */ "@ant-design/react-native/lib/list");

var _list2 = _interopRequireDefault(_list);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _taroRn = __webpack_require__(/*! @tarojs/taro-rn */ "@tarojs/taro-rn");

__webpack_require__(/*! ./index.scss */ "./src/components/Referto/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var indexStyleSheet = require('./index_styles').default;

var _styleSheet = indexStyleSheet;
var Item = _list2.default.Item;

var Referto = (_temp = _class = function (_Component) {
  _inherits(Referto, _Component);

  function Referto(props) {
    _classCallCheck(this, Referto);

    var _this = _possibleConstructorReturn(this, (Referto.__proto__ || Object.getPrototypeOf(Referto)).call(this, props));

    _this.onClick = function () {
      _this.props.onClick();
    };

    _this.state = {
      value: ""
    };
    return _this;
  }

  _createClass(Referto, [{
    key: "render",
    value: function render() {
      var value = this.state.value;

      return _react2.default.createElement(
        Item,
        { extra: value, onPress: this.onClick },
        this.props.title
      );
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      return {
        value: props.value || ""
      };
    }
  }]);

  return Referto;
}(_taroRn.Component), _class.defaultProps = {
  title: "参照",
  onClick: function onClick() {}
}, _temp);
exports.default = Referto;

/***/ }),

/***/ "./src/components/Referto/index.scss":
/*!*******************************************!*\
  !*** ./src/components/Referto/index.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/components/Switch/index.rn.tsx":
/*!********************************************!*\
  !*** ./src/components/Switch/index.rn.tsx ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _list = __webpack_require__(/*! @ant-design/react-native/lib/list */ "@ant-design/react-native/lib/list");

var _list2 = _interopRequireDefault(_list);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _taroRn = __webpack_require__(/*! @tarojs/taro-rn */ "@tarojs/taro-rn");

var _componentsRn = __webpack_require__(/*! @tarojs/components-rn */ "@tarojs/components-rn");

__webpack_require__(/*! ./index.scss */ "./src/components/Switch/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var indexStyleSheet = require('./index_styles').default;

var _styleSheet = indexStyleSheet;
var Item = _list2.default.Item;

var JDSwitch = (_temp = _class = function (_Component) {
  _inherits(JDSwitch, _Component);

  function JDSwitch(props) {
    _classCallCheck(this, JDSwitch);

    var _this = _possibleConstructorReturn(this, (JDSwitch.__proto__ || Object.getPrototypeOf(JDSwitch)).call(this, props));

    _this.onChange = function (obj) {
      _this.setState({
        value: obj.detail.value
      }, function () {
        _this.props.onChange(obj.detail.value);
      });
    };

    _this.state = {
      value: false
    };
    return _this;
  }

  _createClass(JDSwitch, [{
    key: "render",
    value: function render() {
      var value = this.state.value;

      var comp = _react2.default.createElement(_componentsRn.Switch, { checked: value, onChange: this.onChange, color: "#F2140C" });
      return _react2.default.createElement(
        Item,
        { extra: comp },
        this.props.title
      );
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      return {
        value: props.value || false
      };
    }
  }]);

  return JDSwitch;
}(_taroRn.Component), _class.defaultProps = {
  title: "开关",
  onClick: function onClick() {}
}, _temp);
exports.default = JDSwitch;

/***/ }),

/***/ "./src/components/Switch/index.scss":
/*!******************************************!*\
  !*** ./src/components/Switch/index.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/components/Textarea/index.rn.tsx":
/*!**********************************************!*\
  !*** ./src/components/Textarea/index.rn.tsx ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _textareaItem = __webpack_require__(/*! @ant-design/react-native/lib/textarea-item */ "@ant-design/react-native/lib/textarea-item");

var _textareaItem2 = _interopRequireDefault(_textareaItem);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _taroRn = __webpack_require__(/*! @tarojs/taro-rn */ "@tarojs/taro-rn");

var _componentsRn = __webpack_require__(/*! @tarojs/components-rn */ "@tarojs/components-rn");

__webpack_require__(/*! ./index.scss */ "./src/components/Textarea/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var indexStyleSheet = require('./index_styles').default;

var _styleSheet = indexStyleSheet;

var Textarea = (_temp = _class = function (_Component) {
  _inherits(Textarea, _Component);

  function Textarea(props) {
    _classCallCheck(this, Textarea);

    var _this = _possibleConstructorReturn(this, (Textarea.__proto__ || Object.getPrototypeOf(Textarea)).call(this, props));

    _this.timer = null;

    _this.onChange = function (value) {
      _this.setState({
        value: value
      }, function () {
        if (_this.props.onChange) {
          clearTimeout(_this.timer);
          _this.timer = setTimeout(function () {
            _this.props.onChange(value);
          }, 300);
        }
      });
    };

    _this.state = {
      value: ""
    };
    return _this;
  }

  _createClass(Textarea, [{
    key: "render",
    value: function render() {
      var value = this.state.value;

      return _react2.default.createElement(
        _componentsRn.View,
        null,
        _react2.default.createElement(
          _componentsRn.View,
          { style: {
              height: 40,
              justifyContent: "center"
            } },
          _react2.default.createElement(
            _componentsRn.Text,
            { style: {
                fontSize: 17,
                marginLeft: 15,
                color: "#333333"
              } },
            this.props.title
          )
        ),
        _react2.default.createElement(
          _componentsRn.View,
          { style: {
              marginHorizontal: 15,
              borderWidth: 1,
              borderColor: "#eeeeee"
            } },
          _react2.default.createElement(_textareaItem2.default, { rows: 4, count: 200, defaultValue: value, placeholder: "\u8BF7\u8F93\u5165...", onChange: this.onChange })
        )
      );
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      return {
        value: props.value || ""
      };
    }
  }]);

  return Textarea;
}(_taroRn.Component), _class.defaultProps = {
  title: "多行文本",
  placeholder: "请输入",
  onChange: function onChange() {}
}, _temp);
exports.default = Textarea;

/***/ }),

/***/ "./src/components/Textarea/index.scss":
/*!********************************************!*\
  !*** ./src/components/Textarea/index.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/pages/Form/index.scss":
/*!***********************************!*\
  !*** ./src/pages/Form/index.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/pages/Form/index.tsx":
/*!**********************************!*\
  !*** ./src/pages/Form/index.tsx ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = __webpack_require__(/*! react */ "react");

var _react2 = _interopRequireDefault(_react);

var _taroRn = __webpack_require__(/*! @tarojs/taro-rn */ "@tarojs/taro-rn");

var _componentsRn = __webpack_require__(/*! @tarojs/components-rn */ "@tarojs/components-rn");

var _index = __webpack_require__(/*! ../../components/InputText/index.rn */ "./src/components/InputText/index.rn.tsx");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../../components/Textarea/index.rn */ "./src/components/Textarea/index.rn.tsx");

var _index4 = _interopRequireDefault(_index3);

var _index5 = __webpack_require__(/*! ../../components/PickerItem/index.rn */ "./src/components/PickerItem/index.rn.tsx");

var _index6 = _interopRequireDefault(_index5);

var _index7 = __webpack_require__(/*! ../../components/DatePicker/index.rn */ "./src/components/DatePicker/index.rn.tsx");

var _index8 = _interopRequireDefault(_index7);

var _index9 = __webpack_require__(/*! ../../components/Referto/index.rn */ "./src/components/Referto/index.rn.tsx");

var _index10 = _interopRequireDefault(_index9);

var _index11 = __webpack_require__(/*! ../../components/Switch/index.rn */ "./src/components/Switch/index.rn.tsx");

var _index12 = _interopRequireDefault(_index11);

var _index13 = __webpack_require__(/*! ../../components/index */ "./src/components/index.tsx");

__webpack_require__(/*! ./index.scss */ "./src/pages/Form/index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Taro = require('@tarojs/taro-rn');

var indexStyleSheet = require('./index_styles').default;

var _styleSheet = indexStyleSheet;
var PagePicker = (_temp = _class = function (_Component) {
  _inherits(PagePicker, _Component);

  function PagePicker(props) {
    _classCallCheck(this, PagePicker);

    var _this = _possibleConstructorReturn(this, (PagePicker.__proto__ || Object.getPrototypeOf(PagePicker)).call(this, props));

    _this.state = {
      data: {
        input: "123",
        textarea: "456",
        picker: 1,
        date: "2019-05-09",
        refer: "参照-0",
        switch: false
      }
    };
    _this.alertEvent = _this.alertEvent.bind(_this);
    return _this;
  }

  _createClass(PagePicker, [{
    key: 'componentDidShow',
    value: function componentDidShow() {}
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      // 监听一个事件，接受参数
      Taro.eventCenter.on("changeRefer", function (val) {
        _this2.onChange("refer", val);
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      Taro.eventCenter.off("changeRefer");
    }
  }, {
    key: 'alertEvent',
    value: function alertEvent() {
      Taro.showToast({
        title: "点击",
        icon: "none",
        duration: 500
      }).then(function (res) {
        return console.log(res);
      });
    }
  }, {
    key: 'onChange',
    value: function onChange(key, value) {
      var data = this.state.data;

      var newDate = _extends({}, data);
      newDate[key] = value;
      this.setState({
        data: newDate
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var data = this.state.data;

      return _react2.default.createElement(
        _componentsRn.View,
        { style: _styleSheet["list"] },
        _react2.default.createElement(_index2.default, { error: true, value: data.input, onChange: function onChange(value) {
            _this3.onChange("input", value);
          } }),
        _react2.default.createElement(_index4.default, { value: data.textarea, onChange: function onChange(value) {
            _this3.onChange("textarea", value);
          } }),
        _react2.default.createElement(_index6.default, { value: data.picker, onChange: function onChange(value) {
            _this3.onChange("picker", value);
          }, dataSource: [{
            label: "美国",
            value: 0
          }, {
            label: "中国",
            value: 1
          }, {
            label: "巴西",
            value: 2
          }, {
            label: "日本",
            value: 3
          }] }),
        _react2.default.createElement(_index8.default, { value: data.date, onChange: function onChange(value) {
            _this3.onChange("date", value);
          } }),
        _react2.default.createElement(_index10.default, { value: data.refer, onClick: function onClick() {
            Taro.navigateTo({
              url: '/pages/ReferPage/index?id=' + data.refer
            });
          } }),
        _react2.default.createElement(_index12.default, { value: data.switch, onChange: function onChange(value) {
            _this3.onChange("switch", value);
          } }),
        _react2.default.createElement(
          _index13.Gradient,
          { style: {
              height: 40
            }, colors: ["#F2140C", "#F2270C", "#F24D0C"] },
          _react2.default.createElement(
            _componentsRn.View,
            { onClick: this.alertEvent, style: _styleSheet["btn"] },
            _react2.default.createElement(
              _componentsRn.Text,
              { style: {
                  color: "#ffffff"
                } },
              '\u6309\u94AE'
            )
          )
        ),
        _react2.default.createElement(
          _componentsRn.View,
          null,
          _react2.default.createElement(
            _componentsRn.Text,
            null,
            JSON.stringify(data, null, 2)
          )
        )
      );
    }
  }]);

  return PagePicker;
}(_taroRn.Component), _class.config = {
  navigationBarTitleText: "表单"
}, _temp);
exports.default = PagePicker;

/***/ }),

/***/ "@ant-design/react-native/lib/date-picker":
/*!***********************************************************!*\
  !*** external "@ant-design/react-native/lib/date-picker" ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@ant-design/react-native/lib/date-picker");

/***/ }),

/***/ "@ant-design/react-native/lib/drawer":
/*!******************************************************!*\
  !*** external "@ant-design/react-native/lib/drawer" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@ant-design/react-native/lib/drawer");

/***/ }),

/***/ "@ant-design/react-native/lib/input-item":
/*!**********************************************************!*\
  !*** external "@ant-design/react-native/lib/input-item" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@ant-design/react-native/lib/input-item");

/***/ }),

/***/ "@ant-design/react-native/lib/list":
/*!****************************************************!*\
  !*** external "@ant-design/react-native/lib/list" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@ant-design/react-native/lib/list");

/***/ }),

/***/ "@ant-design/react-native/lib/modal":
/*!*****************************************************!*\
  !*** external "@ant-design/react-native/lib/modal" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@ant-design/react-native/lib/modal");

/***/ }),

/***/ "@ant-design/react-native/lib/picker":
/*!******************************************************!*\
  !*** external "@ant-design/react-native/lib/picker" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@ant-design/react-native/lib/picker");

/***/ }),

/***/ "@ant-design/react-native/lib/textarea-item":
/*!*************************************************************!*\
  !*** external "@ant-design/react-native/lib/textarea-item" ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@ant-design/react-native/lib/textarea-item");

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

/***/ "expo-linear-gradient":
/*!***************************************!*\
  !*** external "expo-linear-gradient" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("expo-linear-gradient");

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