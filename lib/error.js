"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorPluginManager_1 = require("./error/ErrorPluginManager");
const ErrorPluginManagerNotExists_1 = require("./error/ErrorPluginManagerNotExists");
const ErrorPluginManagerNotExtends_1 = require("./error/ErrorPluginManagerNotExtends");
exports.default = {
    Base: ErrorPluginManager_1.default,
    NotExists: ErrorPluginManagerNotExists_1.default,
    NotExtends: ErrorPluginManagerNotExtends_1.default,
};
