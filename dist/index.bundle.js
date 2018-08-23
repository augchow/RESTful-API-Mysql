module.exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(module) {\n\tif (!module.webpackPolyfill) {\n\t\tmodule.deprecate = function() {};\n\t\tmodule.paths = [];\n\t\t// module.parent = undefined by default\n\t\tif (!module.children) module.children = [];\n\t\tObject.defineProperty(module, \"loaded\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.l;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"id\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.i;\n\t\t\t}\n\t\t});\n\t\tmodule.webpackPolyfill = 1;\n\t}\n\treturn module;\n};\n\n\n//# sourceURL=webpack:///(webpack)/buildin/module.js?");

/***/ }),

/***/ "./src/config/config.js":
/*!******************************!*\
  !*** ./src/config/config.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Joi = __webpack_require__(/*! joi */ \"joi\");\n\n__webpack_require__(/*! dotenv */ \"dotenv\").config();\n\nconst envVarSchema = Joi.object().keys({\n  NODE_ENV: Joi.string().default('development').allow(['development', 'production']), // 字串且預設值為development 並只允許三種參數\n  PORT: Joi.number().default(8080), // 數字且預設值為 8080\n  MYSQL_PORT: Joi.number().default(3306),\n  MYSQL_HOST: Joi.string().default('127.0.0.1'),\n  MYSQL_USER: Joi.string(),\n  MYSQL_PASS: Joi.string(),\n  MYSQL_NAME: Joi.string(),\n  VERSION: Joi.string() // 字串\n}).unknown().required();\n\n// process.env 撈取 .env 內的變數做 joi 驗證\nconst { error, value: envVars } = Joi.validate(process.env, envVarSchema);\n\nif (error) {\n  throw new Error(`Config validation error: ${error.message}`);\n}\n\nconst config = {\n  version: envVars.VERSION,\n  env: envVars.NODE_ENV,\n  port: envVars.PORT,\n  mysqlPort: envVars.MYSQL_PORT,\n  mysqlHost: envVars.MYSQL_HOST,\n  mysqlUserName: envVars.MYSQL_USER,\n  mysqlPass: envVars.MYSQL_PASS,\n  mysqlDatabase: envVars.MYSQL_DATABASE\n};\n\n// export default config;\nmodule.exports = config;\n\n//# sourceURL=webpack:///./src/config/config.js?");

/***/ }),

/***/ "./src/config/express.js":
/*!*******************************!*\
  !*** ./src/config/express.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\nconst cors = __webpack_require__(/*! cors */ \"cors\");\nconst morgan = __webpack_require__(/*! morgan */ \"morgan\");\nconst config = __webpack_require__(/*! ./config */ \"./src/config/config.js\");\nconst index = __webpack_require__(/*! ../server/routes/index.routes */ \"./src/server/routes/index.routes.js\");\n\nconst app = express();\n\napp.use(bodyParser.json());\napp.use(bodyParser.urlencoded({ extended: true }));\napp.use(cors());\napp.use(morgan('dev'));\n\n/* GET home page. */\napp.get('/', (req, res) => {\n  res.send(`server started on  port http://127.0.0.1:${config.port} (${config.env})`);\n  // res.header('Access-Control-Allow-Origin', '*');\n  // res.header('Access-Control-Allow-Headers', '*');\n});\n\napp.use('/api', index);\n\n// export default app;\nmodule.exports = app;\n\n//# sourceURL=webpack:///./src/config/express.js?");

/***/ }),

/***/ "./src/config/param-validation.js":
/*!****************************************!*\
  !*** ./src/config/param-validation.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const joi = __webpack_require__(/*! joi */ \"joi\");\n\nmodule.exports = {\n  createArticle: {\n    body: {\n      user_id: joi.number().required(),\n\n      article_title: joi.string().required(),\n\n      article_tag: joi.string().required(),\n\n      article_content: joi.string().min(20).required()\n    }\n  },\n\n  createUser: {\n    body: {\n      user_name: joi.string().required(),\n\n      user_mail: joi.string().email().trim().required(),\n\n      user_password: joi.string().regex(/[a-zA-Z0-9]{6,30}$/).required()\n    }\n  }\n};\n\n//# sourceURL=webpack:///./src/config/param-validation.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(module) {// import app from './config/express';\n// import config from './config/config';\n\nconst app = __webpack_require__(/*! ./config/express */ \"./src/config/express.js\");\nconst config = __webpack_require__(/*! ./config/config */ \"./src/config/config.js\");\n\nif (!module.parent) {\n  // listen on port config.port\n  app.listen(config.port, () => {\n    console.log(`server started on  port http://127.0.0.1:${config.port} (${config.env})`);\n  });\n}\n\n// export default app;\nmodule.exports = app;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/server/controllers/article.controller.js":
