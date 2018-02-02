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
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(14);
var isBuffer = __webpack_require__(37);

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
/* 2 */
/***/ (function(module, exports) {

module.exports = function (Quill) {

    /**
     * Finds the parent text pad element
     */
    function getParentTextPad(element) {
        // find parent widet
        var el = element;
        var padElement = null;

        while (el.parentElement) {
            if (el.getAttribute("mycelium-text-pad") === "here") {
                padElement = el;
                break;
            }

            el = el.parentElement;
        }

        // unable to find
        if (!padElement) return null;

        return padElement.textPad;
    }

    function HeaderMatcher(element, delta) {
        var textPad = getParentTextPad(element);
        var headers = null;

        if (textPad === null) headers = { offset: 0, count: 6 };else headers = textPad.options.headers;

        var min = headers ? headers.offset + 1 : 1;
        var max = headers ? headers.offset + headers.count : 6;

        // max is 6 anyway, regardless of any offset
        if (max > 6) max = 6;

        var level = parseInt(element.tagName[1]);
        var text = element.innerText;

        // clamp level
        if (level < min) level = min;
        if (level > max) level = max;

        return {
            ops: [{
                insert: text
            }, {
                insert: "\n",
                attributes: {
                    header: level
                }
            }]
        };
    }

    return HeaderMatcher;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var asap = __webpack_require__(20);

function noop() {}

// States:
//
// 0 - pending
// 1 - fulfilled with _value
// 2 - rejected with _value
// 3 - adopted the state of another promise, _value
//
// once the state is no longer pending (0) it is immutable

// All `_` prefixed properties will be reduced to `_{random number}`
// at build time to obfuscate them and discourage their use.
// We don't use symbols or Object.defineProperty to fully hide them
// because the performance isn't good enough.


// to avoid using try/catch inside critical functions, we
// extract them to here.
var LAST_ERROR = null;
var IS_ERROR = {};
function getThen(obj) {
  try {
    return obj.then;
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}

function tryCallOne(fn, a) {
  try {
    return fn(a);
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}
function tryCallTwo(fn, a, b) {
  try {
    fn(a, b);
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}

module.exports = Promise;

function Promise(fn) {
  if (typeof this !== 'object') {
    throw new TypeError('Promises must be constructed via new');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('Promise constructor\'s argument is not a function');
  }
  this._75 = 0;
  this._83 = 0;
  this._18 = null;
  this._38 = null;
  if (fn === noop) return;
  doResolve(fn, this);
}
Promise._47 = null;
Promise._71 = null;
Promise._44 = noop;

Promise.prototype.then = function(onFulfilled, onRejected) {
  if (this.constructor !== Promise) {
    return safeThen(this, onFulfilled, onRejected);
  }
  var res = new Promise(noop);
  handle(this, new Handler(onFulfilled, onRejected, res));
  return res;
};

function safeThen(self, onFulfilled, onRejected) {
  return new self.constructor(function (resolve, reject) {
    var res = new Promise(noop);
    res.then(resolve, reject);
    handle(self, new Handler(onFulfilled, onRejected, res));
  });
}
function handle(self, deferred) {
  while (self._83 === 3) {
    self = self._18;
  }
  if (Promise._47) {
    Promise._47(self);
  }
  if (self._83 === 0) {
    if (self._75 === 0) {
      self._75 = 1;
      self._38 = deferred;
      return;
    }
    if (self._75 === 1) {
      self._75 = 2;
      self._38 = [self._38, deferred];
      return;
    }
    self._38.push(deferred);
    return;
  }
  handleResolved(self, deferred);
}

function handleResolved(self, deferred) {
  asap(function() {
    var cb = self._83 === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      if (self._83 === 1) {
        resolve(deferred.promise, self._18);
      } else {
        reject(deferred.promise, self._18);
      }
      return;
    }
    var ret = tryCallOne(cb, self._18);
    if (ret === IS_ERROR) {
      reject(deferred.promise, LAST_ERROR);
    } else {
      resolve(deferred.promise, ret);
    }
  });
}
function resolve(self, newValue) {
  // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
  if (newValue === self) {
    return reject(
      self,
      new TypeError('A promise cannot be resolved with itself.')
    );
  }
  if (
    newValue &&
    (typeof newValue === 'object' || typeof newValue === 'function')
  ) {
    var then = getThen(newValue);
    if (then === IS_ERROR) {
      return reject(self, LAST_ERROR);
    }
    if (
      then === self.then &&
      newValue instanceof Promise
    ) {
      self._83 = 3;
      self._18 = newValue;
      finale(self);
      return;
    } else if (typeof then === 'function') {
      doResolve(then.bind(newValue), self);
      return;
    }
  }
  self._83 = 1;
  self._18 = newValue;
  finale(self);
}

function reject(self, newValue) {
  self._83 = 2;
  self._18 = newValue;
  if (Promise._71) {
    Promise._71(self, newValue);
  }
  finale(self);
}
function finale(self) {
  if (self._75 === 1) {
    handle(self, self._38);
    self._38 = null;
  }
  if (self._75 === 2) {
    for (var i = 0; i < self._38.length; i++) {
      handle(self, self._38[i]);
    }
    self._38 = null;
  }
}

function Handler(onFulfilled, onRejected, promise){
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, promise) {
  var done = false;
  var res = tryCallTwo(fn, function (value) {
    if (done) return;
    done = true;
    resolve(promise, value);
  }, function (reason) {
    if (done) return;
    done = true;
    reject(promise, reason);
  });
  if (!done && res === IS_ERROR) {
    done = true;
    reject(promise, LAST_ERROR);
  }
}


/***/ }),
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventBus = __webpack_require__(7);
var defaultOptions = __webpack_require__(11);
var cssClass = __webpack_require__(4);

var CSS_SCOPE_CLASS_PREFIX = "css-scope__";

/**
 * A highly configurable text editor class, wrapping Quill.js
 */

var TextPad = function () {
    function TextPad(element, Quill, mycelium, options) {
        _classCallCheck(this, TextPad);

        /**
         * Mycelium namespace reference
         */
        this.mycelium = mycelium;

        /**
         * The HTML element to build the pad on
         */
        this.element = element;

        // reference from DOM
        this.element.textPad = this;

        // DOM signature
        this.element.setAttribute("mycelium-text-pad", "here");

        /**
         * Pad options
         */
        this.options = defaultOptions(options, {

            /**
             * The css scope/scopes to apply to the pad
             * @type {string/array of string}
             */
            cssScope: null,

            /**
             * Delta describing the initial content if it should
             * not be inferd from the inner HTML
             */
            initialContents: null,

            /**
             * Allowed formats
             */
            formats: null,

            /**
             * Explicit formats for the embeded tables
             */
            tableFormats: null,

            /**
             * Header settings for the pad
             */
            headers: null,

            /**
             * Header settings for the embeded tables
             */
            tableHeaders: null,

            /**
             * Is this pad used in a table cell
             * @type {Boolean}
             */
            isTableCell: false,

            /**
             * If in a table, this is the reference to the table blot
             */
            tableBlot: null,

            /**
             * If in a table, this is the reference to the table cell
             */
            tableCell: null
        });

        this.applyCssScopes();

        /**
         * Event bus for the instance
         */
        this.bus = new EventBus();
        this.on = this.bus.on.bind(this.bus);

        /**
         * Quill instance reference
         */
        this.quill = new Quill(this.element, {
            formats: this.options.formats,
            modules: {
                clipboard: {
                    matchers: __webpack_require__(12)(Quill, this.mycelium),
                    matchVisual: false
                }
            }
        });

        if (this.options.initialContents) this.quill.setContents(this.options.initialContents);

        this.quill.on("text-change", this.onTextChange.bind(this));

        this.quill.on("selection-change", this.onSelectionChange.bind(this));
    }

    /**
     * Adds css scopes to the element
     */


    _createClass(TextPad, [{
        key: "applyCssScopes",
        value: function applyCssScopes() {
            if (this.options.cssScope === null) return;

            if (typeof this.options.cssScope === "string") this.options.cssScope = [this.options.cssScope];

            for (var i = 0; i < this.options.cssScope.length; i++) {
                cssClass(this.element, CSS_SCOPE_CLASS_PREFIX + this.options.cssScope[i], true);
            }
        }

        /**
         * Returns bounds of the pad on the screen
         */

    }, {
        key: "getPadBounds",
        value: function getPadBounds() {
            var rect = this.element.getBoundingClientRect();

            var bounds = {
                left: rect.left,
                top: rect.top

                // inside a table
            };if (this.options.isTableCell) {
                var iframe = this.options.tableBlot.element;
                var parentPadElement = this.options.tableBlot.textPad.element;

                // get iframe position relative to the pad
                // (hope there's no relatively positioned element between iframe and pad)
                var iframeOffset = {
                    left: iframe.offsetLeft - parentPadElement.offsetLeft,
                    top: iframe.offsetTop - parentPadElement.offsetTop

                    // bounds relative to the iframe
                };var parentBounds = this.options.tableBlot.textPad.getPadBounds();

                bounds.left += parentBounds.left + iframeOffset.left;
                bounds.top += parentBounds.top + iframeOffset.top;
            }

            return bounds;
        }

        ///////////
        // Image //
        ///////////

        /**
         * Inserts an image into the text
         */

    }, {
        key: "insertImage",
        value: function insertImage() {
            var _this = this;

            // first let the user choose an image and upload it to the server
            this.mycelium.shroom.uploadNewSpore("image").then(function (spore) {

                // now create the embed referencing the spore
                var range = _this.quill.getSelection(true);
                _this.quill.insertText(range.index, "\n");
                _this.quill.insertEmbed(range.index + 1, "image", {
                    "@spore": spore.handle,
                    title: "A very cool image indeed."
                });
                _this.quill.setSelection(range.index + 2);
            });
        }

        ///////////////////
        // Table editing //
        ///////////////////

        /**
         * Inserts a new table at the caret location
         */

    }, {
        key: "insertTable",
        value: function insertTable() {
            // disable inside a table
            if (this.options.isTableCell) return;

            var range = this.quill.getSelection(true);
            this.quill.insertText(range.index, "\n");
            this.quill.insertEmbed(range.index + 1, "table", {});
            this.quill.setSelection(range.index + 2);
        }

        /**
         * Inserts a table row below the currently selected cell
         */

    }, {
        key: "insertTableRowBelow",
        value: function insertTableRowBelow() {
            if (this.options.isTableCell) this.options.tableBlot.insertRowBelow(this.options.tableCell);
        }

        /**
         * Inserts a table row above the currently selected cell
         */

    }, {
        key: "insertTableRowAbove",
        value: function insertTableRowAbove() {
            if (this.options.isTableCell) this.options.tableBlot.insertRowAbove(this.options.tableCell);
        }

        /**
         * Inserts a table column left of the currently selected cell
         */

    }, {
        key: "insertTableColumnLeft",
        value: function insertTableColumnLeft() {
            if (this.options.isTableCell) this.options.tableBlot.insertColumnLeft(this.options.tableCell);
        }

        /**
         * Inserts a table column right of the currently selected cell
         */

    }, {
        key: "insertTableColumnRight",
        value: function insertTableColumnRight() {
            if (this.options.isTableCell) this.options.tableBlot.insertColumnRight(this.options.tableCell);
        }

        /**
         * If in a table, this method removes the table row
         */

    }, {
        key: "removeTableRow",
        value: function removeTableRow() {
            if (this.options.isTableCell) this.options.tableBlot.removeRowAtCell(this.options.tableCell);
        }

        /**
         * If in a table, this method removes the table column
         */

    }, {
        key: "removeTableColumn",
        value: function removeTableColumn() {
            if (this.options.isTableCell) this.options.tableBlot.removeColumnAtCell(this.options.tableCell);
        }

        ///////////////////
        // Quill methods //
        ///////////////////

    }, {
        key: "getContents",
        value: function getContents() {
            return this.quill.getContents();
        }
    }, {
        key: "getText",
        value: function getText(index, length) {
            return this.quill.getText(index, length);
        }
    }, {
        key: "getSelection",
        value: function getSelection() {
            return this.quill.getSelection();
        }
    }, {
        key: "getSelectionBounds",
        value: function getSelectionBounds(index, length) {
            return this.quill.getBounds(index, length);
        }
    }, {
        key: "getLength",
        value: function getLength() {
            return this.quill.getLength();
        }
    }, {
        key: "format",
        value: function format(_format, value) {
            this.quill.format(_format, value);
        }
    }, {
        key: "getFormat",
        value: function getFormat(index, length) {
            return this.quill.getFormat(index, length);
        }
    }, {
        key: "focus",
        value: function focus() {
            this.quill.focus();
        }

        ///////////////////////////
        // Quill event listeners //
        ///////////////////////////

        /**
         * When quill text changes
         */

    }, {
        key: "onTextChange",
        value: function onTextChange() {
            this.bus.fire("text-change");
        }

        /**
         * When quill selection changes
         */

    }, {
        key: "onSelectionChange",
        value: function onSelectionChange(selection) {
            // ignore deselects
            if (selection === null) {
                // except if this pad is being deselected
                if (TextPad.activePad === this) {
                    /*
                        Active pad is not going to be set to null,
                        it shouldn't be null, really
                     */

                    // signal deselect via event
                    TextPad.bus.fire("selection-change", null, {});
                }

                return;
            }

            // update active pad
            TextPad.setActivePad(this);

            // fire an event
            TextPad.bus.fire("selection-change", selection, TextPad.getFormat());
        }

        ////////////////////
        // Static methods //
        ////////////////////

        /**
         * Change the currently active pad
         */

    }], [{
        key: "setActivePad",
        value: function setActivePad(pad) {
            if (TextPad.activePad === pad) return;

            TextPad.activePad = pad;
            TextPad.bus.fire("active-pad-change", pad);
        }

        //////////////////////
        // Static mirroring //
        //////////////////////

        /*
            Static methods reflecting isntance methods on the active pad
         */

    }, {
        key: "insertImage",
        value: function insertImage() {
            if (TextPad.activePad) TextPad.activePad.insertImage();
        }

        // table editing mirrors

    }, {
        key: "insertTable",
        value: function insertTable() {
            if (TextPad.activePad) TextPad.activePad.insertTable();
        }
    }, {
        key: "insertTableRowBelow",
        value: function insertTableRowBelow() {
            if (TextPad.activePad) TextPad.activePad.insertTableRowBelow();
        }
    }, {
        key: "insertTableRowAbove",
        value: function insertTableRowAbove() {
            if (TextPad.activePad) TextPad.activePad.insertTableRowAbove();
        }
    }, {
        key: "insertTableColumnLeft",
        value: function insertTableColumnLeft() {
            if (TextPad.activePad) TextPad.activePad.insertTableColumnLeft();
        }
    }, {
        key: "insertTableColumnRight",
        value: function insertTableColumnRight() {
            if (TextPad.activePad) TextPad.activePad.insertTableColumnRight();
        }
    }, {
        key: "removeTableRow",
        value: function removeTableRow() {
            if (TextPad.activePad) TextPad.activePad.removeTableRow();
        }
    }, {
        key: "removeTableColumn",
        value: function removeTableColumn() {
            if (TextPad.activePad) TextPad.activePad.removeTableColumn();
        }

        /**
         * Returns selection range for the active pad
         */

    }, {
        key: "getSelection",
        value: function getSelection() {
            if (!TextPad.activePad) return null;

            return TextPad.activePad.getSelection();
        }

        /**
         * Format currently active pad
         */

    }, {
        key: "format",
        value: function format(_format2, value) {
            if (TextPad.activePad) TextPad.activePad.format(_format2, value);
        }

        /**
         * Get format of currently active pad
         */

    }, {
        key: "getFormat",
        value: function getFormat() {
            if (!TextPad.activePad) return {};

            return TextPad.activePad.getFormat();
        }

        /**
         * Focus the active pad
         */

    }, {
        key: "focus",
        value: function focus() {
            if (!TextPad.activePad) return;

            TextPad.activePad.focus();
        }
    }]);

    return TextPad;
}();

/**
 * The active pad
 * Usually the last one selected, null is a very unusual state
 * (sth. like active object in Blender - there's almost always some)
 * Used to control the layout of text-styling toolbar
 */


TextPad.activePad = null;

/**
 * Shared event bus for all text pads
 *
 * Events:
 * "active-pad-change" (pad) - when the activePad value changes
 * "selection-change" (selection, format) - when the text selection changes
 */
TextPad.bus = new EventBus();
TextPad.on = TextPad.bus.on.bind(TextPad.bus);

module.exports = TextPad;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Chache for iframe blot clipboard functioning
 */
var IframeClipCache = function () {
    function IframeClipCache() {
        _classCallCheck(this, IframeClipCache);
    }

    _createClass(IframeClipCache, null, [{
        key: "generateId",
        value: function generateId() {
            return Math.random().toString(36).substring(7);
        }
    }, {
        key: "setValue",
        value: function setValue(id, value) {
            IframeClipCache.cache[id] = value;
        }
    }, {
        key: "getValue",
        value: function getValue(id) {
            if (IframeClipCache.cache[id] === undefined) return null;

            return IframeClipCache.cache[id];
        }
    }]);

    return IframeClipCache;
}();

IframeClipCache.cache = {};

module.exports = IframeClipCache;

/***/ }),
/* 7 */
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(0);
var normalizeHeaderName = __webpack_require__(40);

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
    adapter = __webpack_require__(15);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(15);
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(39)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {


function setupQuill(window) {
    var Quill = window.Quill;

    // register blots
    __webpack_require__(24)(Quill);
    __webpack_require__(25)(Quill);
    __webpack_require__(26)(Quill);
    __webpack_require__(27)(Quill);
    __webpack_require__(28)(Quill);
    __webpack_require__(29)(Quill);
}

function registerClasses(window) {
    window.mycelium.class.Shroom = __webpack_require__(35);

    if (!window.mycelium.class.widgets) window.mycelium.class.widgets = {};

    window.mycelium.class.widgets.RichText = __webpack_require__(19);

    if (!window.mycelium.class.ui) window.mycelium.class.ui = {};

    window.mycelium.class.ui.Toolbar = __webpack_require__(66);
    window.mycelium.class.ui.WindowManager = __webpack_require__(79);
}

function createShroom(window, shroomData) {
    window.mycelium.shroom = new window.mycelium.class.Shroom(window, window.document, window.mycelium, shroomData);

    window.mycelium.shroom.initialize();

    window.mycelium.shroom.initializeAutosave();
}

function initializeUI(window) {
    window.mycelium.windowManager = new window.mycelium.class.ui.WindowManager(window, window.document);

    window.mycelium.toolbar = new window.mycelium.class.ui.Toolbar(window, window.document, window.mycelium);
}

module.exports = {
    setupQuill: setupQuill,
    registerClasses: registerClasses,
    createShroom: createShroom,
    initializeUI: initializeUI
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = function (Quill) {

    var BlockEmbed = Quill.import("blots/block/embed");
    var ClipCache = __webpack_require__(6);
    var cssClass = __webpack_require__(4);

    var DIMENSION_TIMER_INTERVAL = 5000;
    var CSS_SCOPE_CLASS_PREFIX = "css-scope__";

    var IframeBlot = function (_BlockEmbed) {
        _inherits(IframeBlot, _BlockEmbed);

        function IframeBlot(element, value) {
            _classCallCheck(this, IframeBlot);

            /*
                NOTE: I'm creating custom variables even if they already
                exist on the blot, because I like consistent naming with
                the rest of my library
             */

            /**
             * The html element
             */
            var _this = _possibleConstructorReturn(this, (IframeBlot.__proto__ || Object.getPrototypeOf(IframeBlot)).call(this, element, value));

            _this.element = element;

            /**
             * ID of the clip-cache storage
             */
            _this.clipCacheId = ClipCache.generateId();

            // a tick to let Quill put the element into the DOM
            setTimeout(function () {

                // check compatibility
                if (!element.contentDocument || !element.contentWindow) {
                    console.error("iframe javascript interface not supported");
                    return;
                }

                _this.initialize();
            }, 0);
            return _this;
        }

        _createClass(IframeBlot, [{
            key: "deleteAt",
            value: function deleteAt(index, length) {
                if (this.delete) this.delete();

                _get(IframeBlot.prototype.__proto__ || Object.getPrototypeOf(IframeBlot.prototype), "deleteAt", this).call(this, index, length);
            }
        }, {
            key: "value",
            value: function value() {
                // override this
                return _get(IframeBlot.prototype.__proto__ || Object.getPrototypeOf(IframeBlot.prototype), "value", this).call(this);
            }

            ///////////////////////////
            // Custom implementation //
            ///////////////////////////

            /**
             * Initialize all necessary things
             */

        }, {
            key: "initialize",
            value: function initialize() {
                /**
                 * Parent text pad
                 */
                this.textPad = null;

                /**
                 * Document of the iframe content
                 */
                this.contentDocument = this.element.contentDocument;

                /**
                 * Window of the iframe content
                 */
                this.contentWindow = this.element.contentWindow;

                /**
                 * Body of the content document
                 */
                this.contentBody = this.contentDocument.body;

                /**
                 * Content div of the iframe
                 */
                this.contentDiv = null;

                this.getParentTextPad();

                this.setupDomAndStyles();

                this.startDimensionTimer();
            }

            /**
             * Finds the parent text pad element
             */

        }, {
            key: "getParentTextPad",
            value: function getParentTextPad() {
                // find parent widet
                var el = this.element;
                var padElement = null;

                while (el.parentElement) {
                    if (el.getAttribute("mycelium-text-pad") === "here") {
                        padElement = el;
                        break;
                    }

                    el = el.parentElement;
                }

                if (!padElement) {
                    console.error("Unable to find parent text pad!");
                    return null;
                }

                this.textPad = padElement.textPad;
            }

            /**
             * Create content document
             */

        }, {
            key: "setupDomAndStyles",
            value: function setupDomAndStyles() {
                // set iframe attributes
                this.element.setAttribute("scrolling", "no");
                this.element.setAttribute("frameborder", "0");

                // set clip-cache id
                this.element.setAttribute("mycelium-clip-cache-id", this.clipCacheId);

                // create and register content div
                this.contentBody.innerHTML = "<div></div>";
                this.contentDiv = this.contentBody.children[0];

                // remove margin and margin overflow
                this.contentBody.style.margin = "0";
                this.contentDiv.style.padding = "1px";

                this.copyCssStyles();
                this.applyCssScopes();
            }

            /**
             * Applies all CSS styles to the iframe content
             * that are in the main document body
             */

        }, {
            key: "copyCssStyles",
            value: function copyCssStyles() {
                var links = this.element.ownerDocument.querySelectorAll('link[rel="stylesheet"]');

                for (var i = 0; i < links.length; i++) {
                    var copy = this.contentDocument.createElement("link");
                    copy.setAttribute("href", links[i].getAttribute("href"));
                    copy.setAttribute("type", links[i].getAttribute("type"));
                    copy.setAttribute("rel", links[i].getAttribute("rel"));

                    this.contentDocument.body.appendChild(copy);
                }

                var styles = this.element.ownerDocument.querySelectorAll("style");

                for (var _i = 0; _i < styles.length; _i++) {
                    var _copy = this.contentDocument.createElement("style");
                    _copy.innerHTML = styles[_i].innerHTML;

                    this.contentDocument.body.appendChild(_copy);
                }
            }

            /**
             * Adds css scopes to the content div element
             */

        }, {
            key: "applyCssScopes",
            value: function applyCssScopes() {
                var scopes = this.textPad.options.cssScope;

                if (scopes === null) return;

                if (typeof scopes === "string") scopes = [scopes];

                for (var i = 0; i < scopes.length; i++) {
                    cssClass(this.contentDiv, CSS_SCOPE_CLASS_PREFIX + scopes[i], true);
                }
            }

            /**
             * Starts the dimension timer
             */

        }, {
            key: "startDimensionTimer",
            value: function startDimensionTimer() {
                var _this2 = this;

                // call the update once right after initialization
                setTimeout(function () {
                    _this2.updateDimensions();
                }, 500);

                // random offset
                setTimeout(function () {

                    // interval
                    _this2.dimensionTimerId = setInterval(function () {
                        _this2.updateDimensions();
                    }, DIMENSION_TIMER_INTERVAL);
                }, Math.random() * DIMENSION_TIMER_INTERVAL);
            }

            /**
             * Updates iframe height
             */

        }, {
            key: "updateDimensions",
            value: function updateDimensions() {
                this.element.style.height = this.contentDiv.offsetHeight + "px";
            }

            /**
             * Loads quill.js in the iframe
             * (not called by default, you have to call this yourself)
             */

        }, {
            key: "loadQuill",
            value: function loadQuill(callback) {
                var _this3 = this;

                var rootQuillScript = this.element.ownerDocument.querySelector('script[mycelium-quill-script]');

                if (!rootQuillScript) {
                    console.error("Mycelium quill script not found!");
                    return;
                }

                quillLink = this.contentDocument.createElement("script");

                quillLink.onload = function () {
                    // register blots
                    __webpack_require__(9).setupQuill(_this3.contentWindow);

                    // redirect undo and redo commands
                    var history = _this3.contentWindow.Quill.import("modules/history");
                    history.prototype.undo = function () {
                        _this3.textPad.quill.history.undo();
                    };
                    history.prototype.redo = function () {
                        _this3.textPad.quill.history.redo();
                    };

                    callback();
                };

                quillLink.src = rootQuillScript.src;
                this.contentBody.appendChild(quillLink);
            }

            /**
             * Called, when the blot is being deleted
             */

        }, {
            key: "destroy",
            value: function destroy() {
                // remove timer
                clearInterval(this.dimensionTimerId);
            }
        }]);

        return IframeBlot;
    }(BlockEmbed);

    IframeBlot.tagName = "iframe";

    return IframeBlot;
};

/***/ }),
/* 11 */
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function (Quill, mycelium) {

    return [["h1", __webpack_require__(2)(Quill)], ["h2", __webpack_require__(2)(Quill)], ["h3", __webpack_require__(2)(Quill)], ["h4", __webpack_require__(2)(Quill)], ["h5", __webpack_require__(2)(Quill)], ["h6", __webpack_require__(2)(Quill)], ["iframe", __webpack_require__(32)(Quill)], ["table", __webpack_require__(33)(Quill)], ["figure", __webpack_require__(34)(Quill, mycelium)]];
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(36);

/***/ }),
/* 14 */
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var settle = __webpack_require__(41);
var buildURL = __webpack_require__(43);
var parseHeaders = __webpack_require__(44);
var isURLSameOrigin = __webpack_require__(45);
var createError = __webpack_require__(16);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(46);

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
      var cookies = __webpack_require__(47);

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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(42);

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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 18 */
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TextPad = __webpack_require__(5);

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

        /**
         * CSS scope(s)
         */
        this.cssScope = this.element.getAttribute("mycelium-css-scope");

        try {
            this.cssScope = JSON.parse(this.cssScope);
        } catch (e) {}

        /**
         * Allowed formats
         */
        this.formats = this.element.getAttribute("mycelium-formats");

        try {
            this.formats = JSON.parse(this.formats);
        } catch (e) {}

        /**
         * Allowed table formats
         */
        this.tableFormats = this.element.getAttribute("mycelium-table-formats");

        try {
            if (this.tableFormats) this.tableFormats = JSON.parse(this.tableFormats);
        } catch (e) {}

        /**
         * Header settings
         */
        this.headers = this.element.getAttribute("mycelium-headers");

        try {
            this.headers = JSON.parse(this.headers);
        } catch (e) {}

        /**
         * Table header settings
         */
        this.tableHeaders = this.element.getAttribute("mycelium-table-headers");

        try {
            if (this.tableHeaders) this.tableHeaders = JSON.parse(this.tableHeaders);
        } catch (e) {}

        /**
         * Text pad for the actual text editing
         */
        this.pad = new TextPad(this.element, this.window.Quill, this.mycelium, {
            cssScope: this.cssScope,
            formats: this.formats,
            tableFormats: this.tableFormats,
            headers: this.headers,
            tableHeaders: this.tableHeaders
        });

        this.pad.on("text-change", this.onTextChange.bind(this));
    }

    /**
     * When pad content changes
     */


    _createClass(RichText, [{
        key: "onTextChange",
        value: function onTextChange() {
            var data = this.pad.getContents();

            // add type
            data["@type"] = "mycelium::rich-text";

            this.shroom.setData(this.key, data);
        }
    }]);

    return RichText;
}();

