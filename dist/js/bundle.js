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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/data/data.js":
/*!*****************************!*\
  !*** ./src/js/data/data.js ***!
  \*****************************/
/*! exports provided: sitesData, domElements */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sitesData\", function() { return sitesData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"domElements\", function() { return domElements; });\nconst sitesData = [\r\n    {site: \"www.solarwinds.com\", policy: \"ER_SolarWinds2\", policy_loc: \"ER_SolarWinds3\", lang: ['/de/', '/es/', '/pt/', '/fr/', '/ja/', '/ko/', '/zh/']},\r\n    {site: \"www.dameware.com\", policy: \"ER_Brandsites\", policy_loc: \"ER_Brandsites\", lang: ['/de/', '/pt/', '/fr/', '/ja/']},\r\n    {site: \"www.webhelpdesk.com\", policy: \"ER_Webhelpdesk\", policy_loc: \"ER_Webhelpdesk\", lang: ['NA']},\r\n    {site: \"www.serv-u.com\", policy: \"ER_Servu\", policy_loc: \"ER_Servu\", lang: ['NA']},\r\n    {site: \"www.kiwisyslog.com\", policy: \"ER_Kiwi\", policy_loc: \"ER_Kiwi\", lang: ['NA']},\r\n    {site: \"www.appoptics.com\", policy: \"ER_appotpics\", policy_loc: \"ER_appotpics\", lang: ['/de/', '/es/', '/pt/', '/fr/', '/ja/', '/ko/', '/zh/']},\r\n    {site: \"try.solarwinds.com\", policy: \"ER_trySolarwinds\", policy_loc: \"ER_trySolarwinds\", lang: ['NA']},\r\n    {site: \"support.solarwinds.com\", policy: \"ER_CSC_2\", policy_loc: \"ER_CSC_2\", lang: ['NA']},\r\n    {site: \"www.loggly.com\", policy: \"ER_Loggly\", policy_loc: \"ER_Loggly\", lang: ['NA']},\r\n    {site: \"www.pingdom.com\", policy: \"ER_Pingdom\", policy_loc: \"ER_Pingdom\", lang: ['NA']}\r\n];\r\n\r\nconst domElements = {\r\n    sitesSelector: document.querySelector('#redirect-domain')\r\n}\n\n//# sourceURL=webpack:///./src/js/data/data.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _data_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data/data */ \"./src/js/data/data.js\");\n/* harmony import */ var _view_redirectView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view/redirectView */ \"./src/js/view/redirectView.js\");\n\r\n \r\n\r\nwindow.addEventListener('load', e => {\r\n    _data_data__WEBPACK_IMPORTED_MODULE_0__[\"sitesData\"].forEach(e=> {_view_redirectView__WEBPACK_IMPORTED_MODULE_1__[\"fillDropDownSites\"](e.site)});\r\n});\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ }),

/***/ "./src/js/view/redirectView.js":
/*!*************************************!*\
  !*** ./src/js/view/redirectView.js ***!
  \*************************************/
/*! exports provided: fillDropDownSites */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fillDropDownSites\", function() { return fillDropDownSites; });\n/* harmony import */ var _data_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/data */ \"./src/js/data/data.js\");\n\r\n\r\nconst fillDropDownSites = (value) => {\r\n    const markup = `<option value=\"${value}\">${value}</option>`;\r\n    _data_data__WEBPACK_IMPORTED_MODULE_0__[\"domElements\"].sitesSelector.insertAdjacentHTML('beforeend', markup);\r\n}\n\n//# sourceURL=webpack:///./src/js/view/redirectView.js?");

/***/ })

/******/ });