/*!******************************************************!*\
  !*** ./src/server/controllers/article.controller.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const articleModule = __webpack_require__(/*! ../modules/article.module */ \"./src/server/modules/article.module.js\");\n\nconst articlePost = (req, res) => {\n  const insertValues = req.body;\n  articleModule.createArticle(insertValues).then(result => {\n    res.send(result);\n  }).catch(err => {\n    return res.send(err);\n  });\n};\n\nconst articleGet = (req, res) => {\n  articleModule.getArticle().then(result => {\n    res.send(result);\n  }).catch(err => {\n    return res.send(err);\n  });\n};\n\nconst articlePut = (req, res) => {\n  const userId = req.params.article_id;\n  const insertValues = req.body;\n  articleModule.modifyArticle(insertValues, userId).then(result => {\n    res.send(result);\n  }).catch(err => {\n    return res.send(err);\n  });\n};\n\nconst articleDelete = (req, res) => {\n  const userId = req.params.article_id;\n  articleModule.deleteArticle(userId).then(result => {\n    res.send(result);\n  }).catch(err => {\n    return res.send(err);\n  });\n};\n\nmodule.exports = {\n  articlePost,\n  articleGet,\n  articlePut,\n  articleDelete\n};\n\n//# sourceURL=webpack:///./src/server/controllers/article.controller.js?");

/***/ }),

/***/ "./src/server/controllers/user.controller.js":
/*!***************************************************!*\
  !*** ./src/server/controllers/user.controller.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const userModule = __webpack_require__(/*! ../modules/user.module */ \"./src/server/modules/user.module.js\");\n\nconst userPost = (req, res) => {\n  const insertValues = req.body;\n  userModule.createUser(insertValues).then(result => {\n    res.send(result);\n  }).catch(err => {\n    return res.send(err);\n  });\n};\n\nconst userGet = (req, res) => {\n  userModule.getUser().then(result => {\n    res.send(result);\n  }).catch(err => {\n    return res.send(err);\n  });\n};\n\nconst userPut = (req, res) => {\n  const userId = req.params.user_id;\n  const insertValues = req.body;\n  userModule.modifyUser(insertValues, userId).then(result => {\n    res.send(result);\n  }).catch(err => {\n    return res.send(err);\n  });\n};\n\nconst userDelete = (req, res) => {\n  const userId = req.params.user_id;\n  userModule.deleteUser(userId).then(result => {\n    res.send(result);\n  }).catch(err => {\n    return res.send(err);\n  });\n};\n\nmodule.exports = {\n  userPost,\n  userGet,\n  userPut,\n  userDelete\n};\n\n//# sourceURL=webpack:///./src/server/controllers/user.controller.js?");

/***/ }),

