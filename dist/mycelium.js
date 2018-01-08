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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(6);
var isBuffer = __webpack_require__(18);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object' && !isArray(obj)) {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

//module.exports = require("quill/dist/quill.core.js")

if (!window.Quill) console.error("Quill is not loaded!");

module.exports = window.Quill;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Quill = __webpack_require__(1);
__webpack_require__(37);
__webpack_require__(38);
__webpack_require__(39);
__webpack_require__(40);
var EventBus = __webpack_require__(4);

// quill events are registered a little bit later,
// because loading may trigger "text-change" which
// triggers autosave, but that is wrong behaviour
var QUILL_EVENT_REGISTRATION_DELAY = 1000;

var RichText = function () {
    _createClass(RichText, null, [{
        key: "createInstances",
        value: function createInstances(window, document, mycelium, shroom) {
            var elements = document.querySelectorAll('[mycelium-widget="rich-text"]');
            var instances = [];

            for (var i = 0; i < elements.length; i++) {
                instances.push(new RichText(window, document, elements[i], mycelium, shroom));
            }return instances;
        }
    }]);

    function RichText(window, document, element, mycelium, shroom) {
        _classCallCheck(this, RichText);

        // useful references
        this.mycelium = mycelium;
        this.window = window;
        this.document = document;

        /**
         * Root html element
         */
        this.element = element;

        // bind the widget to the element (used in IframeObject)
        this.element.widgetInstance = this;

        /**
         * Reference to the shroom
         */
        this.shroom = shroom;

        /**
         * Shroom data key
         */
        this.key = this.element.getAttribute("mycelium-key");

        if (!this.key) throw new Error("RichText widget missing 'key' attribute.");

        /**
         * Default widget value
         */
        this.defaultValue = this.element.getAttribute("mycelium-default");

        try {
            this.defaultValue = JSON.parse(this.defaultValue);
        } catch (e) {}

        this.createQuillInstance();

        this.registerEvents();
    }

    /**
     * Create and initialize quill instance
     */


    _createClass(RichText, [{
        key: "createQuillInstance",
        value: function createQuillInstance() {
            var _this = this;

            this.quill = new Quill(this.element);

            this.loadQuillContents();

            setTimeout(function () {

                _this.quill.on("text-change", _this.onTextChange.bind(_this));

                _this.quill.on("selection-change", _this.onSelectionChange.bind(_this));
            }, QUILL_EVENT_REGISTRATION_DELAY);
        }

        /**
         * Load contents from shroom data
         */

    }, {
        key: "loadQuillContents",
        value: function loadQuillContents() {
            var data = this.shroom.getData(this.key, this.defaultValue);

            try {
                // data as delta
                if (data instanceof Object && data.ops instanceof Array) {
                    this.quill.setContents(data, "silent");
                }

                // data as string
                else if (typeof data === "string") {
                        this.quill.setText(data, "silent");
                    }

                    // when something strange happens, put the data as JSON
                    // into the editor body
                    else {
                            this.quill.setText(JSON.stringify(data, null, 2), "silent");
                        }
            }

            // silence any crashes
            catch (e) {
                console.error(e);

                this.quill.setText("", "silent");
            }
        }

        /**
         * When quill content changes
         */

    }, {
        key: "onTextChange",
        value: function onTextChange() {
            this.shroom.setData(this.key, this.quill.getContents());
        }

        /**
         * When quill selection changes
         */

    }, {
        key: "onSelectionChange",
        value: function onSelectionChange(selection) {
            // last active widget
            if (selection === null) RichText.lastFocusedWidget = this;

            // active widget
            if (selection) {
                RichText.activeWidget = this;
                RichText.lastFocusedWidget = this;
                RichText.bus.fire("selection-change", selection, this.quill.getFormat());
                RichText.bus.fire("active-widget-change", this);
            } else if (selection === null && RichText.activeWidget === this) {
                RichText.activeWidget = null;
                RichText.bus.fire("selection-change", null, {});
                RichText.bus.fire("active-widget-change", null);
            }
        }
    }, {
        key: "registerEvents",
        value: function registerEvents() {
            this.bindListener("apply-bold", this.onApplyBold);
            this.bindListener("apply-italic", this.onApplyItalic);
            this.bindListener("apply-header", this.onApplyHeader);
            this.bindListener("insert-table", this.onInsertTable);
        }

        /**
         * Bind a rich-text bus listener
         */

    }, {
        key: "bindListener",
        value: function bindListener(event, listener) {
            RichText.bus.on(event, function (a) {
                if (!this.quill.getSelection()) return;

                listener.apply(this, arguments);

                // selection properties have changed
                RichText.bus.fire("selection-change", this.quill.getSelection(), this.quill.getFormat());
            }.bind(this));
        }

        /////////////////////
        // Event listeners //
        /////////////////////

    }, {
        key: "onApplyBold",
        value: function onApplyBold() {
            this.quill.format("bold", !this.quill.getFormat().bold);
        }
    }, {
        key: "onApplyItalic",
        value: function onApplyItalic() {
            this.quill.format("italic", !this.quill.getFormat().italic);
        }
    }, {
        key: "onApplyHeader",
        value: function onApplyHeader(level) {
            if (level == this.quill.getFormat().header) level = false;

            this.quill.format("header", level);
        }
    }, {
        key: "onInsertTable",
        value: function onInsertTable() {
            var range = this.quill.getSelection(true);
            this.quill.insertText(range.index, "\n");
            this.quill.insertEmbed(range.index + 1, "table", "{}");
            this.quill.setSelection(range.index + 2);
        }
    }]);

    return RichText;
}();

/**
 * Event bus for communication between widgets and the toolbar
 */


RichText.bus = new EventBus();

/**
 * Stores the currently active widget
 */
RichText.activeWidget = null;

/**
 * The widget that has been the last one to be blurred (/focused)
 *
 * For regaining focus after UI interactions
 */
RichText.lastFocusedWidget = null;

// export
module.exports = RichText;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

/**
 * Return an object of all refs in a given element
 *
 * Ref is an element with the ref="..." tag
 */
function getRefs(element) {
    var refs = {};
    var elements = element.querySelectorAll('[ref]');

    for (var i = 0; i < elements.length; i++) {
        refs[elements[i].getAttribute("ref")] = elements[i];
    }return refs;
}

module.exports = getRefs;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventBus = function () {
    function EventBus() {
        _classCallCheck(this, EventBus);

        this.listeners = {};
        this.firing = false;
    }

    _createClass(EventBus, [{
        key: "on",
        value: function on(event, callback) {
            if (this.listeners[event] === undefined) this.listeners[event] = [];

            // hide some useful properties on a listener
            // (we shouldn't write properties to the callback)
            var listener = function listener() {
                callback.apply(null, arguments);
            };

            listener.ignoreNext = this.firing === event;
            listener.callback = callback;

            this.listeners[event].push(listener);
        }
    }, {
        key: "fire",
        value: function fire(event, arg) {
            this.firing = event;

            var args = [];
            for (var i = 1; i < arguments.length; i++) {
                args.push(arguments[i]);
            }if (this.listeners[event] === undefined) this.listeners[event] = [];

            for (var _i = 0; _i < this.listeners[event].length; _i++) {
                if (this.listeners[event][_i].ignoreNext) {
                    this.listeners[event][_i].ignoreNext = false;
                    continue;
                }

                this.listeners[event][_i].apply(null, args);
            }

            this.firing = false;
        }
    }, {
        key: "off",
        value: function off(event, callback) {
            if (this.listeners[event] === undefined) return;

            for (var i = 0; i < this.listeners[event].length; i++) {
                if (this.listeners[event][i].callback === callback) {
                    this.listeners[event].splice(i, 1);
                    return;
                }
            }
        }
    }]);

    return EventBus;
}();

