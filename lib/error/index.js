"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotExtends = exports.NotExists = exports.Base = void 0;
const ErrorPluginManager_1 = require("./ErrorPluginManager");
exports.Base = ErrorPluginManager_1.default;
const ErrorPluginManagerNotExists_1 = require("./ErrorPluginManagerNotExists");
exports.NotExists = ErrorPluginManagerNotExists_1.default;
const ErrorPluginManagerNotExtends_1 = require("./ErrorPluginManagerNotExtends");
exports.NotExtends = ErrorPluginManagerNotExtends_1.default;