module.exports = RichText;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

// Use the fastest means possible to execute a task in its own turn, with
// priority over other events including IO, animation, reflow, and redraw
// events in browsers.
//
// An exception thrown by a task will permanently interrupt the processing of
// subsequent tasks. The higher level `asap` function ensures that if an
// exception is thrown by a task, that the task queue will continue flushing as
// soon as possible, but if you use `rawAsap` directly, you are responsible to
// either ensure that no exceptions are thrown from your task, or to manually
// call `rawAsap.requestFlush` if an exception is thrown.
module.exports = rawAsap;
function rawAsap(task) {
    if (!queue.length) {
        requestFlush();
        flushing = true;
    }
    // Equivalent to push, but avoids a function call.
    queue[queue.length] = task;
}

var queue = [];
// Once a flush has been requested, no further calls to `requestFlush` are
// necessary until the next `flush` completes.
var flushing = false;
// `requestFlush` is an implementation-specific method that attempts to kick
// off a `flush` event as quickly as possible. `flush` will attempt to exhaust
// the event queue before yielding to the browser's own event loop.
var requestFlush;
// The position of the next task to execute in the task queue. This is
// preserved between calls to `flush` so that it can be resumed if
// a task throws an exception.
var index = 0;
// If a task schedules additional tasks recursively, the task queue can grow
// unbounded. To prevent memory exhaustion, the task queue will periodically
// truncate already-completed tasks.
var capacity = 1024;