module.exports = EventBus;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(0);
var normalizeHeaderName = __webpack_require__(21);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(7);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(7);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(20)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var settle = __webpack_require__(22);
var buildURL = __webpack_require__(24);
var parseHeaders = __webpack_require__(25);
var isURLSameOrigin = __webpack_require__(26);
var createError = __webpack_require__(8);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(27);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ("development" !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(28);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(23);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IframeObject = __webpack_require__(42);
var getRefs = __webpack_require__(3);
var TableRow = __webpack_require__(43);
var EventBus = __webpack_require__(4);

var TableObject = function (_IframeObject) {
    _inherits(TableObject, _IframeObject);

    function TableObject() {
        _classCallCheck(this, TableObject);

        return _possibleConstructorReturn(this, (TableObject.__proto__ || Object.getPrototypeOf(TableObject)).apply(this, arguments));
    }

    _createClass(TableObject, [{
        key: "initialize",
        value: function initialize() {
            // set iframe body class
            this.contentBody.className = "mc-ql-table-blot__content";

            /**
             * Table element
             * (assigned in createDOM method)
             */
            this.tableElement = null;

            /**
             * Rows of the table
             */
            this.rows = [];

            /**
             * The selected cell
             * (set from within the TableCell class)
             */
            this.selectedCell = null;

            /**
             * The last selected cell
             * (again handled from within the cell class)
             */
            this.lastSelectedCell = null;

            /**
             * Event handlers to be freed on removal
             */
            this.eventHandlers = [];

            this.createDOM();
        }
    }, {
        key: "createDOM",
        value: function createDOM() {
            this.contentDiv.innerHTML = "\n            <div class=\"mc-ql-table-blot__table\">\n                <table>\n                    <tbody ref=\"table\">\n                    </tbody>\n                </table>\n            </div>\n        ";

            // get table reference
            var refs = getRefs(this.contentDiv);
            this.tableElement = refs.table;

            // super class method
            this.loadQuill();
        }

        /**
         * Called when quill is loaded in the iframe
         */

    }, {
        key: "onQuillLoaded",
        value: function onQuillLoaded() {
            // load table data
            this.loadValue();

            // if still empty, setup initial table
            if (this.rows.length <= 0) this.createInitialTable();

            this.updateDimensions();
        }

        /**
         * Load table value from delta
         */

    }, {
        key: "loadValue",
        value: function loadValue() {
            // deserialize value
            try {
                this.initialValue = JSON.parse(this.initialValue);
            }

            // hide any errors
            catch (e) {
                console.error(e);
                console.log(this.initialValue);
                this.initialValue = {};
            }

            if (!(this.initialValue.rows instanceof Array)) this.initialValue.rows = [];

            for (var i = 0; i < this.initialValue.rows.length; i++) {
                if (!(this.initialValue.rows[i] instanceof Array)) continue;

                this.addRow(this.initialValue.rows[i]);
            }
        }

        /**
         * Trigger shroom data update
         */

    }, {
        key: "triggerShroomUpdate",
        value: function triggerShroomUpdate() {
            // tell richtext widget that a change occured
            // (trigger text-change event)
            this.richText.quill.insertText(0, "");
        }

        /**
         * Sets up the initial table layout
         */

    }, {
        key: "createInitialTable",
        value: function createInitialTable() {
            // create a 2x5 table
            for (var i = 0; i < 5; i++) {
                this.addRow(2);
            }
        }

        /**
         * Add new row at a position
         * cells - if int, then count, if array, then content
         */

    }, {
        key: "addRow",
        value: function addRow(cells, at) {
            var row = new TableRow(this, cells);

            var before = this.tableElement.children[at];

            if (before) {
                this.tableElement.insertBefore(row.element, before);
                this.rows.splice(at, 0, row);
            } else {
                this.tableElement.appendChild(row.element);
                this.rows.push(row);
            }

            this.updateDimensions();
            this.triggerShroomUpdate();
        }

        /**
         * Adds a new column at a position
         */

    }, {
        key: "addColumn",
        value: function addColumn(at) {
            for (var i = 0; i < this.rows.length; i++) {
                this.rows[i].addCell(at);
            }this.triggerShroomUpdate();
        }

        /**
         * Removes a given row
         */

    }, {
        key: "removeRow",
        value: function removeRow(index) {
            if (this.rows.length <= 1) return;

            if (index < 0 || index > this.rows.length - 1) return;

            var row = this.rows[index];
            this.rows.splice(index, 1);
            row.remove();

            this.updateDimensions();
            this.triggerShroomUpdate();
        }

        /**
         * Removes a given column
         */

    }, {
        key: "removeColumn",
        value: function removeColumn(index) {
            // check table width
            if (index < 0 || index >= this.rows[0].cells.length) return;

            // remove the column from all rows
            for (var i = 0; i < this.rows.length; i++) {
                this.rows[i].removeCell(index);
            }this.triggerShroomUpdate();
        }

        /**
         * A cell was deselected
         * (called from the TableCell class)
         */

    }, {
        key: "cellDeselected",
        value: function cellDeselected() {
            if (TableObject.activeTable === this) {
                TableObject.lastFocusedTable = this;
                TableObject.activeTable = null;
                TableObject.bus.fire("active-table-change", null);
            }
        }

        /**
         * A new cell was selected
         * (called from the TableCell class)
         */

    }, {
        key: "cellSelected",
        value: function cellSelected() {
            TableObject.lastFocusedTable = this;
            TableObject.activeTable = this;
            TableObject.bus.fire("active-table-change", this);
        }

        /**
         * Focus this table
         */

    }, {
        key: "focus",
        value: function focus() {
            if (this.lastSelectedCell && !this.lastSelectedCell.removed) {
                this.lastSelectedCell.quill.focus();
            } else if (this.rows.length > 0 && this.rows[0].cells.length > 0) {
                this.rows[0].cells[0].quill.focus();
            }
        }

        /**
         * Returns quill delta value
         */

    }, {
        key: "getValue",
        value: function getValue() {
            var rows = this.rows.map(function (row) {
                return row.cells.map(function (cell) {
                    // convert delta to object
                    return {
                        ops: cell.quill.getContents().ops
                    };
                });
            });

            var value = {
                "rows": rows

                // serialize value
            };return JSON.stringify(value);
        }

        ////////////
        // Events //
        ////////////

        /**
         * Register all event handlers
         * (called from the super class)
         */

    }, {
        key: "bindEventListeners",
        value: function bindEventListeners() {
            this.bindToRichTextBus("active-widget-change", this.onActiveWidgetChange);

            this.bindToRichTextBus("insert-table-row-below", this.onInsertRowBelow);

            this.bindToRichTextBus("insert-table-row-above", this.onInsertRowAbove);

            this.bindToRichTextBus("insert-table-column-left", this.onInsertColumnLeft);

            this.bindToRichTextBus("insert-table-column-right", this.onInsertColumnRight);

            this.bindToRichTextBus("remove-table-row", this.onRemoveRow);

            this.bindToRichTextBus("remove-table-column", this.onRemoveColumn);
        }
    }, {
        key: "onActiveWidgetChange",
        value: function onActiveWidgetChange(activeWidget) {
            // if the user makes a selection in a richtext widget, then
            // he has probbably left this table so blurr it
            // (to make sure the UI updates itself properly)
            this.cellDeselected();
        }
    }, {
        key: "onInsertRowBelow",
        value: function onInsertRowBelow() {
            this.addRow(this.selectedCell.element.parentElement.children.length, this.selectedCell.getPosition().row + 1);
        }
    }, {
        key: "onInsertRowAbove",
        value: function onInsertRowAbove() {
            this.addRow(this.selectedCell.element.parentElement.children.length, this.selectedCell.getPosition().row);
        }
    }, {
        key: "onInsertColumnLeft",
        value: function onInsertColumnLeft() {
            this.addColumn(this.selectedCell.getPosition().column);
        }
    }, {
        key: "onInsertColumnRight",
        value: function onInsertColumnRight() {
            this.addColumn(this.selectedCell.getPosition().column + 1);
        }
    }, {
        key: "onRemoveRow",
        value: function onRemoveRow() {
            var pos = this.selectedCell.getPosition();
            this.removeRow(pos.row);

            if (pos.row >= 0 && pos.row < this.rows.length) this.rows[pos.row].cells[pos.column].focus();
        }
    }, {
        key: "onRemoveColumn",
        value: function onRemoveColumn() {
            var pos = this.selectedCell.getPosition();
            this.removeColumn(pos.column);

            if (pos.column >= 0 && pos.column < this.rows[pos.row].cells.length) this.rows[pos.row].cells[pos.column].focus();
        }

        /**
         * Register event handler
         */

    }, {
        key: "bindToRichTextBus",
        value: function bindToRichTextBus(event, callback) {
            var handler = function () {
                callback.apply(this, arguments);
            }.bind(this);

            var RichText = __webpack_require__(2);

            RichText.bus.on(event, function () {

                // only if active
                if (TableObject.lastFocusedTable !== this) return;

                // call the handler
                handler.apply(this, arguments);
            }.bind(this));

            // add to handler list
            this.eventHandlers[event] = handler;
        }

        /**
         * Free event handlers
         * (called from destructor)
         */

    }, {
        key: "freeEventListeners",
        value: function freeEventListeners() {
            var RichText = __webpack_require__(2);

            for (var i in this.eventHandlers) {
                RichText.bus.off(i, this.eventHandlers);
            }
        }
    }]);

    return TableObject;
}(IframeObject);

/**
 * Event bus for tables
 */


TableObject.bus = new EventBus();

/**
 * Stores the currently active table
 */
TableObject.activeTable = null;

/**
 * The table that has been the last one to be blurred (/focused)
 *
 * For regaining focus after UI interactions
 */
TableObject.lastFocusedTable = null;

module.exports = TableObject;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

/**
 * Enables or disables a css class on an element
 */
function cssClass(element, cssClass, enable) {
    var newClasses = "";
    var found = false;

    for (var i = 0; i < element.classList.length; i++) {
        if (element.classList[i] == cssClass) {
            found = true;

            if (enable) newClasses += element.classList[i] + " ";
        } else {
            newClasses += element.classList[i] + " ";
        }
    }

    if (!found && enable) newClasses += cssClass;

    element.className = newClasses;
}

module.exports = cssClass;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(14);
module.exports = __webpack_require__(58);


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

///////////////////////////////
// Create mycelium namespace //
///////////////////////////////

if (!window.mycelium) window.mycelium = {};

// object for storing mycelium state
if (!window.mycelium.state) window.mycelium.state = {};

// exported mycelium php config
if (!window.mycelium.config) window.mycelium.config = {};

// namespace for exporting classes
if (!window.mycelium.class) window.mycelium.class = {};

//////////////////////
// Register classes //
//////////////////////

window.mycelium.class.Shroom = __webpack_require__(15);

if (!window.mycelium.class.widgets) window.mycelium.class.widgets = {};

window.mycelium.class.widgets.RichText = __webpack_require__(2);

if (!window.mycelium.class.ui) window.mycelium.class.ui = {};

window.mycelium.class.ui.Toolbar = __webpack_require__(45);
window.mycelium.class.ui.WindowManager = __webpack_require__(57);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var axios = __webpack_require__(16);
var TextWidget = __webpack_require__(36);
var RichTextWidget = __webpack_require__(2);

// delay between a change and save call
var AUTOSAVE_TIMEOUT = 2000;

/**
 * Class representing a shroom with all of it's data and widgets
 *
 * Handles editing and saving, interacts with the UI
 */

var Shroom = function () {
    /**
     * Creates new Shroom instance
     * @param {Window} window DOM widnow object
     * @param {Document} document DOM document object
     * @param {Object} serializedData JSON-serialized php Shroom class
     */
    function Shroom(window, document, mycelium, serializedData) {
        _classCallCheck(this, Shroom);

        // mycelium namespace reference
        this.mycelium = mycelium;

        /**
         * DOM access
         */
        this.window = window;
        this.document = document;

        // load shroom from serialized JSON data
        this.loadSerializedData(serializedData);

        /**
         * Saving stuff
         */
        this.autosaveEnabled = false; // automatic saving
        this.savingTimerId = null; // autosave timer
        this.saving = false; // save request pending
        this.saved = true; // no changes made since last save

        /**
         * Widgets
         */
        this.widgets = [];

        // create instances of all widgets
        this.createWidgetInstances();

        // initializeAutosave() has to be called externally
        // depending on the usecase (e.g. you don't want
        // autosave when testing)
    }

    /**
     * Loads info from JSON-serialized php Shroom class
     *
     * The argument is an object, not string
     */


    _createClass(Shroom, [{
        key: "loadSerializedData",
        value: function loadSerializedData(data) {
            this.id = data.id;
            this.slug = data.slug;
            this.cluster = data.cluster;

            this.title = data.title;

            this.data = data.data;

            // if the provided data is empty, it's serialized
            // in php as [] instead of {}
            if (this.data instanceof Array) this.data = {};
        }

        /////////////
        // Widgets //
        /////////////

        /**
         * Instantiates controllers for all widgets
         * and handles their registration
         */

    }, {
        key: "createWidgetInstances",
        value: function createWidgetInstances() {
            this.widgets = this.widgets.concat(TextWidget.createInstances(this.window, this.document, this));

            this.widgets = this.widgets.concat(RichTextWidget.createInstances(this.window, this.document, this.mycelium, this));
        }

        //////////
        // Data //
        //////////

        /**
         * Sets new value to a data key
         */

    }, {
        key: "setData",
        value: function setData(key, value) {
            this.data[key] = value;

            this.onDataChange();
        }

        /**
         * Returns data under a key
         */

    }, {
        key: "getData",
        value: function getData(key, defaultValue) {
            if (defaultValue === undefined) defaultValue = null;

            var data = this.data[key];

            if (data === undefined) return defaultValue;

            return data;
        }

        ////////////
        // Saving //
        ////////////

        /**
         * Starts the autosave logic
         */

    }, {
        key: "initializeAutosave",
        value: function initializeAutosave() {
            this.autosaveEnabled = true;

            if (!this.saved) this.scheduleAutosave();
        }

        /**
         * Performs the saving procedure - the HTTP request
         */

    }, {
        key: "save",
        value: function save() {
            var _this = this;

            this.saving = true;
            this.saved = true;

            if (this.savingTimerId !== null) {
                clearTimeout(this.savingTimerId);
                this.savingTimerId = null;
            }

            axios.post(this.window.location.href, {
                data: this.data
            }).then(function (response) {
                console.warn("Shroom saved.");

                _this.saving = false;
                _this.afterSave();
            });
        }

        /**
         * Starts or resets the autosave timer
         *
         * Autosave enabled checks have to be made externally
         */

    }, {
        key: "scheduleAutosave",
        value: function scheduleAutosave() {
            if (this.saving) return;

            if (this.savingTimerId !== null) clearTimeout(this.savingTimerId);

            this.savingTimerId = setTimeout(this.save.bind(this), AUTOSAVE_TIMEOUT);
        }

        ////////////
        // Events //
        ////////////

        /**
         * When some data changes (in the data object)
         */

    }, {
        key: "onDataChange",
        value: function onDataChange() {
            this.saved = false;

            if (this.autosaveEnabled) this.scheduleAutosave();
        }

        /**
         * Called after a successful save() execution
         */

    }, {
        key: "afterSave",
        value: function afterSave() {
            // changes were made during saving
            if (!this.saved) this.scheduleAutosave();
        }
    }]);

    return Shroom;
}();

module.exports = Shroom;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(17);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var bind = __webpack_require__(6);
var Axios = __webpack_require__(19);
var defaults = __webpack_require__(5);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(10);
axios.CancelToken = __webpack_require__(34);
axios.isCancel = __webpack_require__(9);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(35);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 18 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(5);
var utils = __webpack_require__(0);
var InterceptorManager = __webpack_require__(29);
var dispatchRequest = __webpack_require__(30);
var isAbsoluteURL = __webpack_require__(32);
var combineURLs = __webpack_require__(33);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
  config.method = config.method.toLowerCase();

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 20 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(8);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var transformData = __webpack_require__(31);
var isCancel = __webpack_require__(9);
var defaults = __webpack_require__(5);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(10);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 36 */
/***/ (function(module, exports) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Text = function () {
    _createClass(Text, null, [{
        key: "createInstances",
        value: function createInstances(window, document, shroom) {
            var elements = document.querySelectorAll('[mycelium-widget="text"]');
            var instances = [];

            for (var i = 0; i < elements.length; i++) {
                instances.push(new Text(window, document, elements[i], shroom));
            }return instances;
        }
    }]);

    function Text(window, document, element, shroom) {
        _classCallCheck(this, Text);

        this.window = window;
        this.document = document;

        this.el = element;

        this.shroom = shroom;
        this.key = this.el.getAttribute("mycelium-key");

        if (!this.key) throw new Error("Text widget missing 'key' attribute.");

        this.el.addEventListener("input", this.onInput.bind(this));

        this.el.addEventListener("paste", this.onPaste.bind(this));

        this.el.addEventListener("drop", this.onDrop.bind(this));
    }

    _createClass(Text, [{
        key: "onInput",
        value: function onInput(e) {
            this.shroom.setData(this.key, this.getText());
        }
    }, {
        key: "onPaste",
        value: function onPaste(e) {
            e.preventDefault();

            if (e.clipboardData && e.clipboardData.getData) {
                var text = e.clipboardData.getData("text/plain");
                this.insertTextAtCursor(text);
            } else if (this.window.clipboardData && this.window.clipboardData.getData) {
                var text = this.window.clipboardData.getData("Text");
                this.insertTextAtCursor(text);
            }
        }
    }, {
        key: "onDrop",
        value: function onDrop(e) {
            e.preventDefault();

            // browser ain't support, we ain't support
            if (!this.document.caretRangeFromPoint) return;

            var range = this.document.caretRangeFromPoint(e.clientX, e.clientY);

            var selection = this.window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);

            this.insertTextAtCursor(e.dataTransfer.getData("text/plain"));
        }
    }, {
        key: "insertTextAtCursor",
        value: function insertTextAtCursor(text) {
            this.document.execCommand("insertHTML", false, text);
        }
    }, {
        key: "getText",
        value: function getText() {
            return this.el.innerText;
        }
    }]);

    return Text;
}();

module.exports = Text;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Quill = __webpack_require__(1);
var Inline = Quill.import("blots/inline");

var BoldBlot = function (_Inline) {
  _inherits(BoldBlot, _Inline);

  function BoldBlot() {
    _classCallCheck(this, BoldBlot);

    return _possibleConstructorReturn(this, (BoldBlot.__proto__ || Object.getPrototypeOf(BoldBlot)).apply(this, arguments));
  }

  return BoldBlot;
}(Inline);

BoldBlot.blotName = "bold";
BoldBlot.tagName = "strong";

Quill.register(BoldBlot);

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Quill = __webpack_require__(1);
var Inline = Quill.import("blots/inline");

var ItalicBlot = function (_Inline) {
  _inherits(ItalicBlot, _Inline);

  function ItalicBlot() {
    _classCallCheck(this, ItalicBlot);

    return _possibleConstructorReturn(this, (ItalicBlot.__proto__ || Object.getPrototypeOf(ItalicBlot)).apply(this, arguments));
  }

  return ItalicBlot;
}(Inline);

ItalicBlot.blotName = "italic";
ItalicBlot.tagName = "em";

Quill.register(ItalicBlot);

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Quill = __webpack_require__(1);
var Block = Quill.import("blots/block");

var HeaderBlot = function (_Block) {
    _inherits(HeaderBlot, _Block);

    function HeaderBlot() {
        _classCallCheck(this, HeaderBlot);

        return _possibleConstructorReturn(this, (HeaderBlot.__proto__ || Object.getPrototypeOf(HeaderBlot)).apply(this, arguments));
    }

    _createClass(HeaderBlot, null, [{
        key: "formats",
        value: function formats(node) {
            return HeaderBlot.tagName.indexOf(node.tagName) + 1;
        }
    }]);

    return HeaderBlot;
}(Block);

HeaderBlot.blotName = "header";
HeaderBlot.tagName = ["H1", "H2"];

Quill.register(HeaderBlot);

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Quill = __webpack_require__(1);
var IframeBlot = __webpack_require__(41);
var TableObject = __webpack_require__(11);

var TableBlot = function (_IframeBlot) {
    _inherits(TableBlot, _IframeBlot);

    function TableBlot() {
        _classCallCheck(this, TableBlot);

        return _possibleConstructorReturn(this, (TableBlot.__proto__ || Object.getPrototypeOf(TableBlot)).apply(this, arguments));
    }

    _createClass(TableBlot, null, [{
        key: "create",
        value: function create(value) {
            return _get(TableBlot.__proto__ || Object.getPrototypeOf(TableBlot), "create", this).call(this, value, TableObject);
        }
    }, {
        key: "value",
        value: function value(node) {
            return _get(TableBlot.__proto__ || Object.getPrototypeOf(TableBlot), "value", this).call(this, node);
        }
    }]);

    return TableBlot;
}(IframeBlot);

TableBlot.blotName = "table";
TableBlot.className = "mc-ql-table-blot";

Quill.register(TableBlot);

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Quill = __webpack_require__(1);
var BlockEmbed = Quill.import("blots/block/embed");

DIMENSION_TIMER_INTERVAL = 5000;
CSS_SCOPE_CLASS_PREFIX = "css-scope__";

var IframeBlot = function (_BlockEmbed) {
    _inherits(IframeBlot, _BlockEmbed);

    function IframeBlot() {
        _classCallCheck(this, IframeBlot);

        return _possibleConstructorReturn(this, (IframeBlot.__proto__ || Object.getPrototypeOf(IframeBlot)).apply(this, arguments));
    }

    _createClass(IframeBlot, null, [{
        key: "create",
        value: function create(value, iframeObjectClass) {
            // create an element
            var node = _get(IframeBlot.__proto__ || Object.getPrototypeOf(IframeBlot), "create", this).call(this);

            // set iframe attributes
            node.setAttribute("scrolling", "no");
            node.setAttribute("frameborder", "0");

            // we need a tick such that the contentDocument is available  
            setTimeout(function () {

                // check compatibility
                if (!node.contentDocument || !node.contentWindow) {
                    console.error("iframe javascript interface not supported");
                    return;
                }

                // create content
                IframeBlot.createContentDocument(node, value, iframeObjectClass);
            }, 1);

            return node;
        }
    }, {
        key: "value",
        value: function value(node) {
            if (!node.iframeObject) return {};

            return node.iframeObject.getValue();
        }

        /**
         * Create content document
         */

    }, {
        key: "createContentDocument",
        value: function createContentDocument(node, value, iframeObjectClass) {
            // create and register content div
            node.contentDocument.body.innerHTML = "<div></div>";
            node.contentDiv = node.contentDocument.body.children[0];

            // remove margin and margin overflow
            node.contentDocument.body.style.margin = "0";
            node.contentDiv.style.padding = "1px";

            // get parent widget
            parentWidget = IframeBlot.getParentWidget(node);

            // set css scopes
            IframeBlot.setCssScopes(node, parentWidget);

            // apply styles
            IframeBlot.copyCssStyles(node);

            // initialize iframe object
            node.iframeObject = new iframeObjectClass(node, value, parentWidget);

            // start dimension update loop
            IframeBlot.startDimensionTimer(node);
        }

        /**
         * Finds the parent widget element
         */

    }, {
        key: "getParentWidget",
        value: function getParentWidget(node) {
            // find parent widet
            var el = node;
            var widget = null;

            while (el.parentElement) {
                if (el.getAttribute("mycelium-widget") == "rich-text") {
                    widget = el;
                    break;
                }

                el = el.parentElement;
            }

            if (!widget) {
                console.error("Unable to find parent widget!");
                return null;
            }

            return widget;
        }

        /**
         * Sets proper css scopes to inner document
         */

    }, {
        key: "setCssScopes",
        value: function setCssScopes(node, parentWidget) {
            // get css scope
            var scope = parentWidget.getAttribute("mycelium-css-scope");

            // set scope class
            node.contentDiv.className = CSS_SCOPE_CLASS_PREFIX + scope;
        }

        /**
         * Applies all CSS styles to the iframe content
         * that are in the main document body
         */

    }, {
        key: "copyCssStyles",
        value: function copyCssStyles(node) {
            var links = node.ownerDocument.querySelectorAll('link[rel="stylesheet"]');

            for (var i = 0; i < links.length; i++) {
                var copy = node.contentDocument.createElement("link");
                copy.setAttribute("href", links[i].getAttribute("href"));
                copy.setAttribute("type", links[i].getAttribute("type"));
                copy.setAttribute("rel", links[i].getAttribute("rel"));

                node.contentDocument.body.appendChild(copy);
            }
        }

        /**
         * Starts the dimension timer
         */

    }, {
        key: "startDimensionTimer",
        value: function startDimensionTimer(node) {
            // call the update once right after initialization
            setTimeout(function () {
                IframeBlot.dimensionTimerTick(node);
            }, 500);

            // random offset
            setTimeout(function () {

                // interval
                node.dimensionTimerId = setInterval(function () {
                    IframeBlot.dimensionTimerTick(node);
                }, DIMENSION_TIMER_INTERVAL);
            }, Math.random() * DIMENSION_TIMER_INTERVAL);
        }

        /**
         * Tick of the dimension check timer
         */

    }, {
        key: "dimensionTimerTick",
        value: function dimensionTimerTick(node) {
            // check node removal
            if (!node.parentElement) {
                // remove timer
                clearInterval(node.dimensionTimerId);

                // call destructor
                if (node.iframeObject) node.iframeObject.destructor();

                return;
            }

            if (node.iframeObject) node.iframeObject.updateDimensions();
        }
    }]);

    return IframeBlot;
}(BlockEmbed);

IframeBlot.tagName = "iframe";

module.exports = IframeBlot;

/***/ }),
/* 42 */
/***/ (function(module, exports) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
    Basically a way to glue object instances on top
    of static blot methods and provide some
    general API via method inheritance
 */

/**
 * A base class for block embedded ifram objects
 */
var IframeObject = function () {
  function IframeObject(node, value, widgetElement) {
    _classCallCheck(this, IframeObject);

    /**
     * The blot element (the iframe itself)
     */
    this.node = node;

    /**
     * Initial embed value
     */
    this.initialValue = value;

    /**
     * The parent widget element
     */
    this.widgetElement = widgetElement;

    /**
     * The parent widget instance (rich text widget)
     */
    this.richText = widgetElement.widgetInstance;

    /**
     * Document of the iframe content
     */
    this.contentDocument = node.contentDocument;

    /**
     * Window of the iframe content
     */
    this.contentWindow = node.contentWindow;

    /**
     * Body of the content document
     */
    this.contentBody = this.contentDocument.body;

    /**
     * Content div of the iframe
     */
    this.contentDiv = this.node.contentDiv;

    this.initialize();

    this.bindEventListeners();
  }

  /**
   * Handles initialization
   *
   * Efectively replaces constructor
   */


  _createClass(IframeObject, [{
    key: "initialize",
    value: function initialize() {}
    // override this


    /**
     * Return delta blot value
     */

  }, {
    key: "getValue",
    value: function getValue() {
      // override this
      return {};
    }

    /**
     * This is called when element removal is noticed
     * (from IframeBlot)
     */

  }, {
    key: "destructor",
    value: function destructor() {
      this.freeEventListeners();
    }

    /**
     * Updates iframe height
     */

  }, {
    key: "updateDimensions",
    value: function updateDimensions() {
      this.node.style.height = this.contentDiv.offsetHeight + "px";
    }

    /**
     * Loads quill.js in the iframe
     */

  }, {
    key: "loadQuill",
    value: function loadQuill() {
      var _this = this;

      var rootQuillScript = document.querySelector('script[mycelium-quill-script]');

      if (!rootQuillScript) {
        console.error("Mycelium quill script not found!");
        return;
      }

      quillLink = this.contentDocument.createElement("script");

      quillLink.onload = function () {
        _this.onQuillLoaded();
      };

      quillLink.src = rootQuillScript.src;

      this.contentBody.appendChild(quillLink);
    }

    /**
     * Called when quill is loaded in the iframe
     */

  }, {
    key: "onQuillLoaded",
    value: function onQuillLoaded() {}
    // override me


    ////////////
    // Events //
    ////////////

  }, {
    key: "bindEventListeners",
    value: function bindEventListeners() {
      // override this
    }
  }, {
    key: "freeEventListeners",
    value: function freeEventListeners() {
      // override this
      // (make sure not to forget)
    }
  }]);

  return IframeObject;
}();

module.exports = IframeObject;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TableCell = __webpack_require__(44);

var TableRow = function () {
    function TableRow(tableObject, cells) {
        _classCallCheck(this, TableRow);

        /**
         * Table object reference
         */
        this.tableObject = tableObject;

        /**
         * Cells in the row
         */
        this.cells = [];

        /**
         * Indicates if the row has been removed from the table
         */
        this.removed = false;

        this.createElement();

        // number of empty cells
        if (typeof cells === "number") {
            for (var i = 0; i < cells; i++) {
                this.addCell();
            }
        }

        // cells with content
        else if (cells instanceof Array) {
                for (var _i = 0; _i < cells.length; _i++) {
                    this.addCell(undefined, cells[_i]);
                }
            }
    }

    /**
     * Creates the html element
     */


    _createClass(TableRow, [{
        key: "createElement",
        value: function createElement() {
            this.element = this.tableObject.contentDocument.createElement("tr");
        }

        /**
         * Add new cell at a given index (or the end if undefined)
         */

    }, {
        key: "addCell",
        value: function addCell(at, content) {
            var cell = new TableCell(this.tableObject, content);

            var before = this.element.children[at];

            if (before) {
                this.cells.splice(at, 0, cell);
                this.element.insertBefore(cell.element, before);
            } else {
                this.cells.push(cell);
                this.element.appendChild(cell.element);
            }
        }

        /**
         * Removes a cell at a given index
         */

    }, {
        key: "removeCell",
        value: function removeCell(index) {
            if (index < 0 || index >= this.cells.length) return;

            var cell = this.cells[index];
            this.cells.splice(index, 1);
            cell.remove();
        }

        /**
         * Remove the row from table
         */

    }, {
        key: "remove",
        value: function remove() {
            this.element.remove();

            this.removed = true;

            for (var i = 0; i < this.cells.length; i++) {
                this.cells[i].remove();
            }
        }
    }]);

    return TableRow;
}();

module.exports = TableRow;

/***/ }),
/* 44 */
/***/ (function(module, exports) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TableCell = function () {
    function TableCell(tableObject, content) {
        _classCallCheck(this, TableCell);

        /**
         * Table object reference
         */
        this.tableObject = tableObject;

        /**
         * Indicates if the cell has been removed from the table
         */
        this.removed = false;

        this.createElement();

        this.loadContent(content);
    }

    /**
     * Creates the html element
     */


    _createClass(TableCell, [{
        key: "createElement",
        value: function createElement() {
            this.element = this.tableObject.contentDocument.createElement("td");

            this.quill = new this.tableObject.contentWindow.Quill(this.element);

            // bind listener for selection change
            this.selectionChangeListener = this.onQuillSelectionChange.bind(this);
            this.quill.on("selection-change", this.selectionChangeListener);

            // bind listener for text change
            this.textChangeListener = this.onQuillTextChange.bind(this);
            this.quill.on("text-change", this.textChangeListener);
        }

        /**
         * Load cell content
         */

    }, {
        key: "loadContent",
        value: function loadContent(content) {
            if (content === undefined || content === null) return;

            // string argument
            if (typeof content === "string") {
                this.quill.setText(content, "silent");
                return;
            }

            // delta argument
            if (content instanceof Object && content.ops instanceof Array) {
                this.quill.setContents(content, "silent");
                return;
            }

            // when something strange happens, put the data as JSON
            // into the editor body
            this.quill.setText(JSON.stringify(content, null, 2), "silent");
        }

        /**
         * Called when quill selection changes
         */

    }, {
        key: "onQuillSelectionChange",
        value: function onQuillSelectionChange(selection) {
            if (selection === null) {
                if (this.tableObject.selectedCell === this) {
                    this.tableObject.selectedCell = null;
                    this.tableObject.lastSelectedCell = this;

                    this.tableObject.cellDeselected();
                }
            } else {
                this.tableObject.selectedCell = this;
                this.tableObject.lastSelectedCell = this;
                this.tableObject.cellSelected();
            }
        }

        /**
         * Called when the quill text changes
         */

    }, {
        key: "onQuillTextChange",
        value: function onQuillTextChange() {
            // update iframe dimensions
            this.tableObject.updateDimensions();

            // change has happened
            this.tableObject.triggerShroomUpdate();
        }

        /**
         * Focus this cell
         */

    }, {
        key: "focus",
        value: function focus() {
            this.quill.focus();
        }

        /**
         * Returns an object specifying cell position
         */

    }, {
        key: "getPosition",
        value: function getPosition() {
            return {
                column: Array.prototype.indexOf.call(this.element.parentElement.children, this.element),
                row: Array.prototype.indexOf.call(this.element.parentElement.parentElement.children, this.element.parentElement)
            };
        }

        /**
         * Remove the cell from table
         */

    }, {
        key: "remove",
        value: function remove() {
            this.element.remove();

            this.removed = true;

            // remove event listeners
            this.quill.off("selection-change", this.selectionChangeListener);
        }
    }]);

    return TableCell;
}();

module.exports = TableCell;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RichTextWidgetToolbar = __webpack_require__(46);
var getRefs = __webpack_require__(3);

var Toolbar = function () {
    function Toolbar(window, document, mycelium) {
        _classCallCheck(this, Toolbar);

        // reference to the mycelium namespace
        this.mycelium = mycelium;

        /**
         * References to elements
         */
        this.refs = {};

        this.createDOM(document);

        // create rich-text widget toolbar window
        if (this.mycelium.state.editing) {
            this.richTextToolbar = new RichTextWidgetToolbar(window, document, this.mycelium);

            this.mycelium.windowManager.registerWindow(this.richTextToolbar, {
                persistent: true,
                name: "RichTextWidgetToolbar"
            });
        }
    }

    /**
     * Creates all elements and appends them to the document
     */


    _createClass(Toolbar, [{
        key: "createDOM",
        value: function createDOM(document) {
            var _this = this;

            // create toolbar element
            var element = document.createElement("div");
            element.innerHTML = __webpack_require__(56);
            element.className = "mc-toolbar";

            // create spacer
            var spacer = document.createElement("div");
            spacer.style.height = "50px";

            // add elemnts to the page
            document.body.appendChild(element);
            document.body.appendChild(spacer);

            this.element = element;
            this.spacer = spacer;
            this.refs = getRefs(this.element);

            // register event listeners
            this.refs.logout.addEventListener("click", this.onLogoutClick.bind(this));
            this.refs.toggleEdit.addEventListener("click", this.onToggleEditClick.bind(this));

            if (this.mycelium.state.editing) {
                this.refs.richTextToolbar.addEventListener("click", function () {
                    _this.richTextToolbar.maximize();
                });
            } else {
                this.refs.richTextToolbar.remove();
            }

            this.initializeElements();
        }

        /**
         * Initializes individual elements based on the mycelium state
         */

    }, {
        key: "initializeElements",
        value: function initializeElements() {
            this.initializeLogoutButton();
        }

        /**
         * Initializes logout button
         */

    }, {
        key: "initializeLogoutButton",
        value: function initializeLogoutButton() {
            if (!this.mycelium.config.auth.enabled) this.refs.logout.remove();
        }

        /////////////////////
        // Event listeners //
        /////////////////////

    }, {
        key: "onLogoutClick",
        value: function onLogoutClick() {
            window.location.href = this.mycelium.config.auth.routes.logout;
        }
    }, {
        key: "onToggleEditClick",
        value: function onToggleEditClick() {
            var path = window.location.pathname;

            if (path[path.length - 1] !== "/") path += "/";

            if (this.mycelium.state.editing) {
                // exit edit mode
                window.location.href = path + "..";
            } else {
                // enter edit mode
                window.location.href = path + "edit";
            }
        }
    }]);

    return Toolbar;
}();

module.exports = Toolbar;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Window = __webpack_require__(47);
var getRefs = __webpack_require__(3);
var cssClass = __webpack_require__(12);
var Picker = __webpack_require__(51);
var Menu = __webpack_require__(53);
var RichTextWidget = __webpack_require__(2);
var TableObject = __webpack_require__(11);

var RichTextWidgetToolbar = function (_Window) {
    _inherits(RichTextWidgetToolbar, _Window);

    function RichTextWidgetToolbar(window, document, mycelium) {
        _classCallCheck(this, RichTextWidgetToolbar);

        var _this = _possibleConstructorReturn(this, (RichTextWidgetToolbar.__proto__ || Object.getPrototypeOf(RichTextWidgetToolbar)).call(this, window, document, mycelium));

        _this.content.innerHTML = __webpack_require__(55);

        _this.refs = getRefs(_this.content);

        _this.headerPicker = new Picker(document, _this.refs.header, [{ key: "p", label: "Normal" }, { key: "h1", label: "Heading 1" }, { key: "h2", label: "Heading 2" }]);

        _this.tableInsertMenu = new Menu(document, _this.refs.tableInsert, "Insert", [{ key: "row-below", label: "Row below" }, { key: "row-above", label: "Row above" }, { key: "column-left", label: "Column left" }, { key: "column-right", label: "Column right" }]);

        _this.tableRemoveMenu = new Menu(document, _this.refs.tableRemove, "Remove", [{ key: "row", label: "Row" }, { key: "column", label: "Column" }]);

        _this.registerEventListeners();
        return _this;
    }

    _createClass(RichTextWidgetToolbar, [{
        key: "registerEventListeners",
        value: function registerEventListeners() {
            this.refs.bold.addEventListener("click", this.onBoldClick.bind(this));
            this.refs.italic.addEventListener("click", this.onItalicClick.bind(this));

            this.headerPicker.on("user-pick", this.onHeaderPick.bind(this));
            this.headerPicker.on("expand", this.onHeaderPickerExpand.bind(this));

            this.refs.table.addEventListener("click", this.onTableClick.bind(this));

            this.tableInsertMenu.on("user-click", this.onTableInsertMenuClick.bind(this));
            this.tableInsertMenu.on("expand", this.onTableInsertMenuExapnd.bind(this));

            this.tableRemoveMenu.on("user-click", this.onTableRemoveMenuClick.bind(this));
            this.tableRemoveMenu.on("expand", this.onTableRemoveMenuExapnd.bind(this));

            // we listen for widget selection changes to determine
            // changes in the styling UI like bold, header etc.
            RichTextWidget.bus.on("selection-change", this.onWidgetSelectionChange.bind(this));
        }

        /////////////////
        // UI altering //
        /////////////////

        /**
         * When rich-text widget selection changes (any of them)
         */

    }, {
        key: "onWidgetSelectionChange",
        value: function onWidgetSelectionChange(selection, format) {
            // dont' do anything on deselect
            if (selection === null) return;

            // bold
            cssClass(this.refs.bold, "mc-rtwt__button--active", !!format.bold);

            // italic
            cssClass(this.refs.italic, "mc-rtwt__button--active", !!format.italic);

            // header
            if (format.header === undefined) this.headerPicker.pick("p");else this.headerPicker.pick("h" + format.header);
        }

        /////////////////////
        // Event listeners //
        /////////////////////

    }, {
        key: "onBoldClick",
        value: function onBoldClick() {
            RichTextWidget.bus.fire("apply-bold");
        }
    }, {
        key: "onItalicClick",
        value: function onItalicClick() {
            RichTextWidget.bus.fire("apply-italic");
        }
    }, {
        key: "onHeaderPick",
        value: function onHeaderPick(key) {
            if (key == "p") key = false;else key = parseInt(key[1]);

            // refocus the widget
            // (focus has been lost by clicking the picker label)
            if (RichTextWidget.lastFocusedWidget) RichTextWidget.lastFocusedWidget.quill.focus();

            RichTextWidget.bus.fire("apply-header", key);
        }
    }, {
        key: "onHeaderPickerExpand",
        value: function onHeaderPickerExpand() {
            // keep the widget focused
            if (RichTextWidget.lastFocusedWidget) RichTextWidget.lastFocusedWidget.quill.focus();
        }

        ////////////
        // Tables //
        ////////////

    }, {
        key: "onTableClick",
        value: function onTableClick() {
            RichTextWidget.bus.fire("insert-table");
        }
    }, {
        key: "onTableInsertMenuClick",
        value: function onTableInsertMenuClick(key) {
            switch (key) {
                case "row-below":
                    RichTextWidget.bus.fire("insert-table-row-below");
                    break;

                case "row-above":
                    RichTextWidget.bus.fire("insert-table-row-above");
                    break;

                case "column-left":
                    RichTextWidget.bus.fire("insert-table-column-left");
                    break;

                case "column-right":
                    RichTextWidget.bus.fire("insert-table-column-right");
                    break;
            }

            if (TableObject.lastFocusedTable) TableObject.lastFocusedTable.focus();
        }
    }, {
        key: "onTableInsertMenuExapnd",
        value: function onTableInsertMenuExapnd() {
            // keep table focused
            if (TableObject.lastFocusedTable) TableObject.lastFocusedTable.focus();
        }
    }, {
        key: "onTableRemoveMenuClick",
        value: function onTableRemoveMenuClick(key) {
            switch (key) {
                case "row":
                    RichTextWidget.bus.fire("remove-table-row");
                    break;

                case "column":
                    RichTextWidget.bus.fire("remove-table-column");
                    break;
            }

            if (TableObject.lastFocusedTable) TableObject.lastFocusedTable.focus();
        }
    }, {
        key: "onTableRemoveMenuExapnd",
        value: function onTableRemoveMenuExapnd() {
            // keep table focused
            if (TableObject.lastFocusedTable) TableObject.lastFocusedTable.focus();
        }
    }]);

    return RichTextWidgetToolbar;
}(Window);

module.exports = RichTextWidgetToolbar;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var clamp = __webpack_require__(48);
var cssClass = __webpack_require__(12);
var getRefs = __webpack_require__(3);
var defaultOptions = __webpack_require__(49);

/**
 * How long it takes for a window to minimize
 */
var MINIMIZATION_DELAY = 500;

var Window = function () {
    function Window(window, document, mycelium) {
        _classCallCheck(this, Window);

        this.window = window;
        this.document = document;
        this.mycelium = mycelium;

        /**
         * Reference to the window manager set on registration
         */
        this.windowManager = null;

        /**
         * Window position
         */
        this.position = { x: 20, y: 20

            /**
             * If the window is minimized
             */
        };this.minimized = false;

        /**
         * Minimize only flag
         */
        this.minimizeOnly = false;

        /**
         * Persistency flag
         */
        this.persistent = false;

        /**
         * Window name
         */
        this.name = null;

        /**
         * Is the window being dragged
         */
        this.dragged = false;

        // dragging properties
        this.dragStartMousePosition = null;
        this.dragStartWindowPosition = null;

        /**
         * Private refs, user may want to use such name for himself
         */
        this._refs = {};

        // create html stuff
        this._createDOM();

        this.updateDisplay();

        this.handle.addEventListener("mousedown", this.onHandleMouseDown.bind(this));

        this.window.addEventListener("mousemove", this.onWindowMouseMove.bind(this));

        this.window.addEventListener("mouseup", this.onWindowMouseUp.bind(this));

        this.window.addEventListener("resize", this.onBrowserWindowResize.bind(this));

        this._refs.minimize.addEventListener("click", this.minimize.bind(this));

        this._refs.close.addEventListener("click", this.close.bind(this));
    }

    /**
     * Private dom creation (this method name may be used by the user)
     */


    _createClass(Window, [{
        key: "_createDOM",
        value: function _createDOM() {
            var element = this.document.createElement("div");
            element.className = "mc-window";
            element.innerHTML = __webpack_require__(50);

            this.element = element;
            this.handle = element.querySelector(".mc-window__handle");
            this.content = element.querySelector(".mc-window__content");

            this._refs = getRefs(this.element);
        }

        /**
         * Called by the window manager, when the window is being registered
         */

    }, {
        key: "onRegistration",
        value: function onRegistration(windowManager, options) {
            this.windowManager = windowManager;

            options = defaultOptions(options, {
                minimizeOnly: false,
                persistent: false,
                name: null
            });

            this.minimizeOnly = options.minimizeOnly;
            this.persistent = options.persistent;
            this.name = options.name;

            // persistent windows are automatically minimizeOnly
            if (this.persistent) this.minimizeOnly = true;

            // hide minimization button if minimize only set
            // (closing button takes the action)
            if (this.minimizeOnly) this._refs.minimize.style.display = "none";
        }

        /**
         * Updates displayed position and size
         */

    }, {
        key: "updateDisplay",
        value: function updateDisplay() {
            // clip window position
            this.position.x = clamp(this.position.x, 0, this.window.innerWidth - this.element.clientWidth);
            this.position.y = clamp(this.position.y, 0, this.window.innerHeight - this.element.clientHeight - 50 // toolbar
            );

            // update rendered position
            this.element.style.left = this.position.x + "px";
            this.element.style.top = this.position.y + "px";
        }

        /**
         * Minimize the window
         */

    }, {
        key: "minimize",
        value: function minimize() {
            var _this = this;

            if (this.minimized) return;

            cssClass(this.element, "mc-window--minimized", true);

            setTimeout(function () {
                _this.element.style.display = "none";

                _this.minimized = true;
            }, MINIMIZATION_DELAY);
        }

        /**
         * Maximize the window
         */

    }, {
        key: "maximize",
        value: function maximize() {
            var _this2 = this;

            if (!this.minimized) return;

            this.element.style.display = "block";

            setTimeout(function () {
                cssClass(_this2.element, "mc-window--minimized", false);
            }, 0);

            this.minimized = false;
        }

        /**
         * Closes the window
         */

    }, {
        key: "close",
        value: function close() {
            var _this3 = this;

            // if minimize only, don't close
            if (this.minimizeOnly) {
                this.minimize();
                return;
            }

            // minimize first
            this.minimize();

            // forget
            setTimeout(function () {
                _this3.windowManager.forgetWindow(_this3);

                // signal, that it has been forgotten
                _this3.windowManager = null;
            }, MINIMIZATION_DELAY);
        }

        /**
         * Private sleep implementation
         * Handles the basics
         */

    }, {
        key: "_sleep",
        value: function _sleep() {
            return {
                position: this.position,
                minimized: this.minimized,

                userData: this.sleep()
            };
        }

        /**
         * Save state to a dream
         */

    }, {
        key: "sleep",
        value: function sleep() {
            return null;
        }

        /**
         * Private sleep implementation
         * Handles the basics
         */

    }, {
        key: "_wakeup",
        value: function _wakeup(dream) {
            if (!(dream instanceof Object)) return;

            if ("position" in dream) this.position = dream.position;

            if ("minimized" in dream) {
                if (dream.minimized) this.minimize();else this.maximize();
            }

            this.updateDisplay();

            // call user-defined wakeup
            this.wakeup(dream.userData);
        }

        /**
         * Recover state from a dream
         */

    }, {
        key: "wakeup",
        value: function wakeup(dream) {}
        // nothing


        /////////////////////
        // Event listeners //
        /////////////////////

    }, {
        key: "onHandleMouseDown",
        value: function onHandleMouseDown(e) {
            this.dragged = true;

            this.dragStartMousePosition = { x: e.clientX, y: e.clientY };
            this.dragStartWindowPosition = { x: this.position.x, y: this.position.y };
        }
    }, {
        key: "onWindowMouseMove",
        value: function onWindowMouseMove(e) {
            if (!this.dragged) return;

            e.preventDefault();

            this.position.x = this.dragStartWindowPosition.x + e.clientX - this.dragStartMousePosition.x;

            this.position.y = this.dragStartWindowPosition.y + e.clientY - this.dragStartMousePosition.y;

            this.updateDisplay();
        }
    }, {
        key: "onWindowMouseUp",
        value: function onWindowMouseUp(e) {
            if (!this.dragged) return;

            e.preventDefault();

            this.dragged = false;
        }
    }, {
        key: "onBrowserWindowResize",
        value: function onBrowserWindowResize() {
            this.updateDisplay();
        }
    }]);

    return Window;
}();

module.exports = Window;

/***/ }),
/* 48 */
/***/ (function(module, exports) {

/**
 * Clamp a value between two bounds
 */
function clamp(x, min, max) {
    if (x < min) return min;else if (x > max) return max;else return x;
}

module.exports = clamp;

/***/ }),
/* 49 */
/***/ (function(module, exports) {


/**
 * Adds default option values to a provided options object
 */
function defaultOptions(options, defOptions) {
    if (options === undefined) options = {};

    for (o in defOptions) {
        if (options[o] === undefined) options[o] = defOptions[o];
    }

    return options;
}

module.exports = defaultOptions;

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = "<div class=\"mc-window__bar\">\n    <div class=\"mc-window__handle\"></div>\n\n    <div class=\"mc-window__button\" ref=\"minimize\">\n        <svg x=\"0px\" y=\"0px\" viewBox=\"0 0 20 20\" enable-background=\"new 0 0 20 20\">\n            <path fill=\"#FFFFFF\" d=\"M4.516,7.548c0.436-0.446,1.043-0.481,1.576,0L10,11.295l3.908-3.747c0.533-0.481,1.141-0.446,1.574,0\n            c0.436,0.445,0.408,1.197,0,1.615c-0.406,0.418-4.695,4.502-4.695,4.502C10.57,13.888,10.285,14,10,14s-0.57-0.112-0.789-0.335\n            c0,0-4.287-4.084-4.695-4.502C4.107,8.745,4.08,7.993,4.516,7.548z\"/>\n        </svg>\n    </div>\n\n    <div class=\"mc-window__button\" ref=\"close\">\n        <svg x=\"0px\" y=\"0px\" viewBox=\"0 0 20 20\" enable-background=\"new 0 0 20 20\">\n            <path fill=\"#FFFFFF\" d=\"M14.348,14.849c-0.469,0.469-1.229,0.469-1.697,0L10,11.819l-2.651,3.029c-0.469,0.469-1.229,0.469-1.697,0\n            c-0.469-0.469-0.469-1.229,0-1.697l2.758-3.15L5.651,6.849c-0.469-0.469-0.469-1.228,0-1.697s1.228-0.469,1.697,0L10,8.183\n            l2.651-3.031c0.469-0.469,1.228-0.469,1.697,0s0.469,1.229,0,1.697l-2.758,3.152l2.758,3.15\n            C14.817,13.62,14.817,14.38,14.348,14.849z\"/>\n        </svg>\n    </div>\n</div>\n<div class=\"mc-window__content\">\n    <!--window content-->\n</div>";

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventBus = __webpack_require__(4);

/*
    Events:
    "pick" - when the pick() method is succesfully called
    "user-pick" - when the user picks an item by clicking an option
    "expand" - when the picker is expanded
 */

var Picker = function () {
    function Picker(document, element, options) {
        _classCallCheck(this, Picker);

        /**
         * Document reference
         */
        this.document = document;

        /**
         * Root element
         */
        this.element = element;

        /**
         * Is the picker expanded?
         */
        this.expanded = false;

        /**
         * Options to pick from
         *
         * An array of objects: { key: string, label: string }
         */
        this.options = options;

        /**
         * The picked option
         */
        this.pickedOption = null;

        /**
         * Event bus
         */
        this.bus = new EventBus();

        // create all necessary elements
        this.createDOM();

        // pick the first item in the list
        this.pick(this.options[0].key);

        // bind event handlers
        this.label.addEventListener("click", this.onLabelClick.bind(this));
        this.element.addEventListener("mouseleave", this.onPickerMouseLeave.bind(this));
        this.optionsElement.addEventListener("click", this.onOptionsClick.bind(this));
    }

    /**
     * Creates all necessary html elements
     */


    _createClass(Picker, [{
        key: "createDOM",
        value: function createDOM() {
            this.element.className += " mc-picker";
            this.element.innerHTML = __webpack_require__(52);

            this.label = this.element.querySelector(".mc-picker__label");
            this.optionsElement = this.element.querySelector(".mc-picker__options");

            for (var i = 0; i < this.options.length; i++) {
                var option = this.document.createElement("div");
                option.innerHTML = this.options[i].label;
                option.setAttribute("mc-picker-key", this.options[i].key);
                this.optionsElement.appendChild(option);
            }
        }

        /**
         * Collapse the picker
         */

    }, {
        key: "collapse",
        value: function collapse() {
            this.expanded = false;
            this.optionsElement.style.display = "none";
        }

        /**
         * Expand the picker
         */

    }, {
        key: "expand",
        value: function expand() {
            this.expanded = true;
            this.optionsElement.style.display = "block";

            this.bus.fire("expand");
        }

        /**
         * Pick an option
         */

    }, {
        key: "pick",
        value: function pick(optionKey) {
            for (var i = 0; i < this.options.length; i++) {
                if (this.options[i].key == optionKey) {
                    this.pickedOption = this.options[i];
                    this.label.setAttribute("data-label", this.options[i].label);

                    this.bus.fire("pick", this.options[i].key);
                    break;
                }
            }
        }

        /**
         * Register an event listener
         */

    }, {
        key: "on",
        value: function on(event, listener) {
            this.bus.on(event, listener);
        }

        ////////////////////
        // Event handlers //
        ////////////////////

    }, {
        key: "onLabelClick",
        value: function onLabelClick(e) {
            if (this.expanded) this.collapse();else this.expand();
        }
    }, {
        key: "onPickerMouseLeave",
        value: function onPickerMouseLeave() {
            this.collapse();
        }
    }, {
        key: "onOptionsClick",
        value: function onOptionsClick(e) {
            var key = e.target.getAttribute("mc-picker-key");

            if (key === null) return;

            this.pick(key);
            this.collapse();

            this.bus.fire("user-pick", key);
        }
    }]);

    return Picker;
}();

module.exports = Picker;

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = "<span class=\"mc-picker\">\n    <span class=\"mc-picker__label\" data-label=\"\">\n        <svg viewBox=\"0 0 18 18\">\n            <polygon class=\"mc-picker__stroke\" points=\"7 11 9 13 11 11 7 11\"></polygon>\n            <polygon class=\"mc-picker__stroke\" points=\"7 7 9 5 11 7 7 7\"></polygon>\n        </svg>\n    </span>\n    <span class=\"mc-picker__options\" style=\"display: none\">\n    </span>\n</span>";

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventBus = __webpack_require__(4);

/*
    Events:
    "click" - when the click method is called
    "user-click" - when the user clicks an item
    "expand" - when the menu is expanded
 */

var Menu = function () {
    function Menu(document, element, label, items) {
        _classCallCheck(this, Menu);

        /**
         * Document reference
         */
        this.document = document;

        /**
         * Root element
         */
        this.element = element;

        /**
         * Is the menu expanded?
         */
        this.expanded = false;

        /**
         * Items to click
         *
         * An array of objects: { key: string, label: string }
         */
        this.items = items;

        /**
         * Event bus
         */
        this.bus = new EventBus();

        // create all necessary elements
        this.createDOM();

        // set the label
        this.label.setAttribute("data-label", label);

        // bind event handlers
        this.label.addEventListener("click", this.onLabelClick.bind(this));
        this.element.addEventListener("mouseleave", this.onMenuMouseLeave.bind(this));
        this.itemsElement.addEventListener("click", this.onItemsClick.bind(this));
    }

    /**
     * Creates all necessary html elements
     */


    _createClass(Menu, [{
        key: "createDOM",
        value: function createDOM(label) {
            this.element.className += " mc-menu";
            this.element.innerHTML = __webpack_require__(54);

            this.label = this.element.querySelector(".mc-menu__label");
            this.itemsElement = this.element.querySelector(".mc-menu__items");

            for (var i = 0; i < this.items.length; i++) {
                var item = this.document.createElement("div");
                item.innerHTML = this.items[i].label;
                item.setAttribute("mc-menu-key", this.items[i].key);
                this.itemsElement.appendChild(item);
            }
        }

        /**
         * Collapse the menu
         */

    }, {
        key: "collapse",
        value: function collapse() {
            this.expanded = false;
            this.itemsElement.style.display = "none";
        }

        /**
         * Expand the menu
         */

    }, {
        key: "expand",
        value: function expand() {
            this.expanded = true;
            this.itemsElement.style.display = "block";

            this.bus.fire("expand");
        }

        /**
         * Click an item
         */

    }, {
        key: "click",
        value: function click(itemKey) {
            for (var i = 0; i < this.items.length; i++) {
                if (this.items[i].key == itemKey) {
                    this.bus.fire("click", this.items[i].key);
                    break;
                }
            }
        }

        /**
         * Register an event listener
         */

    }, {
        key: "on",
        value: function on(event, listener) {
            this.bus.on(event, listener);
        }

        ////////////////////
        // Event handlers //
        ////////////////////

    }, {
        key: "onLabelClick",
        value: function onLabelClick(e) {
            if (this.expanded) this.collapse();else this.expand();
        }
    }, {
        key: "onMenuMouseLeave",
        value: function onMenuMouseLeave() {
            this.collapse();
        }
    }, {
        key: "onItemsClick",
        value: function onItemsClick(e) {
            var key = e.target.getAttribute("mc-menu-key");

            if (key === null) return;

            this.click(key);
            this.collapse();

            this.bus.fire("user-click", key);
        }
    }]);

    return Menu;
}();

module.exports = Menu;

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = "<span class=\"mc-menu\">\n    <span class=\"mc-menu__label\" data-label=\"\">\n        <svg viewBox=\"0 0 18 18\">\n            <polygon class=\"mc-menu__stroke\" points=\"7 11 9 13 11 11 7 11\"></polygon>\n            <polygon class=\"mc-menu__stroke\" points=\"7 7 9 5 11 7 7 7\"></polygon>\n        </svg>\n    </span>\n    <span class=\"mc-menu__items\" style=\"display: none\">\n    </span>\n</span>";

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = "<div class=\"mc-rtwt\">\n\n    <!-- set bold style -->\n    <button class=\"mc-rtwt__button\" ref=\"bold\">\n        <svg viewBox=\"0 0 18 18\">\n            <path class=\"mc-rtwt-stroke\" d=\"M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z\"></path>\n            <path class=\"mc-rtwt-stroke\" d=\"M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z\"></path>\n        </svg>\n    </button>\n\n    <!-- set italic style -->\n    <button class=\"mc-rtwt__button\" ref=\"italic\">\n        <svg viewBox=\"0 0 18 18\">\n            <line class=\"mc-rtwt-stroke\" x1=\"7\" x2=\"13\" y1=\"4\" y2=\"4\"></line>\n            <line class=\"mc-rtwt-stroke\" x1=\"5\" x2=\"11\" y1=\"14\" y2=\"14\"></line>\n            <line class=\"mc-rtwt-stroke\" x1=\"8\" x2=\"10\" y1=\"14\" y2=\"4\"></line>\n        </svg>\n    </button>\n\n    <!-- em -->\n    <button class=\"mc-rtwt__button\" ref=\"emphasis\">\n        E\n    </button>\n\n    <hr class=\"mc-rtwt__line\">\n\n    <!-- pick header type -->\n    <span ref=\"header\"></span>\n\n    <hr class=\"mc-rtwt__line\">\n\n    <!-- link -->\n    <button class=\"mc-rtwt__button\" ref=\"link\">\n        L\n    </button>\n\n    <!-- email -->\n    <button class=\"mc-rtwt__button\" ref=\"email\">\n        @\n    </button>\n\n    <!-- telephone -->\n    <button class=\"mc-rtwt__button\" ref=\"telephone\">\n        T\n    </button>\n\n    <hr class=\"mc-rtwt__line\">\n\n    <!-- add a table -->\n    <button class=\"mc-rtwt__button\" ref=\"table\">\n        <svg viewBox=\"0 0 26 28\">\n            <g fill=\"#444\" transform=\"scale(0.02734375 0.02734375)\">\n                <path d=\"M292.571 786.286v-109.714c0-10.286-8-18.286-18.286-18.286h-182.857c-10.286 0-18.286 8-18.286 18.286v109.714c0 10.286 8 18.286 18.286 18.286h182.857c10.286 0 18.286-8 18.286-18.286zM292.571 566.857v-109.714c0-10.286-8-18.286-18.286-18.286h-182.857c-10.286 0-18.286 8-18.286 18.286v109.714c0 10.286 8 18.286 18.286 18.286h182.857c10.286 0 18.286-8 18.286-18.286zM585.143 786.286v-109.714c0-10.286-8-18.286-18.286-18.286h-182.857c-10.286 0-18.286 8-18.286 18.286v109.714c0 10.286 8 18.286 18.286 18.286h182.857c10.286 0 18.286-8 18.286-18.286zM292.571 347.429v-109.714c0-10.286-8-18.286-18.286-18.286h-182.857c-10.286 0-18.286 8-18.286 18.286v109.714c0 10.286 8 18.286 18.286 18.286h182.857c10.286 0 18.286-8 18.286-18.286zM585.143 566.857v-109.714c0-10.286-8-18.286-18.286-18.286h-182.857c-10.286 0-18.286 8-18.286 18.286v109.714c0 10.286 8 18.286 18.286 18.286h182.857c10.286 0 18.286-8 18.286-18.286zM877.714 786.286v-109.714c0-10.286-8-18.286-18.286-18.286h-182.857c-10.286 0-18.286 8-18.286 18.286v109.714c0 10.286 8 18.286 18.286 18.286h182.857c10.286 0 18.286-8 18.286-18.286zM585.143 347.429v-109.714c0-10.286-8-18.286-18.286-18.286h-182.857c-10.286 0-18.286 8-18.286 18.286v109.714c0 10.286 8 18.286 18.286 18.286h182.857c10.286 0 18.286-8 18.286-18.286zM877.714 566.857v-109.714c0-10.286-8-18.286-18.286-18.286h-182.857c-10.286 0-18.286 8-18.286 18.286v109.714c0 10.286 8 18.286 18.286 18.286h182.857c10.286 0 18.286-8 18.286-18.286zM877.714 347.429v-109.714c0-10.286-8-18.286-18.286-18.286h-182.857c-10.286 0-18.286 8-18.286 18.286v109.714c0 10.286 8 18.286 18.286 18.286h182.857c10.286 0 18.286-8 18.286-18.286zM950.857 164.571v621.714c0 50.286-41.143 91.429-91.429 91.429h-768c-50.286 0-91.429-41.143-91.429-91.429v-621.714c0-50.286 41.143-91.429 91.429-91.429h768c50.286 0 91.429 41.143 91.429 91.429z\" />\n            </g>\n        </svg>\n    </button>\n\n    <!-- insert something to a table -->\n    <span ref=\"tableInsert\"></span>\n\n    <!-- remove something from a table -->\n    <span ref=\"tableRemove\"></span>\n</div>";

/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = "<!--\n    Icons used:\n    http://www.entypo.com/\n-->\n\n<div class=\"mc-toolbar__panel\">\n    <button class=\"mc-toolbar__button mc-toggle-edit\" ref=\"toggleEdit\">\n        <svg x=\"0px\" y=\"0px\" viewBox=\"0 0 20 20\" enable-background=\"new 0 0 20 20\">\n            <path fill=\"#000000\" d=\"M17.561,2.439c-1.442-1.443-2.525-1.227-2.525-1.227L8.984,7.264L2.21,14.037L1.2,18.799l4.763-1.01\n            l6.774-6.771l6.052-6.052C18.788,4.966,19.005,3.883,17.561,2.439z M5.68,17.217l-1.624,0.35c-0.156-0.293-0.345-0.586-0.69-0.932\n            c-0.346-0.346-0.639-0.533-0.932-0.691l0.35-1.623l0.47-0.469c0,0,0.883,0.018,1.881,1.016c0.997,0.996,1.016,1.881,1.016,1.881\n            L5.68,17.217z\"/>\n        </svg>\n    </button>\n\n    <button class=\"mc-toolbar__button mc-toggle-edit\" ref=\"richTextToolbar\">\n        <svg x=\"0px\" y=\"0px\" viewBox=\"0 0 20 20\" enable-background=\"new 0 0 20 20\">\n            <path fill=\"#000000\" d=\"M3.135,6.89c0.933-0.725,1.707-0.225,2.74,0.971c0.116,0.135,0.272-0.023,0.361-0.1\n            C6.324,7.683,7.687,6.456,7.754,6.4C7.82,6.341,7.9,6.231,7.795,6.108C7.688,5.985,7.301,5.483,7.052,5.157\n            c-1.808-2.365,4.946-3.969,3.909-3.994c-0.528-0.014-2.646-0.039-2.963-0.004C6.715,1.294,5.104,2.493,4.293,3.052\n            C3.232,3.778,2.836,4.204,2.771,4.263c-0.3,0.262-0.048,0.867-0.592,1.344C1.604,6.11,1.245,5.729,0.912,6.021\n            C0.747,6.167,0.285,6.513,0.153,6.628C0.02,6.745-0.004,6.942,0.132,7.099c0,0,1.264,1.396,1.37,1.52\n            C1.607,8.741,1.893,8.847,2.069,8.69c0.177-0.156,0.632-0.553,0.708-0.623C2.855,8.001,2.727,7.206,3.135,6.89z M8.843,7.407\n            c-0.12-0.139-0.269-0.143-0.397-0.029L7.012,8.63c-0.113,0.1-0.129,0.283-0.027,0.4l8.294,9.439c0.194,0.223,0.53,0.246,0.751,0.053\n            L17,17.709c0.222-0.195,0.245-0.533,0.052-0.758L8.843,7.407z M19.902,3.39c-0.074-0.494-0.33-0.391-0.463-0.182\n            c-0.133,0.211-0.721,1.102-0.963,1.506c-0.24,0.4-0.832,1.191-1.934,0.41c-1.148-0.811-0.749-1.377-0.549-1.758\n            c0.201-0.383,0.818-1.457,0.907-1.59c0.089-0.135-0.015-0.527-0.371-0.363c-0.357,0.164-2.523,1.025-2.823,2.26\n            c-0.307,1.256,0.257,2.379-0.85,3.494l-1.343,1.4l1.349,1.566l1.654-1.57c0.394-0.396,1.236-0.781,1.998-0.607\n            c1.633,0.369,2.524-0.244,3.061-1.258C20.057,5.792,19.977,3.884,19.902,3.39z M2.739,17.053c-0.208,0.209-0.208,0.549,0,0.758\n            l0.951,0.93c0.208,0.209,0.538,0.121,0.746-0.088l4.907-4.824L7.84,12.115L2.739,17.053z\"/>\n        </svg>\n    </button>\n</div>\n\n<hr class=\"mc-toolbar__line\">\n\n<div class=\"mc-toolbar__text\">\n    Saving...\n</div>\n\n<hr class=\"mc-toolbar__line\">\n\n<div style=\"flex: 1\"></div>\n\n<hr class=\"mc-toolbar__line\">\n\n<div class=\"mc-toolbar__panel\">\n    <button class=\"mc-toolbar__button mc-logout\" ref=\"logout\">\n        <svg version=\"1.1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 20 20\" enable-background=\"new 0 0 20 20\">\n            <path fill=\"#000000\" d=\"M19,10l-6-5v3H6v4h7v3L19,10z M3,3h8V1H3C1.9,1,1,1.9,1,3v14c0,1.1,0.9,2,2,2h8v-2H3V3z\"/>\n        </svg>\n    </button>\n</div>";

/***/ }),
/* 57 */
/***/ (function(module, exports) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Prefix in the local storage key name for a window dream
 */
var DREAM_PREFIX = "mycelium-window-dream:";

var WindowManager = function () {
    function WindowManager(window, document) {
        _classCallCheck(this, WindowManager);

        // browser window reference
        this.window = window;

        /**
         * List of all instantiated windows
         * @type {Array}
         */
        this.windows = [];

        /**
         * Container for all windows
         * Set on DOM creation
         */
        this.element = null;

        this.createDOM(document);

        this.window.addEventListener("beforeunload", this.onBrowserWindowUnload.bind(this));
    }

    _createClass(WindowManager, [{
        key: "createDOM",
        value: function createDOM(document) {
            var element = document.createElement("div");
            element.className = "mc-window-manager";

            document.body.appendChild(element);

            this.element = element;
        }

        /**
         * Registers a new window
         */

    }, {
        key: "registerWindow",
        value: function registerWindow(win, options) {
            this.windows.push(win);
            this.element.appendChild(win.element);

            win.onRegistration(this, options);

            // wakeup if needed
            if (win.persistent) win._wakeup(this.getWindowDream(win)); // call private wakeup
        }

        /**
         * Forget a window
         */

    }, {
        key: "forgetWindow",
        value: function forgetWindow(win) {
            this.element.removeChild(win.element);

            var i = this.windows.indexOf(win);
            if (i >= 0) this.windows.splice(i, 1);
        }

        /**
         * When the browser is unloading
         */

    }, {
        key: "onBrowserWindowUnload",
        value: function onBrowserWindowUnload() {
            // save all persistent windows
            for (var i = 0; i < this.windows.length; i++) {
                if (this.windows[i].persistent) {
                    this.setWindowDream(this.windows[i], this.windows[i]._sleep() // call private sleep
                    );
                }
            }
        }

        /**
         * Returns dream for a given window
         */

    }, {
        key: "getWindowDream",
        value: function getWindowDream(win) {
            // check name
            if (!win.name) {
                console.error("Window is persistent, but has no name.");
                return null;
            }

            // check storage access
            if (!(this.window.localStorage instanceof Storage)) return null;

            // dream key
            var key = DREAM_PREFIX + win.name;

            // check window existence
            if (!(key in this.window.localStorage)) return null;

            // try to parse the string
            var dream = void 0;
            try {
                dream = JSON.parse(this.window.localStorage[key]);
            } catch (e) {
                console.error("Error while parsing dream: " + key, e);
                return null;
            }

            return dream;
        }

        /**
         * Sets a dream for a given window
         */

    }, {
        key: "setWindowDream",
        value: function setWindowDream(win, dream) {
            // check name
            if (!win.name) return; // error already printed on load

            // check storage access
            if (!(this.window.localStorage instanceof Storage)) return;

            // dream key
            var key = DREAM_PREFIX + win.name;

            // default
            if (dream === undefined) dream = null;

            // try to parse the string
            try {
                var text = JSON.stringify(dream);
                this.window.localStorage[key] = text;
            } catch (e) {
                console.error("Error while saving dream: " + key, e);
            }
        }
    }]);

    return WindowManager;
}();

module.exports = WindowManager;

/***/ }),
/* 58 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);