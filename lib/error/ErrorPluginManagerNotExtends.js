"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorPluginManager_1 = require("./ErrorPluginManager");
/**
 * The plugin does not extend the base plugin error.
 */
class ErrorPluginManagerNotExtends extends ErrorPluginManager_1.default {
    /**
     * Constructor for the ErrorPluginManagerNotExtends object.
     */
    constructor(base, id) {
        super(`${base.name} plugin "${id}" does not extend the base plugin.`);
    }
}
exports.default = ErrorPluginManagerNotExtends;