// The flush function processes all tasks that have been scheduled with
// `rawAsap` unless and until one of those tasks throws an exception.
// If a task throws an exception, `flush` ensures that its state will remain
// consistent and will resume where it left off when called again.
// However, `flush` does not make any arrangements to be called again if an
// exception is thrown.
function flush() {
    while (index < queue.length) {
        var currentIndex = index;
        // Advance the index before calling the task. This ensures that we will
        // begin flushing on the next task the task throws an error.
        index = index + 1;
        queue[currentIndex].call();
        // Prevent leaking memory for long chains of recursive calls to `asap`.
        // If we call `asap` within tasks scheduled by `asap`, the queue will
        // grow, but to avoid an O(n) walk for every task we execute, we don't
        // shift tasks off the queue after they have been executed.
        // Instead, we periodically shift 1024 tasks off the queue.
        if (index > capacity) {
            // Manually shift all values starting at the index back to the
            // beginning of the queue.
            for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
                queue[scan] = queue[scan + index];
            }
            queue.length -= index;
            index = 0;
        }
    }
    queue.length = 0;
    index = 0;
    flushing = false;
}

// `requestFlush` is implemented using a strategy based on data collected from
// every available SauceLabs Selenium web driver worker at time of writing.
// https://docs.google.com/spreadsheets/d/1mG-5UYGup5qxGdEMWkhP6BWCz053NUb2E1QoUTU16uA/edit#gid=783724593

// Safari 6 and 6.1 for desktop, iPad, and iPhone are the only browsers that
// have WebKitMutationObserver but not un-prefixed MutationObserver.
// Must use `global` or `self` instead of `window` to work in both frames and web
// workers. `global` is a provision of Browserify, Mr, Mrs, or Mop.

/* globals self */
var scope = typeof global !== "undefined" ? global : self;
var BrowserMutationObserver = scope.MutationObserver || scope.WebKitMutationObserver;

// MutationObservers are desirable because they have high priority and work
// reliably everywhere they are implemented.
// They are implemented in all modern browsers.
//
// - Android 4-4.3
// - Chrome 26-34
// - Firefox 14-29
// - Internet Explorer 11
// - iPad Safari 6-7.1
// - iPhone Safari 7-7.1
// - Safari 6-7
if (typeof BrowserMutationObserver === "function") {
    requestFlush = makeRequestCallFromMutationObserver(flush);

// MessageChannels are desirable because they give direct access to the HTML
// task queue, are implemented in Internet Explorer 10, Safari 5.0-1, and Opera
// 11-12, and in web workers in many engines.
// Although message channels yield to any queued rendering and IO tasks, they
// would be better than imposing the 4ms delay of timers.
// However, they do not work reliably in Internet Explorer or Safari.

// Internet Explorer 10 is the only browser that has setImmediate but does
// not have MutationObservers.
// Although setImmediate yields to the browser's renderer, it would be
// preferrable to falling back to setTimeout since it does not have
// the minimum 4ms penalty.
// Unfortunately there appears to be a bug in Internet Explorer 10 Mobile (and
// Desktop to a lesser extent) that renders both setImmediate and
// MessageChannel useless for the purposes of ASAP.
// https://github.com/kriskowal/q/issues/396

// Timers are implemented universally.
// We fall back to timers in workers in most engines, and in foreground
// contexts in the following browsers.
// However, note that even this simple case requires nuances to operate in a
// broad spectrum of browsers.
//
// - Firefox 3-13
// - Internet Explorer 6-9
// - iPad Safari 4.3
// - Lynx 2.8.7
} else {
    requestFlush = makeRequestCallFromTimer(flush);
}

// `requestFlush` requests that the high priority event queue be flushed as
// soon as possible.
// This is useful to prevent an error thrown in a task from stalling the event
// queue if the exception handled by Node.js’s
// `process.on("uncaughtException")` or by a domain.
rawAsap.requestFlush = requestFlush;

// To request a high priority event, we induce a mutation observer by toggling
// the text of a text node between "1" and "-1".
function makeRequestCallFromMutationObserver(callback) {
    var toggle = 1;
    var observer = new BrowserMutationObserver(callback);
    var node = document.createTextNode("");
    observer.observe(node, {characterData: true});
    return function requestCall() {
        toggle = -toggle;
        node.data = toggle;
    };
}

// The message channel technique was discovered by Malte Ubl and was the
// original foundation for this library.
// http://www.nonblocking.io/2011/06/windownexttick.html

// Safari 6.0.5 (at least) intermittently fails to create message ports on a
// page's first load. Thankfully, this version of Safari supports
// MutationObservers, so we don't need to fall back in that case.

// function makeRequestCallFromMessageChannel(callback) {
//     var channel = new MessageChannel();
//     channel.port1.onmessage = callback;
//     return function requestCall() {
//         channel.port2.postMessage(0);
//     };
// }

// For reasons explained above, we are also unable to use `setImmediate`
// under any circumstances.
// Even if we were, there is another bug in Internet Explorer 10.
// It is not sufficient to assign `setImmediate` to `requestFlush` because
// `setImmediate` must be called *by name* and therefore must be wrapped in a
// closure.
// Never forget.

// function makeRequestCallFromSetImmediate(callback) {
//     return function requestCall() {
//         setImmediate(callback);
//     };
// }

// Safari 6.0 has a problem where timers will get lost while the user is
// scrolling. This problem does not impact ASAP because Safari 6.0 supports
// mutation observers, so that implementation is used instead.
// However, if we ever elect to use timers in Safari, the prevalent work-around
// is to add a scroll event listener that calls for a flush.

// `setTimeout` does not call the passed callback if the delay is less than
// approximately 7 in web workers in Firefox 8 through 18, and sometimes not
// even then.

function makeRequestCallFromTimer(callback) {
    return function requestCall() {
        // We dispatch a timeout with a specified delay of 0 for engines that
        // can reliably accommodate that request. This will usually be snapped
        // to a 4 milisecond delay, but once we're flushing, there's no delay
        // between events.
        var timeoutHandle = setTimeout(handleTimer, 0);
        // However, since this timer gets frequently dropped in Firefox
        // workers, we enlist an interval handle that will try to fire
        // an event 20 times per second until it succeeds.
        var intervalHandle = setInterval(handleTimer, 50);

        function handleTimer() {
            // Whichever timer succeeds will cancel both timers and
            // execute the callback.
            clearTimeout(timeoutHandle);
            clearInterval(intervalHandle);
            callback();
        }
    };
}

// This is for `asap.js` only.
// Its name will be periodically randomized to break any code that depends on
// its existence.
rawAsap.makeRequestCallFromTimer = makeRequestCallFromTimer;

// ASAP was originally a nextTick shim included in Q. This was factored out
// into this ASAP package. It was later adapted to RSVP which made further
// amendments. These decisions, particularly to marginalize MessageChannel and
// to capture the MutationObserver implementation in a closure, were integrated
// back into ASAP proper.
// https://github.com/tildeio/rsvp.js/blob/cddf7232546a9cf858524b75cde6f9edf72620a7/lib/rsvp/asap.js

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(59)))

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var clamp = __webpack_require__(68);
var cssClass = __webpack_require__(4);
var getRefs = __webpack_require__(1);
var defaultOptions = __webpack_require__(11);

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
         * Minimizing/maximizing properties
         */
        this.minimizing = false;
        this.minimizingTimeout = null;
        this.maximizing = false;
        this.maximizingTimeout = null;

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
         * DOM element references
         */
        this.element = null;
        this.bar = null;
        this.handle = null;
        this.content = null;

        /**
         * Is the window being dragged
         */
        this.dragged = false;

        /**
         * Dragging properties
         */
        this.dragStartMousePosition = null;
        this.dragStartWindowPosition = null;

        /**
         * Dimensions, updated on updateDisplay
         */
        this.outerWidth = 0;
        this.outerHeight = 0;
        this.innerWidth = 0;
        this.innerHeight = 0;

        /**
         * Private refs, user may want to use such name for himself
         */
        this._refs = {};

        // create html stuff
        this._createDOM();

        this.updateDisplay();

        this.element.addEventListener("mousedown", this.onWindowClick.bind(this));

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
            element.innerHTML = __webpack_require__(69);

            this.element = element;
            this.bar = element.querySelector(".mc-window__bar");
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

                // cannot be closed - minimized only
                minimizeOnly: false,

                // persistency
                persistent: false,

                // name for serialization purpouses
                name: null,

                // lacks the window bar (handle)
                barless: false,

                // when created, already minimized
                minimized: false

            });

            this.minimizeOnly = options.minimizeOnly;
            this.persistent = options.persistent;
            this.name = options.name;

            // persistent windows are automatically minimizeOnly
            if (this.persistent) this.minimizeOnly = true;

            // hide minimization button if minimize only set
            // (closing button takes the action)
            if (this.minimizeOnly) this._refs.minimize.style.display = "none";

            // barless window
            if (options.barless) this.bar.style.display = "none";

            // created minimized
            if (options.minimized) {
                cssClass(this.element, "mc-window--minimized", true);
                this.element.style.display = "none";
                this.minimized = true;
            }
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

            // get dimensions
            this.outerWidth = this.element.clientWidth;
            this.outerHeight = this.element.clientHeight;
            this.innerWidth = this.content.clientWidth;
            this.innerHeight = this.content.clientHeight;
        }

        /**
         * Minimize the window
         */

    }, {
        key: "minimize",
        value: function minimize() {
            var _this = this;

            if (this.minimizing || this.minimized) return;

            // if maximizing, remove the timeout and override
            if (this.maximizing) {
                this.maximizing = false;
                clearTimeout(this.maximizingTimeout);
            }

            this.minimizing = true;

            cssClass(this.element, "mc-window--minimized", true);

            this.minimizingTimeout = setTimeout(function () {
                _this.element.style.display = "none";

                _this.minimized = true;
                _this.minimizing = false;
            }, MINIMIZATION_DELAY);
        }

        /**
         * Maximize the window
         */

    }, {
        key: "maximize",
        value: function maximize() {
            var _this2 = this;

            if (this.maximizing || !this.minimized && !this.minimizing) return;

            // if minimizing, remove the timeout and override
            if (this.minimizing) {
                this.minimizing = false;
                clearTimeout(this.minimizingTimeout);
            }

            this.maximizing = true;

            this.element.style.display = "block";

            this.maximizingTimeout = setTimeout(function () {
                cssClass(_this2.element, "mc-window--minimized", false);

                _this2.minimized = false;
                _this2.maximizing = false;
            }, 0);
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
         * Moves the window to a new position
         */

    }, {
        key: "moveTo",
        value: function moveTo(x, y) {
            this.position.x = x;
            this.position.y = y;
            this.updateDisplay();
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


        /**
         * Focus the widnow
         */

    }, {
        key: "focus",
        value: function focus() {
            this.windowManager.focus(this);
        }

        /////////////////////
        // Event listeners //
        /////////////////////

    }, {
        key: "onWindowClick",
        value: function onWindowClick() {
            this.focus();
        }
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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(23);
module.exports = __webpack_require__(80);


/***/ }),
/* 23 */
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

/////////////////////////////
// Register initialization //
/////////////////////////////

window.mycelium.initialization = __webpack_require__(9);

/***/ }),
/* 24 */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = function (Quill) {

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
    BoldBlot.tagName = "b";

    Quill.register(BoldBlot);
};

/***/ }),
/* 25 */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = function (Quill) {

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
    ItalicBlot.tagName = "i";

    Quill.register(ItalicBlot);
};

