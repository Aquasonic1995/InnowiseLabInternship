/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => {
  // webpackBootstrap
  /******/ var __webpack_modules__ = {
    /***/ "./src/index.js":
      /*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
      /***/ (
        __unused_webpack_module,
        __unused_webpack_exports,
        __webpack_require__,
      ) => {
        eval(
          "__webpack_require__(/*! ./styles.css */ \"./src/styles.css\");\nif (false) {}\nvar body = document.body;\nvar display = document.getElementById('display');\nvar clear = document.getElementById('clear');\nvar comma = document.getElementById('comma');\nvar memory = document.getElementById('memory');\nvar orangeButton = document.getElementById('orangeButton');\nvar purpleButton = document.getElementById('purpleButton');\nvar colorButton = document.getElementById('colorButton');\nvar modal = document.getElementById('modal');\nvar digits = document.querySelectorAll('.digit');\nvar operators = document.querySelectorAll('.operator');\nvar result = document.getElementById('result');\nvar percent = document.getElementById('percent');\nvar currentOperator = null;\nvar previousValue = null;\nvar isOperation = false;\nvar isResulted = false;\norangeButton.addEventListener('click', function () {\n  body.className = 'orange-theme';\n});\n\n// Event listener for Dark Theme button\npurpleButton.addEventListener('click', function () {\n  body.className = 'purple-theme';\n});\n\n// Event listener for Custom Theme button\ncolorButton.addEventListener('click', function () {\n  body.className = 'color-theme';\n});\ndigits.forEach(function (digit) {\n  digit.addEventListener('click', function () {\n    if (isResulted === true) {\n      isResulted = false;\n      display.value = '';\n    }\n    if (isOperation === true) {\n      isOperation = false;\n      display.value = '';\n    }\n    var value = digit.textContent; // Get the value from the button\n    addToDisplay(value); // Call addToDisplay with the button's value\n  });\n});\nfunction addToDisplay(input) {\n  if (display.value.length < 8) {\n    if (display.value.endsWith('.0')) {\n      display.value = display.value.slice(0, -1) + input; // Remove only the last zero\n    } else {\n      display.value += input; // Append the input to the display\n    }\n  }\n}\nclear.addEventListener('click', function () {\n  clearDisplay(); // Call clearDisplay when clicked\n});\nfunction modalOperation() {\n  display.value = display.value * -1;\n}\nmodal.addEventListener('click', function () {\n  modalOperation();\n});\noperators.forEach(function (operator) {\n  operator.addEventListener('click', function () {\n    var operatorValue = operator.textContent.trim(); // Get the operator (+, -, *, /)\n    if (isOperation === true) {\n      isOperation = false;\n      currentOperator = null;\n      previousValue = null;\n    }\n    if (previousValue === null) {\n      // Store the current display value and operator if no operation is pending\n      previousValue = parseFloat(display.value);\n      memory.textContent = \"\".concat(previousValue, \" \").concat(operatorValue);\n      currentOperator = operatorValue;\n      isOperation = true;\n    } else if (currentOperator) {\n      console.log('!!!!!');\n      // Perform the operation if one is already pending\n      var _result = performOperation(previousValue, parseFloat(display.value), currentOperator);\n      isResulted = true;\n      display.value = _result; // Show the result\n      previousValue = _result; // Update the previous value for chaining operations\n      currentOperator = operatorValue; // Update to the new operator\n      memory.textContent = \"\".concat(previousValue, \" \").concat(operatorValue); // Update memory display\n    }\n  });\n});\nfunction performOperation(a, b, operator) {\n  var result;\n  switch (operator) {\n    case '+':\n      result = a + b;\n      break;\n    case '-':\n      result = a - b;\n      break;\n    case '*':\n      result = a * b;\n      break;\n    case '/':\n      result = b !== 0 ? a / b : 'Error'; // Avoid division by zero\n      break;\n    default:\n      result = b;\n  }\n\n  // If the result is not \"Error\", trim it to 8 characters\n  if (result !== 'Error') {\n    result = trimResult(result);\n  }\n  console.log(result);\n  return result;\n}\n\n// If the result is not \"Error\", trim it to 8 characters\n\nfunction trimResult(value) {\n  if (typeof value === 'number') {\n    var stringValue = value.toString();\n    if (stringValue.length > 8) {\n      // Limit to 8 characters with rounding\n      return parseFloat(value.toPrecision(8));\n    }\n  }\n  return value; // Return as is if less than 8 characters\n}\nresult.addEventListener('click', function () {\n  if (currentOperator && previousValue !== null && display.value !== '') {\n    // Perform the operation with the stored values\n    var currentValue = parseFloat(display.value);\n    var resultValue = performOperation(previousValue, currentValue, currentOperator);\n    display.value = resultValue; // Update the display with the result\n    isResulted = true;\n    // Update memory display\n    // Reset operator and previous value for a fresh start\n    currentOperator = null;\n    previousValue = null;\n    memory.textContent = previousValue;\n    console.log('click');\n  }\n});\npercent.addEventListener('click', function () {\n  if (isOperation) {\n    isOperation = false;\n    currentOperator = null;\n    previousValue = null;\n  }\n  if (currentOperator && previousValue !== null) {\n    // If an operator is active, calculate percentage relative to previousValue\n    var currentValue = parseFloat(display.value);\n    var percentageValue = previousValue * currentValue / 100;\n    display.value = percentageValue; // Show the calculated percentage\n  } else if (display.value !== '') {\n    // Standalone percentage: Convert current value to a percentage\n    var _currentValue = parseFloat(display.value);\n    console.log(_currentValue);\n    display.value = _currentValue / 100;\n  }\n});\ncomma.addEventListener('click', function () {\n  // Ensure only one decimal point per number\n  if (!display.value.includes('.')) {\n    addToDisplay('.0'); // Append a dot (.) to the display value\n  }\n});\nfunction clearDisplay() {\n  display.value = '';\n  currentOperator = null; // Reset operator\n  previousValue = null; // Reset previous value\n}\ndocument.addEventListener('keydown', function (event) {\n  if (isResulted === true) {\n    isResulted = false;\n    display.value = '';\n  }\n  if (isOperation === true) {\n    isOperation = false;\n    display.value = '';\n  }\n  var key = event.key; // Get the key pressed\n\n  if (key >= '0' && key <= '9') {\n    // If it's a number, add it to the display\n    addToDisplay(key);\n  } else if (key === '.' || key === ',') {\n    // If it's a comma or dot, handle decimal point logic\n    if (!display.value.includes('.')) {\n      addToDisplay('.0'); // Append a dot (.) to the display value\n    }\n  } else if (['+', '-', '*', '/'].includes(key)) {\n    // If it's an operator, handle the operator logic\n    if (isOperation === true) {\n      isOperation = false;\n      currentOperator = null;\n      previousValue = null;\n    }\n    if (previousValue === null) {\n      // Store the current display value and operator if no operation is pending\n      previousValue = parseFloat(display.value);\n      memory.textContent = \"\".concat(previousValue, \" \").concat(key);\n      currentOperator = key;\n      isOperation = true;\n    } else if (currentOperator) {\n      // Perform the operation if one is already pending\n      var _result2 = performOperation(previousValue, parseFloat(display.value), currentOperator);\n      display.value = _result2; // Show the result\n      isResulted = true;\n      previousValue = _result2; // Update the previous value for chaining operations\n      currentOperator = key; // Update to the new operator\n      memory.textContent = \"\".concat(previousValue, \" \").concat(key); // Update memory display\n    }\n  } else if (key === 'Enter' || key === '=') {\n    // If it's equal (Enter), perform the calculation\n    result.click();\n  }\n});\n\n//# sourceURL=webpack://innowiselabinternship/./src/index.js?",
        );

        /***/
      },

    /***/ "./node_modules/css-loader/dist/cjs.js!./src/styles.css":
      /*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles.css ***!
  \**************************************************************/
      /***/ (module, __webpack_exports__, __webpack_require__) => {
        "use strict";
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ "./node_modules/css-loader/dist/runtime/noSourceMaps.js");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `* {\r\n    box-sizing: border-box;\r\n    padding: 0;\r\n    margin: 0;\r\n}\r\n\r\nbody {font-family:"arial";\r\n    font-size: 26px;\r\n    color: white;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    justify-content: center;\r\n    height: 100vh;\r\n    margin: 0;\r\n    user-select: none;\r\n}\r\n.calculator {position: relative;\r\n    border-radius: 20px;\r\n    background: #7D7D7D;\r\n    width: 286px;\r\n    height: 400px;\r\n    overflow: hidden;\r\n    border: 1px solid #535353;\r\n        box-shadow: 0 0 50px #535353;\r\n\r\n}\r\n.memory{\r\n    position: absolute;\r\n    right: 20px;\r\n    top: 20px;\r\n    width: 100px;\r\n    color: white;\r\n    font-size: 20px;\r\n}\r\nbody.purple-theme .calculator{\r\n    background: #325180;\r\n    box-shadow: 0 0 50px  #325180;\r\n}\r\nbody.color-theme .calculator{\r\n    background: #7EC3B0;\r\n    box-shadow: 0 0 50px   #41B3A3;\r\n}\r\n.button { display: inline-block;\r\n    line-height: 57px;\r\n    vertical-align: middle;\r\n    text-align: center;\r\n    border: 1px solid #535353;\r\n    width: 71px;\r\n\r\n}\r\n\r\n.button:active, body.purple-theme .top-button:active, body.color-theme .top-button:active,\r\nbody.purple-theme .right-button:active, body.color-theme .right-button:active {\r\n    background: green;\r\n    transform: translateY(2px);\r\n    border: none;\r\n}\r\n\r\n.keyboard{flex-wrap: wrap;\r\n    height: 300px;\r\n    display: flex;\r\n}\r\n\r\n.display { border: none;\r\n    color:white;\r\n    font-size: 50px;\r\n    text-align: right;\r\n    line-height: 19;\r\n    padding: 30px 15px  0  15px;\r\n    vertical-align: bottom;\r\nbackground: #535353;\r\n\r\n    height: 100px;\r\n    width: 100%;\r\n}\r\nbody.purple-theme .display{\r\n    background: #161C2D;\r\n}\r\nbody.color-theme .display{\r\n    background: #85CCC9;\r\n}\r\n.top-button{\r\n    background: #646464;\r\n}\r\n\r\nbody.purple-theme .top-button{\r\n    background: #202940;\r\n}\r\nbody.color-theme .top-button{\r\n    background: #41B3A3;\r\n}\r\n.right-button{\r\n    background: #FF9F0A;\r\n}\r\n\r\nbody.purple-theme .right-button{\r\n     background: #CE93D8;\r\n }\r\n\r\nbody.color-theme .right-button{\r\n    background: #E27C5F;\r\n}\r\n\r\n.zero{\r\n    width: 142px;\r\n}\r\n.styles{\r\n    left :20px;\r\n    top: 10px;\r\n    position: absolute;\r\n    width: 100px;\r\n    height: 15px;\r\n    display: flex;\r\n    gap: 10px;\r\n}\r\n.orange-style{width: 15px;\r\n    border-radius: 50px;\r\n    height: 15px;\r\n    background: darkorange;\r\n}\r\n.purple-style{\r\n    width: 15px;\r\n    height: 15px;\r\n    background: #C48D9D;\r\n    border-radius: 50px;\r\n\r\n}\r\n.color-style{\r\n    border-radius: 50px;\r\n    width: 15px;\r\n    height: 15px;\r\n    background:#E8A97C;\r\n}`, ""]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://innowiselabinternship/./src/styles.css?./node_modules/css-loader/dist/cjs.js',
        );

        /***/
      },

    /***/ "./node_modules/css-loader/dist/runtime/api.js":
      /*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
      /***/ (module) => {
        "use strict";
        eval(
          '\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = "";\n      var needLayer = typeof item[5] !== "undefined";\n      if (item[4]) {\n        content += "@supports (".concat(item[4], ") {");\n      }\n      if (item[2]) {\n        content += "@media ".concat(item[2], " {");\n      }\n      if (needLayer) {\n        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += "}";\n      }\n      if (item[2]) {\n        content += "}";\n      }\n      if (item[4]) {\n        content += "}";\n      }\n      return content;\n    }).join("");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === "string") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== "undefined") {\n        if (typeof item[5] === "undefined") {\n          item[5] = layer;\n        } else {\n          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = "".concat(supports);\n        } else {\n          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://innowiselabinternship/./node_modules/css-loader/dist/runtime/api.js?',
        );

        /***/
      },

    /***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
      /*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
      /***/ (module) => {
        "use strict";
        eval(
          "\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://innowiselabinternship/./node_modules/css-loader/dist/runtime/noSourceMaps.js?",
        );

        /***/
      },

    /***/ "./src/styles.css":
      /*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__,
      ) => {
        "use strict";
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./styles.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles.css");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\noptions.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");\noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);\n\n\n//# sourceURL=webpack://innowiselabinternship/./src/styles.css?',
        );

        /***/
      },

    /***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
      /*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
      /***/ (module) => {
        "use strict";
        eval(
          '\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = "".concat(id, " ").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://innowiselabinternship/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?',
        );

        /***/
      },

    /***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
      /*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
      /***/ (module) => {
        "use strict";
        eval(
          '\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === "undefined") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error("Couldn\'t find a style target. This probably means that the value for the \'insert\' parameter is invalid.");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://innowiselabinternship/./node_modules/style-loader/dist/runtime/insertBySelector.js?',
        );

        /***/
      },

    /***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
      /*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
      /***/ (module) => {
        "use strict";
        eval(
          '\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement("style");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://innowiselabinternship/./node_modules/style-loader/dist/runtime/insertStyleElement.js?',
        );

        /***/
      },

    /***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
      /*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";
        eval(
          '\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute("nonce", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://innowiselabinternship/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?',
        );

        /***/
      },

    /***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
      /*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
      /***/ (module) => {
        "use strict";
        eval(
          '\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = "";\n  if (obj.supports) {\n    css += "@supports (".concat(obj.supports, ") {");\n  }\n  if (obj.media) {\n    css += "@media ".concat(obj.media, " {");\n  }\n  var needLayer = typeof obj.layer !== "undefined";\n  if (needLayer) {\n    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += "}";\n  }\n  if (obj.media) {\n    css += "}";\n  }\n  if (obj.supports) {\n    css += "}";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== "undefined") {\n    css += "\\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === "undefined") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://innowiselabinternship/./node_modules/style-loader/dist/runtime/styleDomAPI.js?',
        );

        /***/
      },

    /***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
      /*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
      /***/ (module) => {
        "use strict";
        eval(
          "\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://innowiselabinternship/./node_modules/style-loader/dist/runtime/styleTagTransform.js?",
        );

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ id: moduleId,
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](
      module,
      module.exports,
      __webpack_require__,
    );
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/compat get default export */
  /******/ (() => {
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/ __webpack_require__.n = (module) => {
      /******/ var getter =
        module && module.__esModule
          ? /******/ () => module["default"]
          : /******/ () => module;
      /******/ __webpack_require__.d(getter, { a: getter });
      /******/ return getter;
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/define property getters */
  /******/ (() => {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          /******/ Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/ (() => {
    /******/ __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/ (() => {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = (exports) => {
      /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, {
          value: "Module",
        });
        /******/
      }
      /******/ Object.defineProperty(exports, "__esModule", { value: true });
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/nonce */
  /******/ (() => {
    /******/ __webpack_require__.nc = undefined;
    /******/
  })();
  /******/
  /************************************************************************/
  /******/
  /******/ // startup
  /******/ // Load entry module and return exports
  /******/ // This entry module can't be inlined because the eval devtool is used.
  /******/ var __webpack_exports__ = __webpack_require__("./src/index.js");
  /******/
  /******/
})();
