(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Electric Cloud Deploy Mobile App
	 */
	'use strict';

	var _interopRequireDefault = __webpack_require__(1)['default'];

	var _reactNative = __webpack_require__(7);

	var _reactNative2 = _interopRequireDefault(_reactNative);

	var _componentsSettingsComponent = __webpack_require__(2);

	var _componentsSettingsComponent2 = _interopRequireDefault(_componentsSettingsComponent);

	var _componentsJobsComponent = __webpack_require__(58);

	var _componentsJobsComponent2 = _interopRequireDefault(_componentsJobsComponent);

	var _componentsDashboardComponent = __webpack_require__(59);

	var _componentsDashboardComponent2 = _interopRequireDefault(_componentsDashboardComponent);

	var ECDeploy = _reactNative2['default'].createClass({
	  displayName: 'ECDeploy',

	  statics: {
	    title: 'Electric Deploy',
	    description: 'Electric Deploy mobile app'
	  },

	  getInitialState: function getInitialState() {
	    return {
	      activeTab: 'redTab'
	    };
	  },

	  render: function render() {
	    return _reactNative2['default'].createElement(
	      _reactNative.TabBarIOS,
	      { tintColor: 'black', barTintColor: '#3abeff' },
	      _reactNative2['default'].createElement(
	        _reactNative.TabBarIOS.Item,
	        { title: 'Dashboard', icon: __webpack_require__(55) },
	        _reactNative2['default'].createElement(_componentsDashboardComponent2['default'], null)
	      ),
	      _reactNative2['default'].createElement(
	        _reactNative.TabBarIOS.Item,
	        { title: 'Jobs', icon: __webpack_require__(55) },
	        _reactNative2['default'].createElement(_componentsJobsComponent2['default'], null)
	      ),
	      _reactNative2['default'].createElement(
	        _reactNative.TabBarIOS.Item,
	        { title: 'Settings', icon: __webpack_require__(61), selected: true },
	        _reactNative2['default'].createElement(_componentsSettingsComponent2['default'], null)
	      )
	    );
	  }
	});

	_reactNative.AppRegistry.registerComponent('ecdeploy', function () {
	  return ECDeploy;
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};

	exports.__esModule = true;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$defineProperty = __webpack_require__(3)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	_Object$defineProperty(exports, '__esModule', {
	  value: true
	});

	var _reactNative = __webpack_require__(7);

	var _reactNative2 = _interopRequireDefault(_reactNative);

	var styles = _reactNative.StyleSheet.create({
	  tabContent: {
	    flex: 1,
	    alignItems: 'center'
	  },
	  tabText: {
	    color: 'black',
	    margin: 50
	  }
	});

	exports['default'] = _reactNative2['default'].createClass({
	  displayName: 'settings.component',

	  getInitialState: function getInitialState() {
	    return {};
	  },

	  render: function render() {
	    return _reactNative2['default'].createElement(
	      _reactNative.View,
	      { style: [styles.tabContent, { backgroundColor: '#FFF' }] },
	      _reactNative2['default'].createElement(
	        _reactNative.Text,
	        { style: styles.tabText },
	        'Settings'
	      ),
	      _reactNative2['default'].createElement(
	        _reactNative.Text,
	        { style: styles.tabText },
	        'Details'
	      )
	    );
	  }
	});
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(4), __esModule: true };

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(5);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global = typeof self != 'undefined' ? self : Function('return this')()
	  , core   = {}
	  , defineProperty = Object.defineProperty
	  , hasOwnProperty = {}.hasOwnProperty
	  , ceil  = Math.ceil
	  , floor = Math.floor
	  , max   = Math.max
	  , min   = Math.min;
	// The engine works fine with descriptors? Thank's IE8 for his funny defineProperty.
	var DESC = !!function(){
	  try {
	    return defineProperty({}, 'a', {get: function(){ return 2; }}).a == 2;
	  } catch(e){ /* empty */ }
	}();
	var hide = createDefiner(1);
	// 7.1.4 ToInteger
	function toInteger(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	}
	function desc(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	}
	function simpleSet(object, key, value){
	  object[key] = value;
	  return object;
	}
	function createDefiner(bitmap){
	  return DESC ? function(object, key, value){
	    return $.setDesc(object, key, desc(bitmap, value));
	  } : simpleSet;
	}

	function isObject(it){
	  return it !== null && (typeof it == 'object' || typeof it == 'function');
	}
	function isFunction(it){
	  return typeof it == 'function';
	}
	function assertDefined(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	}

	var $ = module.exports = __webpack_require__(6)({
	  g: global,
	  core: core,
	  html: global.document && document.documentElement,
	  // http://jsperf.com/core-js-isobject
	  isObject:   isObject,
	  isFunction: isFunction,
	  that: function(){
	    return this;
	  },
	  // 7.1.4 ToInteger
	  toInteger: toInteger,
	  // 7.1.15 ToLength
	  toLength: function(it){
	    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	  },
	  toIndex: function(index, length){
	    index = toInteger(index);
	    return index < 0 ? max(index + length, 0) : min(index, length);
	  },
	  has: function(it, key){
	    return hasOwnProperty.call(it, key);
	  },
	  create:     Object.create,
	  getProto:   Object.getPrototypeOf,
	  DESC:       DESC,
	  desc:       desc,
	  getDesc:    Object.getOwnPropertyDescriptor,
	  setDesc:    defineProperty,
	  setDescs:   Object.defineProperties,
	  getKeys:    Object.keys,
	  getNames:   Object.getOwnPropertyNames,
	  getSymbols: Object.getOwnPropertySymbols,
	  assertDefined: assertDefined,
	  // Dummy, fix for not array-like ES3 string in es5 module
	  ES5Object: Object,
	  toObject: function(it){
	    return $.ES5Object(assertDefined(it));
	  },
	  hide: hide,
	  def: createDefiner(0),
	  set: global.Symbol ? simpleSet : hide,
	  each: [].forEach
	});
	/* eslint-disable no-undef */
	if(typeof __e != 'undefined')__e = core;
	if(typeof __g != 'undefined')__g = global;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function($){
	  $.FW   = false;
	  $.path = $.core;
	  return $;
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2015-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @flow
	 */
	'use strict';

	// Export React, plus some native additions.
	//
	// The use of Object.create/assign is to work around a Flow bug (#6560135).
	// Once that is fixed, change this back to
	//
	//   var ReactNative = {...require('React'), /* additions */}
	//
	var ReactNative = Object.assign(Object.create(__webpack_require__(9)), {
	  // Components
	  ActivityIndicatorIOS: __webpack_require__(10),
	  DatePickerIOS: __webpack_require__(11),
	  Image: __webpack_require__(12),
	  ListView: __webpack_require__(13),
	  MapView: __webpack_require__(14),
	  NavigatorIOS: __webpack_require__(15),
	  PickerIOS: __webpack_require__(16),
	  Navigator: __webpack_require__(17),
	  SegmentedControlIOS: __webpack_require__(18),
	  ScrollView: __webpack_require__(19),
	  SliderIOS: __webpack_require__(20),
	  SwitchIOS: __webpack_require__(21),
	  TabBarIOS: __webpack_require__(22),
	  Text: __webpack_require__(23),
	  TextInput: __webpack_require__(24),
	  TouchableHighlight: __webpack_require__(25),
	  TouchableOpacity: __webpack_require__(26),
	  TouchableWithoutFeedback: __webpack_require__(27),
	  View: __webpack_require__(28),
	  WebView: __webpack_require__(29),

	  // APIs
	  AlertIOS: __webpack_require__(30),
	  AppRegistry: __webpack_require__(31),
	  AppStateIOS: __webpack_require__(32),
	  AsyncStorage: __webpack_require__(8),
	  CameraRoll: __webpack_require__(33),
	  InteractionManager: __webpack_require__(34),
	  LinkingIOS: __webpack_require__(35),
	  LayoutAnimation: __webpack_require__(36),
	  NetInfo: __webpack_require__(37),
	  PixelRatio: __webpack_require__(38),
	  PushNotificationIOS: __webpack_require__(39),
	  PanResponder: __webpack_require__(40),
	  StatusBarIOS: __webpack_require__(41),
	  StyleSheet: __webpack_require__(42),
	  VibrationIOS: __webpack_require__(43),

	  // Plugins
	  DeviceEventEmitter: __webpack_require__(44),
	  NativeModules: __webpack_require__(45),
	  requireNativeComponent: __webpack_require__(46),

	  addons: {
	    LinkedStateMixin: __webpack_require__(47),
	    Perf: undefined,
	    PureRenderMixin: __webpack_require__(48),
	    TestModule: __webpack_require__(45).TestModule,
	    TestUtils: undefined,
	    batchedUpdates: __webpack_require__(49).batchedUpdates,
	    cloneWithProps: __webpack_require__(50),
	    createFragment: __webpack_require__(51).create,
	    update: __webpack_require__(52),
	  },
	});

	if (__DEV__) {
	  ReactNative.addons.Perf = __webpack_require__(53);
	  ReactNative.addons.TestUtils = __webpack_require__(54);
	}

	module.exports = ReactNative;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("AsyncStorage");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("React");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("ActivityIndicatorIOS");

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("DatePickerIOS");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("Image");

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("ListView");

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("MapView");

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("NavigatorIOS");

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("PickerIOS");

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("Navigator");

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("SegmentedControlIOS");

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("ScrollView");

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("SliderIOS");

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("SwitchIOS");

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("TabBarIOS");

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("Text");

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("TextInput");

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("TouchableHighlight");

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("TouchableOpacity");

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("TouchableWithoutFeedback");

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("View");

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("WebView");

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("AlertIOS");

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("AppRegistry");

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("AppStateIOS");

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("CameraRoll");

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("InteractionManager");

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("LinkingIOS");

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("LayoutAnimation");

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("NetInfo");

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("PixelRatio");

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("PushNotificationIOS");

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("PanResponder");

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("StatusBarIOS");

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("StyleSheet");

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("VibrationIOS");

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("RCTDeviceEventEmitter");

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("NativeModules");

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("requireNativeComponent");

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("LinkedStateMixin");

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("ReactComponentWithPureRenderMixin");

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("ReactUpdates");

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("cloneWithProps");

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("ReactFragment");

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("update");

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("ReactDefaultPerf");

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("ReactTestUtils");

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("image!icon4");

/***/ },
/* 56 */,
/* 57 */,
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$defineProperty = __webpack_require__(3)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	_Object$defineProperty(exports, '__esModule', {
	  value: true
	});

	var _reactNative = __webpack_require__(7);

	var _reactNative2 = _interopRequireDefault(_reactNative);

	var styles = _reactNative.StyleSheet.create({
	  tabContent: {
	    flex: 1,
	    alignItems: 'center'
	  },
	  tabText: {
	    color: 'black',
	    margin: 50
	  }
	});

	exports['default'] = _reactNative2['default'].createClass({
	  displayName: 'jobs.component',

	  getInitialState: function getInitialState() {
	    return {};
	  },

	  render: function render() {
	    return _reactNative2['default'].createElement(
	      _reactNative.View,
	      { style: [styles.tabContent, { backgroundColor: '#FFF' }] },
	      _reactNative2['default'].createElement(
	        _reactNative.Text,
	        { style: styles.tabText },
	        'Jobs'
	      ),
	      _reactNative2['default'].createElement(
	        _reactNative.Text,
	        { style: styles.tabText },
	        'Details'
	      )
	    );
	  }
	});
	module.exports = exports['default'];

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$defineProperty = __webpack_require__(3)['default'];

	var _interopRequireDefault = __webpack_require__(1)['default'];

	_Object$defineProperty(exports, '__esModule', {
	  value: true
	});

	var _reactNative = __webpack_require__(7);

	var _reactNative2 = _interopRequireDefault(_reactNative);

	var styles = _reactNative.StyleSheet.create({
	  tabContent: {
	    flex: 1,
	    alignItems: 'center'
	  },
	  tabText: {
	    color: 'black',
	    margin: 50
	  }
	});

	exports['default'] = _reactNative2['default'].createClass({
	  displayName: 'dashboard.component',

	  getInitialState: function getInitialState() {
	    return {};
	  },

	  render: function render() {
	    return _reactNative2['default'].createElement(
	      _reactNative.View,
	      { style: [styles.tabContent, { backgroundColor: '#FFF' }] },
	      _reactNative2['default'].createElement(
	        _reactNative.Text,
	        { style: styles.tabText },
	        'Dashboard'
	      ),
	      _reactNative2['default'].createElement(
	        _reactNative.Text,
	        { style: styles.tabText },
	        'Details'
	      )
	    );
	  }
	});
	module.exports = exports['default'];

/***/ },
/* 60 */,
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("image!ok");

/***/ }
/******/ ])));