/***/ "./src/server/modules/article.module.js":
/*!**********************************************!*\
  !*** ./src/server/modules/article.module.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const mysql = __webpack_require__(/*! mysql */ \"mysql\");\nconst config = __webpack_require__(/*! ../../config/config */ \"./src/config/config.js\");\n\nconst connectionPool = mysql.createPool({\n  connectionLimit: 10,\n  host: config.mysqlHost,\n  user: config.mysqlUserName,\n  password: config.mysqlPass,\n  database: config.mysqlDatabase\n});\n\n// insert statement\nfunction createArticle(insertValues) {\n  return new Promise((resolve, reject) => {\n    connectionPool.getConnection((connectionError, connection) => {\n      if (connectionError) {\n        reject(connectionError);\n      } else {\n        connection.query('INSERT INTO `article` SET ?', insertValues, (error, result) => {\n          if (error) {\n            console.error('SQL error: ', error);\n            reject(error);\n          } else if (result.affectedRows === 1) {\n            resolve(`Succesfully added article_id: ${result.insertId}`);\n          }\n          connection.release();\n        });\n      }\n    });\n  });\n}\n\n// Select statement\nfunction getArticle() {\n  return new Promise((resolve, reject) => {\n    connectionPool.getConnection((connectionError, connection) => {\n      if (connectionError) {\n        reject(connectionError);\n      } else {\n        connection.query('SELECT * FROM `article`', (error, result) => {\n          if (error) {\n            console.error('SQL error: ', error);\n            reject(error);\n          } else {\n            resolve(result);\n          }\n          connection.release();\n        });\n      }\n    });\n  });\n}\n\n// Update\nfunction modifyArticle(insertValues, userId) {\n  return new Promise((resolve, reject) => {\n    connectionPool.getConnection((connectionError, connection) => {\n      if (connectionError) {\n        reject(connectionError);\n      } else {\n        connection.query('UPDATE `article` SET ? WHERE article_id = ?', [insertValues, userId], (error, result) => {\n          if (error) {\n            console.error('SQL error: ', error);\n            reject(error);\n          } else if (result.affectedRows === 0) {\n            resolve('No changes !');\n          } else {\n            resolve('Success');\n          }\n          connection.release();\n        });\n      }\n    });\n  });\n}\n\nfunction deleteArticle(userId) {\n  return new Promise((resolve, reject) => {\n    connectionPool.getConnection((connectionError, connection) => {\n      if (connectionError) {\n        reject(connectionError);\n      } else {\n        connection.query('DELETE FROM `article` WHERE article_id = ?', userId, (error, result) => {\n          if (error) {\n            console.error('SQL error: ', error);\n            reject(error);\n          } else if (result.affectedRows === 1) {\n            resolve('Delete Succesful !');\n          } else {\n            resolve('Delete Fail');\n          }\n          connection.release();\n        });\n      }\n    });\n  });\n}\n\nmodule.exports = {\n  createArticle,\n  getArticle,\n  modifyArticle,\n  deleteArticle\n};\n\n//# sourceURL=webpack:///./src/server/modules/article.module.js?");

/***/ }),

/***/ "./src/server/modules/user.module.js":
/*!*******************************************!*\
  !*** ./src/server/modules/user.module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const mysql = __webpack_require__(/*! mysql */ \"mysql\");\nconst config = __webpack_require__(/*! ../../config/config */ \"./src/config/config.js\");\n\nconst connectionPool = mysql.createPool({\n  connectionLimit: 10,\n  host: config.mysqlHost,\n  user: config.mysqlUserName,\n  password: config.mysqlPass,\n  database: config.mysqlDatabase\n});\n\n// User POST\nfunction createUser(insertValues) {\n  return new Promise((resolve, reject) => {\n    connectionPool.getConnection((connectionError, connection) => {\n      if (connectionError) {\n        reject(connectionError);\n      } else {\n        connection.query('INSERT INTO `user` SET ?', insertValues, (error, result) => {\n          if (error) {\n            console.error('SQL error: ', error);\n            reject(error);\n          } else if (result.affectedRows === 1) {\n            resolve(`Succesfully added user_id: ${result.insertId}`);\n          }\n          connection.release();\n        });\n      }\n    });\n  });\n}\n\n// Select statement\nfunction getUser() {\n  return new Promise((resolve, reject) => {\n    connectionPool.getConnection((connectionError, connection) => {\n      if (connectionError) {\n        reject(connectionError);\n      } else {\n        connection.query('SELECT * FROM `user`', (error, result) => {\n          if (error) {\n            console.error('SQL error: ', error);\n            reject(error);\n          } else {\n            resolve(result);\n          }\n          connection.release();\n        });\n      }\n    });\n  });\n}\n\n// Update\nfunction modifyUser(insertValues, userId) {\n  return new Promise((resolve, reject) => {\n    connectionPool.getConnection((connectionError, connection) => {\n      if (connectionError) {\n        reject(connectionError);\n      } else {\n        connection.query('UPDATE `user` SET ? WHERE user_id = ?', [insertValues, userId], (error, result) => {\n          if (error) {\n            console.error('SQL error: ', error);\n            reject(error);\n          } else if (result.affectedRows === 0) {\n            resolve('No changes !');\n          } else {\n            resolve('Success');\n          }\n          connection.release();\n        });\n      }\n    });\n  });\n}\n\nfunction deleteUser(userId) {\n  return new Promise((resolve, reject) => {\n    connectionPool.getConnection((connectionError, connection) => {\n      if (connectionError) {\n        reject(connectionError);\n      } else {\n        connection.query('DELETE FROM `user` WHERE user_id = ?', userId, (error, result) => {\n          if (error) {\n            console.error('SQL error: ', error);\n            reject(error);\n          } else if (result.affectedRows === 1) {\n            resolve('Delete Succesful !');\n          } else {\n            resolve('Delete Fail');\n          }\n          connection.release();\n        });\n      }\n    });\n  });\n}\n\nmodule.exports = {\n  createUser,\n  getUser,\n  modifyUser,\n  deleteUser\n};\n\n//# sourceURL=webpack:///./src/server/modules/user.module.js?");