/***/ }),
/* 26 */
/***/ (function(module, exports) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = function (Quill) {

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
    HeaderBlot.tagName = ["H1", "H2", "H3", "H4", "H5", "H6"];

    Quill.register(HeaderBlot);
};

/***/ }),
/* 27 */
/***/ (function(module, exports) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = function (Quill) {

    var Inline = Quill.import("blots/inline");

    var LinkBlot = function (_Inline) {
        _inherits(LinkBlot, _Inline);

        function LinkBlot() {
            _classCallCheck(this, LinkBlot);

            return _possibleConstructorReturn(this, (LinkBlot.__proto__ || Object.getPrototypeOf(LinkBlot)).apply(this, arguments));
        }

        _createClass(LinkBlot, null, [{
            key: "create",
            value: function create(value) {
                var node = _get(LinkBlot.__proto__ || Object.getPrototypeOf(LinkBlot), "create", this).call(this);
                node.setAttribute("href", value);
                node.setAttribute("target", "_blank");
                return node;
            }
        }, {
            key: "formats",
            value: function formats(node) {
                return node.getAttribute("href");
            }
        }]);

        return LinkBlot;
    }(Inline);

    LinkBlot.blotName = "link";
    LinkBlot.tagName = "a";

    Quill.register(LinkBlot);
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = function (Quill) {

    var getRefs = __webpack_require__(1);
    var IframeBlot = __webpack_require__(10)(Quill);
    var ClipCache = __webpack_require__(6);

    var ImageBlot = function (_IframeBlot) {
        _inherits(ImageBlot, _IframeBlot);

        function ImageBlot(element, value) {
            _classCallCheck(this, ImageBlot);

            /**
             * Data object in shroom
             */
            var _this = _possibleConstructorReturn(this, (ImageBlot.__proto__ || Object.getPrototypeOf(ImageBlot)).call(this, element, value));

            _this.data = value;

            /**
             * Flag
             */
            _this.initialized = false;
            return _this;
        }

        _createClass(ImageBlot, [{
            key: "initialize",
            value: function initialize() {
                var _this2 = this;

                _get(ImageBlot.prototype.__proto__ || Object.getPrototypeOf(ImageBlot.prototype), "initialize", this).call(this);

                // set iframe body class
                this.contentBody.className = "mc-ql-image-blot__content";

                this.createDOM();

                this.loadQuill(function () {

                    _this2.updateDimensions();

                    _this2.initialized = true;
                });
            }
        }, {
            key: "createDOM",
            value: function createDOM() {
                this.contentDiv.innerHTML = "\n            <figure>\n                <img ref=\"img\">\n                <figcaption ref=\"title\"></figcaption>\n            </figure>\n        ";

                // get image reference
                var refs = getRefs(this.contentDiv);

                // if spore
                if (this.data["@spore"]) {
                    var spore = this.textPad.mycelium.shroom.spores[this.data["@spore"]];

                    if (spore) refs.img.src = spore.url;
                }
                // else if url
                else if (this.data.url) {
                        refs.img.src = this.data.url;
                    }

                refs.title.innerText = this.data.title;
            }

            /**
             * Trigger shroom data update
             */

        }, {
            key: "triggerShroomUpdate",
            value: function triggerShroomUpdate() {
                // tell pad that a change occured
                // (trigger text-change event)
                this.textPad.quill.insertText(0, "");
            }

            /**
             * Returns quill delta value
             */

        }, {
            key: "value",
            value: function value() {
                // returned value
                var out = void 0;

                // if not initialized yet, return the initial value
                if (!this.initialized) {
                    out = { image: this.data };
                }

                // otherwise get the value
                else {
                        var value = this.data;

                        out = {
                            image: value
                        };
                    }

                // save value to clip-cache
                ClipCache.setValue(this.clipCacheId, out);

                return out;
            }
        }]);

        return ImageBlot;
    }(IframeBlot);

    ImageBlot.blotName = "image";
    ImageBlot.className = "mc-ql-image-blot";

    Quill.register(ImageBlot);
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = function (Quill) {

    var getRefs = __webpack_require__(1);
    var TableRow = __webpack_require__(30);
    var IframeBlot = __webpack_require__(10)(Quill);
    var ClipCache = __webpack_require__(6);

    var TableBlot = function (_IframeBlot) {
        _inherits(TableBlot, _IframeBlot);

        function TableBlot(element, value) {
            _classCallCheck(this, TableBlot);

            /**
             * Initial blot value
             */
            var _this = _possibleConstructorReturn(this, (TableBlot.__proto__ || Object.getPrototypeOf(TableBlot)).call(this, element, value));

            _this.initialValue = value;

            /**
             * Flag
             */
            _this.initialized = false;
            return _this;
        }

        _createClass(TableBlot, [{
            key: "initialize",
            value: function initialize() {
                var _this2 = this;

                _get(TableBlot.prototype.__proto__ || Object.getPrototypeOf(TableBlot.prototype), "initialize", this).call(this);

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

                this.createDOM();

                this.loadQuill(function () {

                    _this2.loadFromInitialValue();

                    // if still empty, setup initial table
                    if (_this2.rows.length <= 0) _this2.createInitialTable();

                    _this2.updateDimensions();

                    _this2.initialized = true;
                });
            }
        }, {
            key: "createDOM",
            value: function createDOM() {
                this.contentDiv.innerHTML = "\n            <div class=\"mc-ql-table-blot__table\">\n                <table>\n                    <tbody ref=\"table\">\n                    </tbody>\n                </table>\n            </div>\n        ";

                // get table reference
                var refs = getRefs(this.contentDiv);
                this.tableElement = refs.table;
            }

            /**
             * Process the initial value, setup the table
             */

        }, {
            key: "loadFromInitialValue",
            value: function loadFromInitialValue() {
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
                // tell pad that a change occured
                // (trigger text-change event)
                this.textPad.quill.insertText(0, "");
            }

            /**
             * Sets up the initial table layout
             */

        }, {
            key: "createInitialTable",
            value: function createInitialTable() {
                // create a 2x2 table
                for (var i = 0; i < 2; i++) {
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
             * Returns quill delta value
             */

        }, {
            key: "value",
            value: function value() {
                // returned value
                var out = void 0;

                // if not initialized yet, return the initial value
                if (!this.initialized) {
                    out = { table: this.initialValue };
                }

                // otherwise get the value
                else {
                        var rows = this.rows.map(function (row) {
                            return row.cells.map(function (cell) {
                                // convert delta to object
                                return {
                                    ops: cell.textPad.getContents().ops
                                };
                            });
                        });

                        var value = {
                            "rows": rows
                        };

                        out = {
                            table: value
                        };
                    }

                // save value to clip-cache
                ClipCache.setValue(this.clipCacheId, out);

                return out;
            }

            ///////////////////
            // Table editing //
            ///////////////////

            /*
                Like more UI-like
             */

        }, {
            key: "insertRowBelow",
            value: function insertRowBelow(cell) {
                this.addRow(cell.element.parentElement.children.length, cell.getPosition().row + 1);
            }
        }, {
            key: "insertRowAbove",
            value: function insertRowAbove(cell) {
                this.addRow(cell.element.parentElement.children.length, cell.getPosition().row);
            }
        }, {
            key: "insertColumnLeft",
            value: function insertColumnLeft(cell) {
                this.addColumn(cell.getPosition().column);
            }
        }, {
            key: "insertColumnRight",
            value: function insertColumnRight(cell) {
                this.addColumn(cell.getPosition().column + 1);
            }
        }, {
            key: "removeRowAtCell",
            value: function removeRowAtCell(cell) {
                var pos = cell.getPosition();
                this.removeRow(pos.row);

                if (pos.row >= 0 && pos.row < this.rows.length) this.rows[pos.row].cells[pos.column].focus();
            }
        }, {
            key: "removeColumnAtCell",
            value: function removeColumnAtCell(cell) {
                var pos = cell.getPosition();
                this.removeColumn(pos.column);

                if (pos.column >= 0 && pos.column < this.rows[pos.row].cells.length) this.rows[pos.row].cells[pos.column].focus();
            }
        }]);

        return TableBlot;
    }(IframeBlot);

    TableBlot.blotName = "table";
    TableBlot.className = "mc-ql-table-blot";

    Quill.register(TableBlot);
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TableCell = __webpack_require__(31);

var TableRow = function () {
    function TableRow(tableBlot, contents) {
        _classCallCheck(this, TableRow);

        /**
         * Table object reference
         */
        this.tableBlot = tableBlot;

        /**
         * Cells in the row
         */
        this.cells = [];

        /**
         * Table row html element
         */
        this.element = this.tableBlot.contentDocument.createElement("tr");

        // Content specified as a number of empty cell
        if (typeof contents === "number") {
            for (var i = 0; i < contents; i++) {
                this.addCell();
            }
        }

        // content specified as an array of deltas, each for a single cell
        else if (contents instanceof Array) {
                for (var _i = 0; _i < contents.length; _i++) {
                    this.addCell(undefined, contents[_i]);
                }
            }
    }

    /**
     * Add new cell at a given index (or the end if undefined)
     */


    _createClass(TableRow, [{
        key: "addCell",
        value: function addCell(at, deltaContents) {
            var cell = new TableCell(this.tableBlot, deltaContents);

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

            for (var i = 0; i < this.cells.length; i++) {
                this.cells[i].remove();
            }
        }
    }]);

    return TableRow;
}();

module.exports = TableRow;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TextPad = __webpack_require__(5);

var TableCell = function () {
    function TableCell(tableBlot, deltaContents) {
        _classCallCheck(this, TableCell);

        /**
         * Table object reference
         */
        this.tableBlot = tableBlot;

        /**
         * Cell html element
         */
        this.element = this.tableBlot.contentDocument.createElement("td");

        /**
         * Cell text pad instance
         */
        this.textPad = new TextPad(this.element, this.tableBlot.contentWindow.Quill, this.tableBlot.textPad.mycelium, {
            cssScope: null, // scopes are is set in the blot
            initialContents: deltaContents,

            formats: this.getFormatsForCell(),
            tableFormats: [],
            headers: this.getHeadersForCell(),
            tableHeaders: null,

            isTableCell: true,
            tableBlot: this.tableBlot,
            tableCell: this
        });

        // bind events
        this.textPad.on("text-change", this.onPadTextChange.bind(this));
    }

    /**
     * Prepare formats for the cell
     */


    _createClass(TableCell, [{
        key: "getFormatsForCell",
        value: function getFormatsForCell() {
            // get parent formats
            var formats = this.tableBlot.textPad.options.formats.slice();

            // explicit format overriding
            if (this.tableBlot.textPad.options.tableFormats) return this.tableBlot.textPad.options.tableFormats;

            // remove formats not listed in config
            for (var i = 0; i < formats.length; i++) {
                if (this.tableBlot.textPad.mycelium.config["rich-text"]["table-formats"].indexOf(formats[i]) === -1) {
                    formats.splice(i, 1);
                    i--;
                }
            }

            return formats;
        }

        /**
         * Prepare header settings for the cell
         */

    }, {
        key: "getHeadersForCell",
        value: function getHeadersForCell() {
            // if some overriding takes place
            if (this.tableBlot.textPad.options.tableHeaders) return this.tableBlot.textPad.options.tableHeaders;

            // otherwise just use the parent settings
            return this.tableBlot.textPad.options.headers;
        }

        /**
         * Called when the pad content changes
         */

    }, {
        key: "onPadTextChange",
        value: function onPadTextChange() {
            // update iframe dimensions
            this.tableBlot.updateDimensions();

            // a change has happened
            this.tableBlot.triggerShroomUpdate();
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
         * Focus this cell
         */

    }, {
        key: "focus",
        value: function focus() {
            this.textPad.focus();
        }

        /**
         * Remove the cell from table
         */

    }, {
        key: "remove",
        value: function remove() {
            // if pad active, remove
            if (TextPad.activePad === this.textPad) TextPad.setActivePad(null);

            // remove from dom
            this.element.remove();
        }
    }]);

    return TableCell;
}();

module.exports = TableCell;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function (Quill) {

    var ClipCache = __webpack_require__(6);

    /**
     * Matches any iframe blot - used to enable copy-paste on iframe blots
     */
    function IframeMatcher(element, delta) {
        var id = element.getAttribute("mycelium-clip-cache-id");

        return {
            ops: [{
                insert: ClipCache.getValue(id)
            }]
        };
    }

    return IframeMatcher;
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function (Quill) {

    /**
     * A rather awful way to convert html to delta, but works
     */
    function htmlToDelta(document, html) {
        var element = document.createElement("div");

        element.innerHTML = html;

        var quill = new Quill(element, {
            formats: null, // all
            modules: {
                clipboard: {
                    matchers: __webpack_require__(12)(Quill),
                    matchVisual: false
                }
            }
        });

        return quill.getContents();
    }

    function TableMatcher(element, delta) {
        // obtain any document instance
        // (for element creation later on)
        if (!element.ownerDocument) console.error("ownerDocument property not supported");

        var documentInstance = element.ownerDocument;

        // row deltas and row elements
        var rows = [];
        var rowElements = element.querySelectorAll("tr");

        // for all rows
        for (var i = 0; i < rowElements.length; i++) {
            var row = [];
            var cellElements = rowElements[i].querySelectorAll("td, th");

            // for all cells
            for (var j = 0; j < cellElements.length; j++) {
                row.push(htmlToDelta(documentInstance, cellElements[j].innerHTML));
            }rows.push(row);
        }

        // return the full delta
        return {
            ops: [{
                insert: {
                    table: {
                        rows: rows
                    }
                }
            }]
        };
    }

    return TableMatcher;
};

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = function (Quill, mycelium) {

    function ImageMatcher(element, delta) {
        var img = element.querySelector("img");
        var figcaption = element.querySelector("figcaption");

        var url = img.src;
        var spore = img.getAttribute("mycelium-spore");
        var title = figcaption.innerText;

        // return the full delta
        return {
            ops: [{
                insert: {
                    image: {
                        url: url,
                        "@spore": spore,
                        title: title
                    }
                }
            }]
        };
    }

    return ImageMatcher;
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var axios = __webpack_require__(13);
var TextWidget = __webpack_require__(55);
var RichTextWidget = __webpack_require__(19);
var ImageWidget = __webpack_require__(85);
var AspectImageWidget = __webpack_require__(86);
var EventBus = __webpack_require__(7);
var SporeUploader = __webpack_require__(56);

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

        /**
         * Setup event bus
         */
        this.bus = new EventBus();
        this.on = this.bus.on.bind(this.bus);

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

        /**
         * Flag that prevents uploading when an upload still takes place
         * @type {Boolean}
         */
        this.uploadInProgress = false;
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
            this.spores = data.spores;

            this.url = data.url;

            // if the provided data is empty, it's serialized
            // in php as [] instead of {}
            if (this.data instanceof Array) this.data = {};
        }

        /**
         * This is initialization just like in constructor, but now
         * the shroom instance is bound to the mycelium namespace
         * so the code inside this method can access it
         */

    }, {
        key: "initialize",
        value: function initialize() {
            // create instances of all widgets
            this.createWidgetInstances();

            // initializeAutosave() has to be called externally
            // depending on the usecase (e.g. you don't want
            // autosave when testing)
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

            this.widgets = this.widgets.concat(ImageWidget.createInstances(this.window, this.document, this));

            this.widgets = this.widgets.concat(AspectImageWidget.createInstances(this.window, this.document, this));
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
        // Spores //
        ////////////

        /**
         * User selects a file and it will be uploaded as a new spore
         * Spore handle is returned in the promise
         * @param {string} type Type of the spore handler
         */

    }, {
        key: "uploadNewSpore",
        value: function uploadNewSpore(type) {
            var _this = this;

            if (this.uploadInProgress) return;

            this.uploadInProgress = true;

            var progress = function progress(state) {
                _this.mycelium.toolbar.setUploadBarState(state);
            };

            // open file dialog
            return SporeUploader.fileDialog(this.document)

            // upload the spore
            .then(function (file) {
                return SporeUploader.upload(file, type, progress);
            })

            // catch errors
            .catch(function (error) {
                _this.uploadInProgress = false;
                console.error(error);
            })

            // register the spore
            .then(function (spore) {
                return new Promise(function (resolve, reject) {
                    _this.spores[spore.handle] = spore;
                    _this.uploadInProgress = false;
                    progress(null);
                    resolve(spore);
                });
            });
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
            var _this2 = this;

            this.saving = true;
            this.saved = true;

            this.bus.fire("saving");

            if (this.savingTimerId !== null) {
                clearTimeout(this.savingTimerId);
                this.savingTimerId = null;
            }

            var promise = axios.post(this.window.location.href, {
                data: this.data
            }).then(function (response) {
                _this2.saving = false;
                _this2.afterSave();
            });

            // return the promise in case someone would
            // want to wait for the save end
            return promise;
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

            this.bus.fire("unsaved");

            if (this.autosaveEnabled) this.scheduleAutosave();
        }

        /**
         * Called after a successful save() execution
         */

    }, {
        key: "afterSave",
        value: function afterSave() {
            this.bus.fire("saved");

            // changes were made during saving
            if (!this.saved) this.scheduleAutosave();
        }
    }]);

    return Shroom;
}();

module.exports = Shroom;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var bind = __webpack_require__(14);
var Axios = __webpack_require__(38);
var defaults = __webpack_require__(8);

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
axios.Cancel = __webpack_require__(18);
axios.CancelToken = __webpack_require__(53);
axios.isCancel = __webpack_require__(17);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(54);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 37 */
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
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(8);
var utils = __webpack_require__(0);
var InterceptorManager = __webpack_require__(48);
var dispatchRequest = __webpack_require__(49);
var isAbsoluteURL = __webpack_require__(51);
var combineURLs = __webpack_require__(52);

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
/* 39 */
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
/* 40 */
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
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(16);

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
/* 42 */
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
/* 43 */
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
/* 44 */
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
/* 45 */
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
/* 46 */
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
/* 47 */
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
/* 48 */
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
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var transformData = __webpack_require__(50);
var isCancel = __webpack_require__(17);
var defaults = __webpack_require__(8);

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
/* 50 */
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
/* 51 */
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
/* 52 */
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
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(18);

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
/* 54 */
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
/* 55 */
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
            var data = {
                "@type": "mycelium::rich-text",
                "ops": [{ "insert": this.getText() + "\n" }]
            };

            this.shroom.setData(this.key, data);
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
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Promise = __webpack_require__(57);
var axios = __webpack_require__(13);

var PART_SIZE = 1024 * 1024; // 1 MB

/**
 * Handles spore upload by parts
 */

var SporeUploader = function () {
    function SporeUploader() {
        _classCallCheck(this, SporeUploader);
    }

    _createClass(SporeUploader, null, [{
        key: "upload",

        /**
         * Perform the upload
         * @param {File} file The file to be uploaded
         * @param {string} type Spore handler type
         */
        value: function upload(file, type, progress) {
            if (!progress) progress = function progress() {};

            return new Promise(function (resolve, reject) {

                var partCount = Math.ceil(file.size / PART_SIZE);
                var currentPart = -1;
                var uploadId = Math.random().toString(36).substring(2);

                // closure for the upload (to make it able to access the context)
                // argument is the returned spore object from the last part upload
                var uploadNextPart = function uploadNextPart(spore) {

                    currentPart += 1;

                    progress((currentPart + 1) / partCount);

                    // last part has been send
                    if (currentPart >= partCount) {
                        console.warn("Upload done, handle: " + spore.handle);
                        progress(1);
                        resolve(spore);
                        return;
                    }

                    // part boundaries
                    var start = currentPart * PART_SIZE;
                    var end = (currentPart + 1) * PART_SIZE;

                    if (end > file.size) end = file.size;

                    // upload the part
                    SporeUploader.uploadFilePart(file, type, start, end, currentPart, partCount, uploadId).then(function (spore) {
                        uploadNextPart(spore);
                    });
                };

                // start uploading
                console.warn("Starting spore upload... " + uploadId);
                progress(0);
                uploadNextPart(null);
            });
        }

        /**
         * Private method for uploading a part of a file
         */

    }, {
        key: "uploadFilePart",
        value: function uploadFilePart(file, type, start, end, partIndex, partCount, uploadId) {
            return new Promise(function (resolve, reject) {

                var formData = new FormData();

                // file content and name
                formData.append("resource", file.slice(start, end, file.type), file.name);

                // spore type (handler)
                formData.append("type", type);

                // part information
                formData.append("partIndex", partIndex);
                formData.append("partCount", partCount);

                // id of the upload
                formData.append("uploadId", uploadId);

                console.warn("Uploading part " + partIndex + "/" + partCount);

                axios({
                    method: "post",
                    url: "upload-resource",
                    data: formData,
                    config: { headers: { "Content-Type": "multipart/form-data" } }
                }).then(function (response) {
                    if (response.data.success !== true) {
                        console.error(response.data.message);
                        reject(response.data.message);
                    }

                    resolve(response.data.spore);
                }).catch(function (error) {
                    console.error(error);
                    reject(error);
                });
            });
        }

        /**
         * Shows the file dialog and lets the user choose a file
         * @param {Document} document DOM Document object
         */

    }, {
        key: "fileDialog",
        value: function fileDialog(document) {
            return new Promise(function (resolve, reject) {

                // create a file input element
                var fileInput = document.createElement("input");
                fileInput.type = "file";

                // register change handler
                fileInput.onchange = function () {

                    // allow only a single file
                    if (fileInput.files.length != 1) reject();

                    resolve(fileInput.files[0]);
                };

                // open the dialog
                fileInput.click();
            });
        }
    }]);

    return SporeUploader;
}();

module.exports = SporeUploader;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(58)


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(3);
__webpack_require__(60);
__webpack_require__(61);
__webpack_require__(62);
__webpack_require__(63);
__webpack_require__(65);


/***/ }),
/* 59 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Promise = __webpack_require__(3);

module.exports = Promise;
Promise.prototype.done = function (onFulfilled, onRejected) {
  var self = arguments.length ? this.then.apply(this, arguments) : this;
  self.then(null, function (err) {
    setTimeout(function () {
      throw err;
    }, 0);
  });
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Promise = __webpack_require__(3);

module.exports = Promise;
Promise.prototype['finally'] = function (f) {
  return this.then(function (value) {
    return Promise.resolve(f()).then(function () {
      return value;
    });
  }, function (err) {
    return Promise.resolve(f()).then(function () {
      throw err;
    });
  });
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//This file contains the ES6 extensions to the core Promises/A+ API

var Promise = __webpack_require__(3);

module.exports = Promise;

/* Static Functions */

var TRUE = valuePromise(true);
var FALSE = valuePromise(false);
var NULL = valuePromise(null);
var UNDEFINED = valuePromise(undefined);
var ZERO = valuePromise(0);
var EMPTYSTRING = valuePromise('');

function valuePromise(value) {
  var p = new Promise(Promise._44);
  p._83 = 1;
  p._18 = value;
  return p;
}
Promise.resolve = function (value) {
  if (value instanceof Promise) return value;

  if (value === null) return NULL;
  if (value === undefined) return UNDEFINED;
  if (value === true) return TRUE;
  if (value === false) return FALSE;
  if (value === 0) return ZERO;
  if (value === '') return EMPTYSTRING;

  if (typeof value === 'object' || typeof value === 'function') {
    try {
      var then = value.then;
      if (typeof then === 'function') {
        return new Promise(then.bind(value));
      }
    } catch (ex) {
      return new Promise(function (resolve, reject) {
        reject(ex);
      });
    }
  }
  return valuePromise(value);
};

Promise.all = function (arr) {
  var args = Array.prototype.slice.call(arr);

  return new Promise(function (resolve, reject) {
    if (args.length === 0) return resolve([]);
    var remaining = args.length;
    function res(i, val) {
      if (val && (typeof val === 'object' || typeof val === 'function')) {
        if (val instanceof Promise && val.then === Promise.prototype.then) {
          while (val._83 === 3) {
            val = val._18;
          }
          if (val._83 === 1) return res(i, val._18);
          if (val._83 === 2) reject(val._18);
          val.then(function (val) {
            res(i, val);
          }, reject);
          return;
        } else {
          var then = val.then;
          if (typeof then === 'function') {
            var p = new Promise(then.bind(val));
            p.then(function (val) {
              res(i, val);
            }, reject);
            return;
          }
        }
      }
      args[i] = val;
      if (--remaining === 0) {
        resolve(args);
      }
    }
    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

Promise.reject = function (value) {
  return new Promise(function (resolve, reject) {
    reject(value);
  });
};

Promise.race = function (values) {
  return new Promise(function (resolve, reject) {
    values.forEach(function(value){
      Promise.resolve(value).then(resolve, reject);
    });
  });
};

/* Prototype Methods */

Promise.prototype['catch'] = function (onRejected) {
  return this.then(null, onRejected);
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// This file contains then/promise specific extensions that are only useful
// for node.js interop

var Promise = __webpack_require__(3);
var asap = __webpack_require__(64);

module.exports = Promise;

/* Static Functions */

Promise.denodeify = function (fn, argumentCount) {
  if (
    typeof argumentCount === 'number' && argumentCount !== Infinity
  ) {
    return denodeifyWithCount(fn, argumentCount);
  } else {
    return denodeifyWithoutCount(fn);
  }
};

var callbackFn = (
  'function (err, res) {' +
  'if (err) { rj(err); } else { rs(res); }' +
  '}'
);
function denodeifyWithCount(fn, argumentCount) {
  var args = [];
  for (var i = 0; i < argumentCount; i++) {
    args.push('a' + i);
  }
  var body = [
    'return function (' + args.join(',') + ') {',
    'var self = this;',
    'return new Promise(function (rs, rj) {',
    'var res = fn.call(',
    ['self'].concat(args).concat([callbackFn]).join(','),
    ');',
    'if (res &&',
    '(typeof res === "object" || typeof res === "function") &&',
    'typeof res.then === "function"',
    ') {rs(res);}',
    '});',
    '};'
  ].join('');
  return Function(['Promise', 'fn'], body)(Promise, fn);
}
function denodeifyWithoutCount(fn) {
  var fnLength = Math.max(fn.length - 1, 3);
  var args = [];
  for (var i = 0; i < fnLength; i++) {
    args.push('a' + i);
  }
  var body = [
    'return function (' + args.join(',') + ') {',
    'var self = this;',
    'var args;',
    'var argLength = arguments.length;',
    'if (arguments.length > ' + fnLength + ') {',
    'args = new Array(arguments.length + 1);',
    'for (var i = 0; i < arguments.length; i++) {',
    'args[i] = arguments[i];',
    '}',
    '}',
    'return new Promise(function (rs, rj) {',
    'var cb = ' + callbackFn + ';',
    'var res;',
    'switch (argLength) {',
    args.concat(['extra']).map(function (_, index) {
      return (
        'case ' + (index) + ':' +
        'res = fn.call(' + ['self'].concat(args.slice(0, index)).concat('cb').join(',') + ');' +
        'break;'
      );
    }).join(''),
    'default:',
    'args[argLength] = cb;',
    'res = fn.apply(self, args);',
    '}',
    
    'if (res &&',
    '(typeof res === "object" || typeof res === "function") &&',
    'typeof res.then === "function"',
    ') {rs(res);}',
    '});',
    '};'
  ].join('');

  return Function(
    ['Promise', 'fn'],
    body
  )(Promise, fn);
}

Promise.nodeify = function (fn) {
  return function () {
    var args = Array.prototype.slice.call(arguments);
    var callback =
      typeof args[args.length - 1] === 'function' ? args.pop() : null;
    var ctx = this;
    try {
      return fn.apply(this, arguments).nodeify(callback, ctx);
    } catch (ex) {
      if (callback === null || typeof callback == 'undefined') {
        return new Promise(function (resolve, reject) {
          reject(ex);
        });
      } else {
        asap(function () {
          callback.call(ctx, ex);
        })
      }
    }
  }
};

Promise.prototype.nodeify = function (callback, ctx) {
  if (typeof callback != 'function') return this;

  this.then(function (value) {
    asap(function () {
      callback.call(ctx, null, value);
    });
  }, function (err) {
    asap(function () {
      callback.call(ctx, err);
    });
  });
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// rawAsap provides everything we need except exception management.
var rawAsap = __webpack_require__(20);
// RawTasks are recycled to reduce GC churn.
var freeTasks = [];
// We queue errors to ensure they are thrown in right order (FIFO).
// Array-as-queue is good enough here, since we are just dealing with exceptions.
var pendingErrors = [];
var requestErrorThrow = rawAsap.makeRequestCallFromTimer(throwFirstError);

function throwFirstError() {
    if (pendingErrors.length) {
        throw pendingErrors.shift();
    }
}

/**
 * Calls a task as soon as possible after returning, in its own event, with priority
 * over other events like animation, reflow, and repaint. An error thrown from an
 * event will not interrupt, nor even substantially slow down the processing of
 * other events, but will be rather postponed to a lower priority event.
 * @param {{call}} task A callable object, typically a function that takes no
 * arguments.
 */
module.exports = asap;
function asap(task) {
    var rawTask;
    if (freeTasks.length) {
        rawTask = freeTasks.pop();
    } else {
        rawTask = new RawTask();
    }
    rawTask.task = task;
    rawAsap(rawTask);
}

// We wrap tasks with recyclable task objects.  A task object implements
// `call`, just like a function.
function RawTask() {
    this.task = null;
}

// The sole purpose of wrapping the task is to catch the exception and recycle
// the task object after its single use.
RawTask.prototype.call = function () {
    try {
        this.task.call();
    } catch (error) {
        if (asap.onerror) {
            // This hook exists purely for testing purposes.
            // Its name will be periodically randomized to break any code that
            // depends on its existence.
            asap.onerror(error);
        } else {
            // In a web browser, exceptions are not fatal. However, to avoid
            // slowing down the queue of pending tasks, we rethrow the error in a
            // lower priority turn.
            pendingErrors.push(error);
            requestErrorThrow();
        }
    } finally {
        this.task = null;
        freeTasks[freeTasks.length] = this;
    }
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Promise = __webpack_require__(3);

module.exports = Promise;
Promise.enableSynchronous = function () {
  Promise.prototype.isPending = function() {
    return this.getState() == 0;
  };

  Promise.prototype.isFulfilled = function() {
    return this.getState() == 1;
  };

  Promise.prototype.isRejected = function() {
    return this.getState() == 2;
  };

  Promise.prototype.getValue = function () {
    if (this._83 === 3) {
      return this._18.getValue();
    }

    if (!this.isFulfilled()) {
      throw new Error('Cannot get a value of an unfulfilled promise.');
    }

    return this._18;
  };

  Promise.prototype.getReason = function () {
    if (this._83 === 3) {
      return this._18.getReason();
    }

    if (!this.isRejected()) {
      throw new Error('Cannot get a rejection reason of a non-rejected promise.');
    }

    return this._18;
  };

  Promise.prototype.getState = function () {
    if (this._83 === 3) {
      return this._18.getState();
    }
    if (this._83 === -1 || this._83 === -2) {
      return 0;
    }

    return this._83;
  };
};

Promise.disableSynchronous = function() {
  Promise.prototype.isPending = undefined;
  Promise.prototype.isFulfilled = undefined;
  Promise.prototype.isRejected = undefined;
  Promise.prototype.getValue = undefined;
  Promise.prototype.getReason = undefined;
  Promise.prototype.getState = undefined;
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TextPadToolbar = __webpack_require__(67);
var LinkBlotProperties = __webpack_require__(75);
var getRefs = __webpack_require__(1);

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
            // Link blot properties
            this.linkBlotProperties = new LinkBlotProperties(window, document, this.mycelium);

            this.mycelium.windowManager.registerWindow(this.linkBlotProperties, {
                barless: true,
                minimized: true
            });

            // Toolbar
            this.richTextToolbar = new TextPadToolbar(window, document, this.mycelium, this.linkBlotProperties);

            this.mycelium.windowManager.registerWindow(this.richTextToolbar, {
                persistent: true,
                name: "TextPadToolbar"
            });
        }

        // register shroom events
        if (this.mycelium.state.editing) {
            this.mycelium.shroom.on("unsaved", this.onUnsaved.bind(this));
            this.mycelium.shroom.on("saving", this.onSavingBegin.bind(this));
            this.mycelium.shroom.on("saved", this.onSaved.bind(this));
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
            element.innerHTML = __webpack_require__(78);
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

            // initialize saving info
            if (!this.mycelium.state.editing) this.refs.savingInfo.style.display = "none";
        }

        /**
         * Initializes logout button
         */

    }, {
        key: "initializeLogoutButton",
        value: function initializeLogoutButton() {
            if (!this.mycelium.config.auth.enabled) this.refs.logout.remove();
        }

        /**
         * Sets upload bar state - 0 to 1 or null for disable
         */

    }, {
        key: "setUploadBarState",
        value: function setUploadBarState(state) {
            if (state === null) {
                this.refs.upload.style.display = "none";
                return;
            }

            this.refs.upload.style.display = "block";
            var bar = this.refs.upload.querySelector(".mc-toolbar__upload-progress-bar");
            bar.style.width = Math.ceil(state * 100) + "%";
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
    }, {
        key: "onUnsaved",
        value: function onUnsaved() {
            this.refs.savingInfo.innerText = "Unsaved changes.";
        }
    }, {
        key: "onSavingBegin",
        value: function onSavingBegin() {
            this.refs.savingInfo.innerText = "Saving...";
        }
    }, {
        key: "onSaved",
        value: function onSaved() {
            this.refs.savingInfo.innerText = "Saved.";
        }
    }]);

    return Toolbar;
}();

module.exports = Toolbar;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Window = __webpack_require__(21);
var getRefs = __webpack_require__(1);
var cssClass = __webpack_require__(4);
var Picker = __webpack_require__(70);
var Menu = __webpack_require__(72);
var TextPad = __webpack_require__(5);

var TextPadToolbar = function (_Window) {
    _inherits(TextPadToolbar, _Window);

    function TextPadToolbar(window, document, mycelium, linkBlotProperties) {
        _classCallCheck(this, TextPadToolbar);

        /**
         * Reference to the linkBlotProperties window
         */
        var _this = _possibleConstructorReturn(this, (TextPadToolbar.__proto__ || Object.getPrototypeOf(TextPadToolbar)).call(this, window, document, mycelium));

        _this.linkBlotProperties = linkBlotProperties;

        _this.buildDOM();

        _this.registerEventListeners();
        return _this;
    }

    _createClass(TextPadToolbar, [{
        key: "buildDOM",
        value: function buildDOM() {
            this.content.innerHTML = __webpack_require__(74);
            this.refs = getRefs(this.content);

            this.headerPicker = new Picker(this.document, this.refs.header, [{ key: "p", label: "Normal" }]);

            this.tableInsertMenu = new Menu(this.document, this.refs.tableInsert, "Insert", [{ key: "row-below", label: "Row below" }, { key: "row-above", label: "Row above" }, { key: "column-left", label: "Column left" }, { key: "column-right", label: "Column right" }]);

            this.tableRemoveMenu = new Menu(this.document, this.refs.tableRemove, "Remove", [{ key: "row", label: "Row" }, { key: "column", label: "Column" }]);
        }
    }, {
        key: "registerEventListeners",
        value: function registerEventListeners() {
            this.refs.bold.addEventListener("click", this.onBoldClick.bind(this));
            this.refs.italic.addEventListener("click", this.onItalicClick.bind(this));

            this.headerPicker.on("user-pick", this.onHeaderPick.bind(this));
            this.headerPicker.on("expand", this.onHeaderPickerExpand.bind(this));

            this.refs.link.addEventListener("click", this.onLinkClick.bind(this));
            this.refs.image.addEventListener("click", this.onImageClick.bind(this));

            this.refs.table.addEventListener("click", this.onTableClick.bind(this));

            this.tableInsertMenu.on("user-click", this.onTableInsertMenuClick.bind(this));
            this.tableInsertMenu.on("expand", this.onTableInsertMenuExapnd.bind(this));

            this.tableRemoveMenu.on("user-click", this.onTableRemoveMenuClick.bind(this));
            this.tableRemoveMenu.on("expand", this.onTableRemoveMenuExapnd.bind(this));

            // we listen for widget selection changes to determine
            // changes in the styling UI like bold, header etc.
            TextPad.on("active-pad-change", this.onActiveTextPadChange.bind(this));
            TextPad.on("selection-change", this.onTextPadSelectionChange.bind(this));

            // a flag
            this.selectionListenerEnabled = true;
        }

        /////////////////
        // UI altering //
        /////////////////

    }, {
        key: "onActiveTextPadChange",
        value: function onActiveTextPadChange(pad) {
            if (pad === null) return;

            // update header selection
            var options = [{ key: "p", label: "Normal" }];
            var count = 0;
            if (pad.options.headers) count = pad.options.headers.count;
            if (pad.options.formats && pad.options.formats.indexOf("header") === -1) count = 0;
            for (var i = 1; i <= count; i++) {
                options.push({ key: "h" + i, label: "Heading " + i });
            }this.headerPicker.updateOptions(options);
        }

        /**
         * When rich-text widget selection changes (any of them)
         */

    }, {
        key: "onTextPadSelectionChange",
        value: function onTextPadSelectionChange(selection, format) {
            if (!this.selectionListenerEnabled) return;

            // dont' do anything on deselect
            if (selection === null) return;

            // bold
            cssClass(this.refs.bold, "mc-rtwt__button--active", !!format.bold);

            // italic
            cssClass(this.refs.italic, "mc-rtwt__button--active", !!format.italic);

            // header
            if (format.header === false || format.header === undefined) {
                this.headerPicker.pick("p");
            } else {
                var level = format.header;

                // undo level offset
                if (TextPad.activePad.options.headers) level -= TextPad.activePad.options.headers.offset;

                this.headerPicker.pick("h" + level);
            }
        }

        /////////////////////
        // Event listeners //
        /////////////////////

    }, {
        key: "onBoldClick",
        value: function onBoldClick() {
            TextPad.format("bold", !TextPad.getFormat().bold);
        }
    }, {
        key: "onItalicClick",
        value: function onItalicClick() {
            TextPad.format("italic", !TextPad.getFormat().italic);
        }
    }, {
        key: "onHeaderPick",
        value: function onHeaderPick(key) {
            this.selectionListenerEnabled = false;

            var level = void 0;

            if (key == "p") level = false;else level = parseInt(key[1]);

            // offset level
            if (level !== false && TextPad.activePad.options.headers) level += TextPad.activePad.options.headers.offset;

            TextPad.format("header", level);

            this.selectionListenerEnabled = true;
        }
    }, {
        key: "onHeaderPickerExpand",
        value: function onHeaderPickerExpand() {
            // keep the pad focused
            TextPad.focus();
        }
    }, {
        key: "onLinkClick",
        value: function onLinkClick() {
            this.linkBlotProperties.createLink();
        }
    }, {
        key: "onImageClick",
        value: function onImageClick() {
            TextPad.insertImage();
        }

        ////////////
        // Tables //
        ////////////

    }, {
        key: "onTableClick",
        value: function onTableClick() {
            TextPad.insertTable();
        }
    }, {
        key: "onTableInsertMenuClick",
        value: function onTableInsertMenuClick(key) {
            switch (key) {
                case "row-below":
                    TextPad.insertTableRowBelow();break;
                case "row-above":
                    TextPad.insertTableRowAbove();break;
                case "column-left":
                    TextPad.insertTableColumnLeft();break;
                case "column-right":
                    TextPad.insertTableColumnRight();break;
            }

            TextPad.focus();
        }
    }, {
        key: "onTableInsertMenuExapnd",
        value: function onTableInsertMenuExapnd() {
            // keep the pad focused
            TextPad.focus();
        }
    }, {
        key: "onTableRemoveMenuClick",
        value: function onTableRemoveMenuClick(key) {
            switch (key) {
                case "row":
                    TextPad.removeTableRow();break;
                case "column":
                    TextPad.removeTableColumn();break;
            }

            TextPad.focus();
        }
    }, {
        key: "onTableRemoveMenuExapnd",
        value: function onTableRemoveMenuExapnd() {
            // keep the pad focused
            TextPad.focus();
        }
    }]);

    return TextPadToolbar;
}(Window);

module.exports = TextPadToolbar;

/***/ }),
/* 68 */
/***/ (function(module, exports) {

/**
 * Clamp a value between two bounds
 */
function clamp(x, min, max) {
    if (x < min) return min;else if (x > max) return max;else return x;
}

module.exports = clamp;

/***/ }),
/* 69 */
/***/ (function(module, exports) {

module.exports = "<div class=\"mc-window__bar\">\n    <div class=\"mc-window__handle\"></div>\n\n    <div class=\"mc-window__button\" ref=\"minimize\">\n        <svg x=\"0px\" y=\"0px\" viewBox=\"0 0 20 20\" enable-background=\"new 0 0 20 20\">\n            <path fill=\"#FFFFFF\" d=\"M4.516,7.548c0.436-0.446,1.043-0.481,1.576,0L10,11.295l3.908-3.747c0.533-0.481,1.141-0.446,1.574,0\n            c0.436,0.445,0.408,1.197,0,1.615c-0.406,0.418-4.695,4.502-4.695,4.502C10.57,13.888,10.285,14,10,14s-0.57-0.112-0.789-0.335\n            c0,0-4.287-4.084-4.695-4.502C4.107,8.745,4.08,7.993,4.516,7.548z\"/>\n        </svg>\n    </div>\n\n    <div class=\"mc-window__button\" ref=\"close\">\n        <svg x=\"0px\" y=\"0px\" viewBox=\"0 0 20 20\" enable-background=\"new 0 0 20 20\">\n            <path fill=\"#FFFFFF\" d=\"M14.348,14.849c-0.469,0.469-1.229,0.469-1.697,0L10,11.819l-2.651,3.029c-0.469,0.469-1.229,0.469-1.697,0\n            c-0.469-0.469-0.469-1.229,0-1.697l2.758-3.15L5.651,6.849c-0.469-0.469-0.469-1.228,0-1.697s1.228-0.469,1.697,0L10,8.183\n            l2.651-3.031c0.469-0.469,1.228-0.469,1.697,0s0.469,1.229,0,1.697l-2.758,3.152l2.758,3.15\n            C14.817,13.62,14.817,14.38,14.348,14.849z\"/>\n        </svg>\n    </div>\n</div>\n<div class=\"mc-window__content\">\n    <!--window content-->\n</div>";

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventBus = __webpack_require__(7);

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
            this.element.innerHTML = __webpack_require__(71);

            this.label = this.element.querySelector(".mc-picker__label");
            this.optionsElement = this.element.querySelector(".mc-picker__options");

            this.updateOptions(this.options);
        }

        /**
         * Update options to choose from
         */

    }, {
        key: "updateOptions",
        value: function updateOptions(options) {
            // update property
            this.options = options;

            // clear options
            this.optionsElement.innerHTML = "";

            // add options
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
/* 71 */
/***/ (function(module, exports) {

module.exports = "<span class=\"mc-picker\">\n    <span class=\"mc-picker__label\" data-label=\"\">\n        <svg viewBox=\"0 0 18 18\">\n            <polygon class=\"mc-picker__stroke\" points=\"7 11 9 13 11 11 7 11\"></polygon>\n            <polygon class=\"mc-picker__stroke\" points=\"7 7 9 5 11 7 7 7\"></polygon>\n        </svg>\n    </span>\n    <span class=\"mc-picker__options\" style=\"display: none\">\n    </span>\n</span>";

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventBus = __webpack_require__(7);

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
            this.element.innerHTML = __webpack_require__(73);

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
/* 73 */
/***/ (function(module, exports) {

module.exports = "<span class=\"mc-menu\">\n    <span class=\"mc-menu__label\" data-label=\"\">\n        <svg viewBox=\"0 0 18 18\">\n            <polygon class=\"mc-menu__stroke\" points=\"7 11 9 13 11 11 7 11\"></polygon>\n            <polygon class=\"mc-menu__stroke\" points=\"7 7 9 5 11 7 7 7\"></polygon>\n        </svg>\n    </span>\n    <span class=\"mc-menu__items\" style=\"display: none\">\n    </span>\n</span>";

/***/ }),
/* 74 */
/***/ (function(module, exports) {

module.exports = "<div class=\"mc-rtwt\">\n\n    <!-- set bold style -->\n    <button class=\"mc-rtwt__button\" ref=\"bold\">\n        <svg viewBox=\"0 0 18 18\">\n            <path class=\"mc-rtwt-stroke\" d=\"M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z\"></path>\n            <path class=\"mc-rtwt-stroke\" d=\"M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z\"></path>\n        </svg>\n    </button>\n\n    <!-- set italic style -->\n    <button class=\"mc-rtwt__button\" ref=\"italic\">\n        <svg viewBox=\"0 0 18 18\">\n            <line class=\"mc-rtwt-stroke\" x1=\"7\" x2=\"13\" y1=\"4\" y2=\"4\"></line>\n            <line class=\"mc-rtwt-stroke\" x1=\"5\" x2=\"11\" y1=\"14\" y2=\"14\"></line>\n            <line class=\"mc-rtwt-stroke\" x1=\"8\" x2=\"10\" y1=\"14\" y2=\"4\"></line>\n        </svg>\n    </button>\n\n    <!-- em -->\n    <!-- not yet, implemented later -->\n    <!--<button class=\"mc-rtwt__button\" ref=\"emphasis\">\n        E\n    </button>-->\n\n    <hr class=\"mc-rtwt__line\">\n\n    <!-- pick header type -->\n    <span ref=\"header\"></span>\n\n    <hr class=\"mc-rtwt__line\">\n\n    <!-- link -->\n    <button class=\"mc-rtwt__button\" ref=\"link\">\n        <svg viewBox=\"0 0 18 18\">\n            <line class=\"mc-rtwt-stroke\" x1=\"7\" x2=\"11\" y1=\"7\" y2=\"11\"></line>\n            <path class=\"mc-rtwt-stroke\" d=\"M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z\"></path>\n            <path class=\"mc-rtwt-stroke\" d=\"M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z\"></path>\n        </svg>\n    </button>\n\n    <!-- image -->\n    <button class=\"mc-rtwt__button\" ref=\"image\">\n        <svg viewBox=\"0 0 18 18\">\n            <rect class=\"mc-rtwt-stroke\" height=\"10\" width=\"12\" x=\"3\" y=\"4\"></rect>\n            <circle class=\"ql-fill\" cx=\"6\" cy=\"7\" r=\"1\"></circle>\n            <polyline class=\"ql-even ql-fill\" points=\"5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12\"></polyline>\n        </svg>\n    </button>\n\n    <hr class=\"mc-rtwt__line\">\n\n    <!-- add a table -->\n    <button class=\"mc-rtwt__button\" ref=\"table\">\n        <svg viewBox=\"0 0 26 28\">\n            <g fill=\"#444\" transform=\"scale(0.02734375 0.02734375)\">\n                <path d=\"M292.571 786.286v-109.714c0-10.286-8-18.286-18.286-18.286h-182.857c-10.286 0-18.286 8-18.286 18.286v109.714c0 10.286 8 18.286 18.286 18.286h182.857c10.286 0 18.286-8 18.286-18.286zM292.571 566.857v-109.714c0-10.286-8-18.286-18.286-18.286h-182.857c-10.286 0-18.286 8-18.286 18.286v109.714c0 10.286 8 18.286 18.286 18.286h182.857c10.286 0 18.286-8 18.286-18.286zM585.143 786.286v-109.714c0-10.286-8-18.286-18.286-18.286h-182.857c-10.286 0-18.286 8-18.286 18.286v109.714c0 10.286 8 18.286 18.286 18.286h182.857c10.286 0 18.286-8 18.286-18.286zM292.571 347.429v-109.714c0-10.286-8-18.286-18.286-18.286h-182.857c-10.286 0-18.286 8-18.286 18.286v109.714c0 10.286 8 18.286 18.286 18.286h182.857c10.286 0 18.286-8 18.286-18.286zM585.143 566.857v-109.714c0-10.286-8-18.286-18.286-18.286h-182.857c-10.286 0-18.286 8-18.286 18.286v109.714c0 10.286 8 18.286 18.286 18.286h182.857c10.286 0 18.286-8 18.286-18.286zM877.714 786.286v-109.714c0-10.286-8-18.286-18.286-18.286h-182.857c-10.286 0-18.286 8-18.286 18.286v109.714c0 10.286 8 18.286 18.286 18.286h182.857c10.286 0 18.286-8 18.286-18.286zM585.143 347.429v-109.714c0-10.286-8-18.286-18.286-18.286h-182.857c-10.286 0-18.286 8-18.286 18.286v109.714c0 10.286 8 18.286 18.286 18.286h182.857c10.286 0 18.286-8 18.286-18.286zM877.714 566.857v-109.714c0-10.286-8-18.286-18.286-18.286h-182.857c-10.286 0-18.286 8-18.286 18.286v109.714c0 10.286 8 18.286 18.286 18.286h182.857c10.286 0 18.286-8 18.286-18.286zM877.714 347.429v-109.714c0-10.286-8-18.286-18.286-18.286h-182.857c-10.286 0-18.286 8-18.286 18.286v109.714c0 10.286 8 18.286 18.286 18.286h182.857c10.286 0 18.286-8 18.286-18.286zM950.857 164.571v621.714c0 50.286-41.143 91.429-91.429 91.429h-768c-50.286 0-91.429-41.143-91.429-91.429v-621.714c0-50.286 41.143-91.429 91.429-91.429h768c50.286 0 91.429 41.143 91.429 91.429z\" />\n            </g>\n        </svg>\n    </button>\n\n    <!-- insert something to a table -->\n    <span ref=\"tableInsert\"></span>\n\n    <!-- remove something from a table -->\n    <span ref=\"tableRemove\"></span>\n</div>";

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextPopupWindow = __webpack_require__(76);
var getRefs = __webpack_require__(1);
var cssClass = __webpack_require__(4);
var TextPad = __webpack_require__(5);

var LinkBlotProperties = function (_TextPopupWindow) {
    _inherits(LinkBlotProperties, _TextPopupWindow);

    function LinkBlotProperties(window, document, mycelium) {
        _classCallCheck(this, LinkBlotProperties);

        /**
         * Is the selected link in editing mode or just viewing?
         */
        var _this = _possibleConstructorReturn(this, (LinkBlotProperties.__proto__ || Object.getPrototypeOf(LinkBlotProperties)).call(this, window, document, mycelium));

        _this.editing = false;

        /**
         * The link scheme
         */
        _this.scheme = "http";

        _this.content.innerHTML = __webpack_require__(77);
        cssClass(_this.content, "mc-lbp", true);

        _this.refs = getRefs(_this.content);

        _this.refs.edit.addEventListener("click", _this.onEditClick.bind(_this));
        _this.refs.save.addEventListener("click", _this.onSaveClick.bind(_this));
        _this.refs.remove.addEventListener("click", _this.onRemoveClick.bind(_this));

        _this.refs.editingBlock.addEventListener("submit", _this.onSaveClick.bind(_this));

        _this.refs.textbox.addEventListener("keydown", _this.onTextboxKeydown.bind(_this));
        _this.refs.textbox.addEventListener("input", _this.onTextboxInput.bind(_this));

        _this.updateDisplayedBlock();
        return _this;
    }

    /**
     * Called when new link should be added
     * (from the toolbar)
     */


    _createClass(LinkBlotProperties, [{
        key: "createLink",
        value: function createLink() {
            // get new link range
            this.interestingRange = TextPad.getSelection();
            this.interestingPad = TextPad.activePad;

            if (this.interestingRange === null) return;

            if (this.interestingRange.length === 0) return;

            // set content
            var text = this.interestingPad.getText(this.interestingRange.index, this.interestingRange.length);
            this.scheme = this.parseLinkValue(text).scheme;
            this.refs.textbox.value = text;
            this.refs.url.innerText = text;
            this.refs.url.setAttribute("href", "#");

            // switch mode
            this.editing = true;
            this.updateDisplayedBlock();

            // show
            this.showThePopup();

            // focus
            this.refs.textbox.select();
        }

        /**
         * Input is the text user types and the output is the
         * link scheme and the href content / false if empty
         */

    }, {
        key: "parseLinkValue",
        value: function parseLinkValue(value) {
            // remove scheme if present
            var withoutScheme = value.replace(/^(https?\:\/\/)|(mailto\:)|(tel\:)/, "");

            // handle emails
            if (this.isEmail(withoutScheme)) {
                return {
                    scheme: "mailto",
                    href: "mailto:" + withoutScheme
                };
            }

            // handle telephone numbers
            if (this.isTelephone(withoutScheme)) {
                return {
                    scheme: "tel",
                    href: "tel:" + withoutScheme
                };
            }

            // else handle http
            return {
                scheme: "http",
                href: "http://" + withoutScheme
            };
        }
    }, {
        key: "isEmail",
        value: function isEmail(text) {
            return !!text.match(/^\S+@\S+\.\S+$/);
        }
    }, {
        key: "isTelephone",
        value: function isTelephone(text) {
            return !!text.match(/^\+?[\d\-\s]+$/);
        }

        /**
         * Updates DOM based on mode
         */

    }, {
        key: "updateDisplayedBlock",
        value: function updateDisplayedBlock() {
            if (this.editing) {
                this.refs.editingBlock.style.display = "block";
                this.refs.viewingBlock.style.display = "none";
            } else {
                this.refs.editingBlock.style.display = "none";
                this.refs.viewingBlock.style.display = "block";
            }

            this.updatePopupPosition();

            this.updateDisplayedScheme();
        }

        /**
         * Updates the active scheme icon
         */

    }, {
        key: "updateDisplayedScheme",
        value: function updateDisplayedScheme() {
            cssClass(this.refs.httpScheme, "active", this.scheme === "http");
            cssClass(this.refs.mailtoScheme, "active", this.scheme === "mailto");
            cssClass(this.refs.telScheme, "active", this.scheme === "tel");
        }

        ///////////
        // Hooks //
        ///////////

        /**
         * Returns true, if the format is interesting
         */

    }, {
        key: "isFormatInteresting",
        value: function isFormatInteresting(format) {
            return !!format.link;
        }
    }, {
        key: "onPopupHide",
        value: function onPopupHide() {
            // switch mode
            this.editing = false;
            this.updateDisplayedBlock();
        }
    }, {
        key: "onPopupShowBySelection",
        value: function onPopupShowBySelection(format) {
            // load link into the form
            var linkValue = this.parseLinkValue(format.link);
            this.scheme = linkValue.scheme;

            this.refs.textbox.value = format.link;
            this.refs.url.innerText = format.link;
            this.refs.url.setAttribute("href", format.link);
        }

        ////////////
        // Events //
        ////////////

    }, {
        key: "onEditClick",
        value: function onEditClick() {
            this.scheme = this.parseLinkValue(this.refs.textbox.value).scheme;
            this.editing = true;
            this.updateDisplayedBlock();

            this.refs.textbox.select();
        }

        /**
         * Save click or textbox submit
         */

    }, {
        key: "onSaveClick",
        value: function onSaveClick(e) {
            // check mode
            if (!this.editing) return;

            // on submit prevent page reload
            if (e.type === "submit") e.preventDefault();

            var linkValue = this.parseLinkValue(this.refs.textbox.value);
            this.scheme = linkValue.scheme;

            // select desired range
            TextPad.focus();
            this.interestingPad.quill.setSelection(this.interestingRange.index, this.interestingRange.length);

            // update format
            this.interestingPad.format("link", linkValue.href);

            // change mode
            this.editing = false;
            this.updateDisplayedBlock();

            // forget the range
            this.interestingRange = null;
            this.interestingPad = null;
        }
    }, {
        key: "onRemoveClick",
        value: function onRemoveClick() {
            // select desired range
            TextPad.focus();
            this.interestingPad.quill.setSelection(this.interestingRange.index, this.interestingRange.length);

            // update format
            this.interestingPad.format("link", false);

            // forget the range
            this.interestingRange = null;
            this.interestingPad = null;
        }
    }, {
        key: "onTextboxInput",
        value: function onTextboxInput(e) {
            var linkValue = this.parseLinkValue(this.refs.textbox.value);
            this.scheme = linkValue.scheme;

            this.updateDisplayedScheme();
        }
    }, {
        key: "onTextboxKeydown",
        value: function onTextboxKeydown(e) {
            if (e.key === "Escape") this.onEscapeHit();
        }

        /**
         * Called when esc hit during link editing
         */

    }, {
        key: "onEscapeHit",
        value: function onEscapeHit() {
            /*
                if editing link, cancel editing
                if creating link, cancel and hide
             */

            // switch mode
            this.editing = false;
            this.updateDisplayedBlock();

            // hide window if no link under selection
            if (!this.isFormatInteresting(TextPad.getFormat())) {
                this.onPopupHide();
                this.minimize();
            }
        }
    }]);

    return LinkBlotProperties;
}(TextPopupWindow);

module.exports = LinkBlotProperties;

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Window = __webpack_require__(21);
var TextPad = __webpack_require__(5);

var TextPopupWindow = function (_Window) {
    _inherits(TextPopupWindow, _Window);

    function TextPopupWindow(window, document, mycelium) {
        _classCallCheck(this, TextPopupWindow);

        /**
         * Range where interesting text is located
         */
        var _this = _possibleConstructorReturn(this, (TextPopupWindow.__proto__ || Object.getPrototypeOf(TextPopupWindow)).call(this, window, document, mycelium));

        _this.interestingRange = null;

        /**
         * The text pad, where the interesting text is located
         */
        _this.interestingPad = null;

        window.addEventListener("mousedown", _this.onBrowserWindowClick_popupHandler.bind(_this));

        TextPad.on("selection-change", _this.onTextPadSelectionChange_popupHandler.bind(_this));
        return _this;
    }

    /**
     * Updates this.interestingRange to the currently selected one
     */


    _createClass(TextPopupWindow, [{
        key: "updateInterestingRangeToSelected",
        value: function updateInterestingRangeToSelected() {
            /*
                A format may only be selected if you have a cursor oper it
                (I mean no selection -> length = 0)
                If any selection - even if over a format, no format is selected
             */

            this.interestingPad = TextPad.activePad;

            // no pad active
            if (this.interestingPad === null) {
                this.interestingRange = null;
                return;
            }

            var selection = this.interestingPad.getSelection();

            // exclude weird selections
            if (selection === null || selection.length > 0) {
                this.interestingRange = null;
                return;
            }

            // find start
            var start = selection.index;
            while (start >= 0) {
                if (!this.isFormatInteresting(this.interestingPad.getFormat(start, 0))) break;

                start -= 1;
            }

            // document start
            if (start < 0) start = 0;

            var len = this.interestingPad.getLength();

            // find end
            var end = selection.index;
            while (end < len) {
                if (!this.isFormatInteresting(this.interestingPad.getFormat(end, 0))) break;

                end += 1;
            }

            // it overcounts
            end -= 1;

            // calculate interesting range
            this.interestingRange = {
                index: start,
                length: end - start
            };
        }

        /**
         * Shows the window at the correct position
         */

    }, {
        key: "showThePopup",
        value: function showThePopup() {
            var _this2 = this;

            // display window
            this.maximize();

            // let the window be displayed
            setTimeout(function () {

                // then update position
                _this2.updatePopupPosition();
            }, 0);
        }

        /**
         * Updates window position
         */

    }, {
        key: "updatePopupPosition",
        value: function updatePopupPosition() {
            // no text selected, this window should not even be displayed
            if (this.interestingRange === null) return;

            // get widnow display coordinates
            var textPadBound = this.interestingPad.getPadBounds();

            var selectionBounds = this.interestingPad.getSelectionBounds(this.interestingRange.index, this.interestingRange.length);

            // update width, height properties
            // (so we can access them now)
            this.updateDisplay();

            // calculate window position
            var x = textPadBound.left + selectionBounds.left + selectionBounds.width / 2 - this.outerWidth / 2;

            var y = textPadBound.top + selectionBounds.top + selectionBounds.height + 10;

            // move the window
            this.moveTo(x, y);
        }

        /**
         * Listen for browser window clicks
         * (strange name to avoid subclass name collisions)
         */

    }, {
        key: "onBrowserWindowClick_popupHandler",
        value: function onBrowserWindowClick_popupHandler(e) {
            var _this3 = this;

            // clicking inside the window doesn't hide it
            var el = e.target;
            while (el.parentElement) {
                if (el === this.element) // click was inside the window
                    return;

                el = el.parentElement;
            }

            // delay the handling slightly so that quill can take
            // action on selection change
            setTimeout(function () {

                // if user clicks into a text pad
                /*let clickInAPad = false
                for (let i = 0; i < e.path.length; i++)
                {
                    if (!e.path[i].getAttribute) // window object
                        continue
                     if (e.path[i].getAttribute("mycelium-text-pad") === "here")
                    {
                        clickInAPad = true
                        break
                    }
                }*/

                // do not hide, if a the format was selected by the click
                /*if (clickInAPad && this.isFormatInteresting(TextPad.getFormat()))
                    return*/

                /*
                    NOTE:
                    Uncommenting does fix the issue with hide on reclick,
                    but causes a problem when switching to a different
                    text pad, because of the TextPad.getFormat() call
                 */

                _this3.onPopupHide();

                _this3.minimize();
            }, 0);
        }

        /**
         * When text pad selection changes
         */

    }, {
        key: "onTextPadSelectionChange_popupHandler",
        value: function onTextPadSelectionChange_popupHandler(selection, format) {
            // dont' do anything on deselect
            if (selection === null) return;

            // if no interesting format selected, again dont do anything
            // (hide the window actually)
            // 
            // OR if the selection is not zero-length
            if (!this.isFormatInteresting(format) || selection.length > 0) {
                this.onPopupHide();

                // hide
                this.minimize();

                return;
            }

            // save the interesting range
            this.updateInterestingRangeToSelected();

            this.onPopupShowBySelection(format);
            this.showThePopup();
        }

        ///////////
        // Hooks //
        ///////////

        /*
            Override these to hook into events
            or make the shing work
         */

        /**
         * Returns true, if the format is interesting
         */

    }, {
        key: "isFormatInteresting",
        value: function isFormatInteresting(format) {
            return false;
        }
    }, {
        key: "onPopupHide",
        value: function onPopupHide() {}
    }, {
        key: "onPopupShowBySelection",
        value: function onPopupShowBySelection(format) {}
    }]);

    return TextPopupWindow;
}(Window);

module.exports = TextPopupWindow;

/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = "<div ref=\"viewingBlock\" class=\"mc-lbp__block\">\n    Visit URL: <a ref=\"url\" href=\"#\" target=\"_blank\">url here</a>\n    <span class=\"mc-lbp__spacer\"></span>\n    <a ref=\"edit\">Edit</a>\n    <span class=\"mc-lbp__bar\"></span>\n    <a ref=\"remove\">Remove</a>\n</div>\n<form ref=\"editingBlock\" class=\"mc-lbp__block\">\n    <a class=\"mc-lbp__scheme\" ref=\"httpScheme\">Web</a>\n    <a class=\"mc-lbp__scheme\" ref=\"telScheme\">Tel</a>\n    <a class=\"mc-lbp__scheme\" ref=\"mailtoScheme\">Email</a>\n    <input type=\"text\" ref=\"textbox\" placeholder=\"URL\">\n    <span class=\"mc-lbp__spacer\"></span>\n    <a ref=\"save\">Save</a>\n</form>";

/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports = "<!--\n    Icons used:\n    http://www.entypo.com/\n-->\n\n<div class=\"mc-toolbar__panel\">\n    <button class=\"mc-toolbar__button mc-toggle-edit\" ref=\"toggleEdit\">\n        <svg x=\"0px\" y=\"0px\" viewBox=\"0 0 20 20\" enable-background=\"new 0 0 20 20\">\n            <path fill=\"#000000\" d=\"M17.561,2.439c-1.442-1.443-2.525-1.227-2.525-1.227L8.984,7.264L2.21,14.037L1.2,18.799l4.763-1.01\n            l6.774-6.771l6.052-6.052C18.788,4.966,19.005,3.883,17.561,2.439z M5.68,17.217l-1.624,0.35c-0.156-0.293-0.345-0.586-0.69-0.932\n            c-0.346-0.346-0.639-0.533-0.932-0.691l0.35-1.623l0.47-0.469c0,0,0.883,0.018,1.881,1.016c0.997,0.996,1.016,1.881,1.016,1.881\n            L5.68,17.217z\"/>\n        </svg>\n    </button>\n\n    <button class=\"mc-toolbar__button mc-toggle-edit\" ref=\"richTextToolbar\">\n        <svg x=\"0px\" y=\"0px\" viewBox=\"0 0 20 20\" enable-background=\"new 0 0 20 20\">\n            <path fill=\"#000000\" d=\"M3.135,6.89c0.933-0.725,1.707-0.225,2.74,0.971c0.116,0.135,0.272-0.023,0.361-0.1\n            C6.324,7.683,7.687,6.456,7.754,6.4C7.82,6.341,7.9,6.231,7.795,6.108C7.688,5.985,7.301,5.483,7.052,5.157\n            c-1.808-2.365,4.946-3.969,3.909-3.994c-0.528-0.014-2.646-0.039-2.963-0.004C6.715,1.294,5.104,2.493,4.293,3.052\n            C3.232,3.778,2.836,4.204,2.771,4.263c-0.3,0.262-0.048,0.867-0.592,1.344C1.604,6.11,1.245,5.729,0.912,6.021\n            C0.747,6.167,0.285,6.513,0.153,6.628C0.02,6.745-0.004,6.942,0.132,7.099c0,0,1.264,1.396,1.37,1.52\n            C1.607,8.741,1.893,8.847,2.069,8.69c0.177-0.156,0.632-0.553,0.708-0.623C2.855,8.001,2.727,7.206,3.135,6.89z M8.843,7.407\n            c-0.12-0.139-0.269-0.143-0.397-0.029L7.012,8.63c-0.113,0.1-0.129,0.283-0.027,0.4l8.294,9.439c0.194,0.223,0.53,0.246,0.751,0.053\n            L17,17.709c0.222-0.195,0.245-0.533,0.052-0.758L8.843,7.407z M19.902,3.39c-0.074-0.494-0.33-0.391-0.463-0.182\n            c-0.133,0.211-0.721,1.102-0.963,1.506c-0.24,0.4-0.832,1.191-1.934,0.41c-1.148-0.811-0.749-1.377-0.549-1.758\n            c0.201-0.383,0.818-1.457,0.907-1.59c0.089-0.135-0.015-0.527-0.371-0.363c-0.357,0.164-2.523,1.025-2.823,2.26\n            c-0.307,1.256,0.257,2.379-0.85,3.494l-1.343,1.4l1.349,1.566l1.654-1.57c0.394-0.396,1.236-0.781,1.998-0.607\n            c1.633,0.369,2.524-0.244,3.061-1.258C20.057,5.792,19.977,3.884,19.902,3.39z M2.739,17.053c-0.208,0.209-0.208,0.549,0,0.758\n            l0.951,0.93c0.208,0.209,0.538,0.121,0.746-0.088l4.907-4.824L7.84,12.115L2.739,17.053z\"/>\n        </svg>\n    </button>\n</div>\n\n<hr class=\"mc-toolbar__line\">\n\n<div class=\"mc-toolbar__text\" ref=\"savingInfo\">\n    Saved\n</div>\n\n<hr class=\"mc-toolbar__line\">\n\n<div class=\"mc-toolbar__upload\" ref=\"upload\" style=\"display: none\">\n    <div class=\"mc-toolbar__upload-box\">\n        <div class=\"mc-toolbar__upload-progress-bar\"></div>\n    </div>\n</div>\n\n<hr class=\"mc-toolbar__line\">\n\n<div style=\"flex: 1\"></div>\n\n<hr class=\"mc-toolbar__line\">\n\n<div class=\"mc-toolbar__panel\">\n    <button class=\"mc-toolbar__button mc-logout\" ref=\"logout\">\n        <svg version=\"1.1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 20 20\" enable-background=\"new 0 0 20 20\">\n            <path fill=\"#000000\" d=\"M19,10l-6-5v3H6v4h7v3L19,10z M3,3h8V1H3C1.9,1,1,1.9,1,3v14c0,1.1,0.9,2,2,2h8v-2H3V3z\"/>\n        </svg>\n    </button>\n</div>";

/***/ }),
/* 79 */
/***/ (function(module, exports) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Prefix in the local storage key name for a window dream
 */
var DREAM_PREFIX = "mycelium-window-dream:";
var Z_INDEX_OFFSET = 1000;

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
         * Focus a window
         */

    }, {
        key: "focus",
        value: function focus(win) {
            var i = this.windows.indexOf(win);

            if (i == -1) return;

            if (i == this.windows.length - 1) return;

            this.windows.splice(i, 1);
            this.windows.push(win);

            this.updateZIndices();
        }

        /**
         * Updates Z-indices of all windows
         */

    }, {
        key: "updateZIndices",
        value: function updateZIndices() {
            for (var i = 0; i < this.windows.length; i++) {
                this.windows[i].element.style.zIndex = Z_INDEX_OFFSET + i;
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

            // check storage existance
            if (!this.window.localStorage) return null;

            // check storage access
            if (!(this.window.localStorage instanceof this.window.Storage)) return null;

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

            // check storage existance
            if (!this.window.localStorage) return null;

            // check storage access
            if (!(this.window.localStorage instanceof this.window.Storage)) return;

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
/* 80 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cssClass = __webpack_require__(4);

var Image = function () {
    _createClass(Image, null, [{
        key: "createInstances",
        value: function createInstances(window, document, shroom) {
            var elements = document.querySelectorAll('[mycelium-widget="image"]');
            var instances = [];

            for (var i = 0; i < elements.length; i++) {
                instances.push(new Image(window, document, elements[i], shroom));
            }return instances;
        }
    }]);

    function Image(window, document, element, shroom) {
        _classCallCheck(this, Image);

        this.window = window;
        this.document = document;

        this.element = element;

        this.shroom = shroom;
        this.key = this.element.getAttribute("mycelium-key");

        if (!this.key) throw new Error("Image widget missing 'key' attribute.");

        this.editButton = this.element.querySelector(".edit-button");
        this.image = this.element.querySelector("img");

        this.editButton.addEventListener("click", this.onEditButtonClick.bind(this));
        this.image.addEventListener("load", this.updateEmptiness.bind(this));
        this.image.addEventListener("error", this.updateEmptiness.bind(this));

        this.updateEmptiness();
    }

    /**
     * Checks if empty and updates the css class
     */


    _createClass(Image, [{
        key: "updateEmptiness",
        value: function updateEmptiness() {
            if (this.image.getAttribute("src") === "") {
                // no image set
                cssClass(this.element, "no-image", true);
            } else if (this.image.naturalWidth == 0) {
                // image set, but error while loading
                cssClass(this.element, "no-image", true);
                cssClass(this.element, "url-error", true);
            } else {
                // all fine
                cssClass(this.element, "no-image", false);
                cssClass(this.element, "url-error", false);
            }
        }

        /**
         * Updates the src tag of the image
         */

    }, {
        key: "updateImageSrc",
        value: function updateImageSrc() {
            var data = this.shroom.getData(this.key);

            if (!(data instanceof Object)) return;

            this.image.src = this.shroom.spores[data["@spore"]].url;
        }

        /**
         * When the edit button is clicked
         */

    }, {
        key: "onEditButtonClick",
        value: function onEditButtonClick() {
            var _this = this;

            this.shroom.uploadNewSpore("image").then(function (spore) {
                _this.changeSpore(spore.handle);
            });
        }

        /**
         * Change displayed spore
         */

    }, {
        key: "changeSpore",
        value: function changeSpore(sporeHandle) {
            this.shroom.setData(this.key, {
                "@type": "mycelium::image",
                "@spore": sporeHandle
            });

            this.updateImageSrc();
        }
    }]);

    return Image;
}();

module.exports = Image;

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cssClass = __webpack_require__(4);

var AspectImage = function () {
    _createClass(AspectImage, null, [{
        key: "createInstances",
        value: function createInstances(window, document, shroom) {
            var elements = document.querySelectorAll('[mycelium-widget="aspect-image"]');
            var instances = [];

            for (var i = 0; i < elements.length; i++) {
                instances.push(new AspectImage(window, document, elements[i], shroom));
            }return instances;
        }
    }]);

    function AspectImage(window, document, element, shroom) {
        _classCallCheck(this, AspectImage);

        this.window = window;
        this.document = document;

        this.element = element;

        this.shroom = shroom;
        this.key = this.element.getAttribute("mycelium-key");

        if (!this.key) throw new Error("Image widget missing 'key' attribute.");

        this.editButton = this.element.querySelector(".edit-button");
        this.sizeButton = this.element.querySelector(".size-button");
        this.image = this.element.querySelector("img");

        this.editButton.addEventListener("click", this.onEditButtonClick.bind(this));
        this.sizeButton.addEventListener("click", this.onSizeButtonClick.bind(this));
        this.image.addEventListener("load", this.updateEmptiness.bind(this));
        this.image.addEventListener("error", this.updateEmptiness.bind(this));

        /**
         * Value
         */
        this.value = {};

        this.loadValue();
        this.updateEmptiness();
    }

    /**
     * Loads the value from shroom
     */


    _createClass(AspectImage, [{
        key: "loadValue",
        value: function loadValue() {
            this.value = this.shroom.getData(this.key);

            if (!(this.value instanceof Object)) this.value = {};

            this.value["@type"] = "mycelium::image";
            this.value["size"] = this.value["size"] === "fit" ? "fit" : "fill";
        }

        /**
         * Set value into the shroom
         */

    }, {
        key: "saveValue",
        value: function saveValue() {
            this.shroom.setData(this.key, this.value);
        }

        /**
         * Checks if empty and updates the css class
         */

    }, {
        key: "updateEmptiness",
        value: function updateEmptiness() {
            if (this.image.getAttribute("src") === "") {
                // no image set
                cssClass(this.element, "no-image", true);
            } else if (this.image.naturalWidth == 0) {
                // image set, but error while loading
                cssClass(this.element, "no-image", true);
                cssClass(this.element, "url-error", true);
            } else {
                // all fine
                cssClass(this.element, "no-image", false);
                cssClass(this.element, "url-error", false);
            }
        }

        /**
         * Updates the src tag of the image
         */

    }, {
        key: "updateImageSrc",
        value: function updateImageSrc() {
            this.image.src = this.shroom.spores[this.value["@spore"]].url;
        }

        /**
         * When the edit button is clicked
         */

    }, {
        key: "onEditButtonClick",
        value: function onEditButtonClick() {
            var _this = this;

            this.shroom.uploadNewSpore("image").then(function (spore) {
                _this.value["@spore"] = spore.handle;
                _this.updateImageSrc();
                _this.saveValue();
            });
        }

        /**
         * When the size change button is clicked
         */

    }, {
        key: "onSizeButtonClick",
        value: function onSizeButtonClick() {
            this.value["size"] = this.value["size"] === "fit" ? "fill" : "fit";
            this.saveValue();

            var fitNotFill = this.value["size"] === "fit";
            var aspectRatio = this.element.clientWidth / this.element.clientHeight;
            var setWidthNotHeight = fitNotFill ? aspectRatio < 1 : aspectRatio > 1;

            if (setWidthNotHeight) {
                this.image.style.width = "100%";
                this.image.style.height = "auto";
            } else {
                this.image.style.width = "auto";
                this.image.style.height = "100%";
            }
        }
    }]);

    return AspectImage;
}();

module.exports = AspectImage;

/***/ })
/******/ ]);