/***/ }),

/***/ "./src/server/routes/article.route.js":
/*!********************************************!*\
  !*** ./src/server/routes/article.route.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const express = __webpack_require__(/*! express */ \"express\");\n\nconst router = express.Router();\nconst validate = __webpack_require__(/*! express-validation */ \"express-validation\");\nconst articleCtrl = __webpack_require__(/*! ../controllers/article.controller */ \"./src/server/controllers/article.controller.js\");\nconst paramValidation = __webpack_require__(/*! ../../config/param-validation */ \"./src/config/param-validation.js\");\n\nrouter.route('/').get(articleCtrl.articleGet).post(validate(paramValidation.createArticle), articleCtrl.articlePost);\n\nrouter.route('/:article_id').put(articleCtrl.articlePut).delete(articleCtrl.articleDelete);\n\nmodule.exports = router;\n\n//# sourceURL=webpack:///./src/server/routes/article.route.js?");

/***/ }),

/***/ "./src/server/routes/index.routes.js":
/*!*******************************************!*\
  !*** ./src/server/routes/index.routes.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const mysql = __webpack_require__(/*! mysql */ \"mysql\");\nconst express = __webpack_require__(/*! express */ \"express\");\n\nconst router = express.Router();\nconst config = __webpack_require__(/*! ../../config/config */ \"./src/config/config.js\");\nconst article = __webpack_require__(/*! ./article.route */ \"./src/server/routes/article.route.js\");\nconst user = __webpack_require__(/*! ./user.route */ \"./src/server/routes/user.route.js\");\n\n/* GET localhost:[port]/api page. */\nrouter.get('/', (req, res) => {\n  res.send(`此路徑是: localhost:${config.port}/api`);\n});\n\nrouter.get('/sqlTest', (req, res) => {\n  const connectionPool = mysql.createPool({\n    connectionLimit: 10,\n    host: config.mysqlHost,\n    user: config.mysqlUserName,\n    password: config.mysqlPass,\n    database: config.mysqlDatabase\n  });\n  connectionPool.getConnection((err, connection) => {\n    if (err) {\n      res.send(err);\n      console.log('Connection Failed !');\n    } else {\n      res.send('Connection Successful !');\n      console.log(connection);\n    }\n  });\n});\n\nrouter.use('/article', article);\nrouter.use('/user', user);\n\n// export default router;\nmodule.exports = router;\n\n//# sourceURL=webpack:///./src/server/routes/index.routes.js?");

/***/ }),

/***/ "./src/server/routes/user.route.js":
/*!*****************************************!*\
  !*** ./src/server/routes/user.route.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const express = __webpack_require__(/*! express */ \"express\");\n\nconst router = express.Router();\nconst validate = __webpack_require__(/*! express-validation */ \"express-validation\");\nconst userCtrl = __webpack_require__(/*! ../controllers/user.controller */ \"./src/server/controllers/user.controller.js\");\nconst paramValidation = __webpack_require__(/*! ../../config/param-validation */ \"./src/config/param-validation.js\");\n\nrouter.route('/').get(userCtrl.userGet).post(validate(paramValidation.createUser), userCtrl.userPost);\n\nrouter.route('/:user_id').put(userCtrl.userPut).delete(userCtrl.userDelete);\n\nmodule.exports = router;\n\n//# sourceURL=webpack:///./src/server/routes/user.route.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dotenv\");\n\n//# sourceURL=webpack:///external_%22dotenv%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "express-validation":
/*!*************************************!*\
  !*** external "express-validation" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-validation\");\n\n//# sourceURL=webpack:///external_%22express-validation%22?");

/***/ }),

/***/ "joi":
/*!**********************!*\
  !*** external "joi" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"joi\");\n\n//# sourceURL=webpack:///external_%22joi%22?");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"morgan\");\n\n//# sourceURL=webpack:///external_%22morgan%22?");

/***/ }),

/***/ "mysql":
/*!************************!*\
  !*** external "mysql" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mysql\");\n\n//# sourceURL=webpack:///external_%22mysql%22?");

/***/ })

/******/ });