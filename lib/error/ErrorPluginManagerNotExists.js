"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorPluginManager_1 = require("./ErrorPluginManager");
/**
 * The plugin does not exist error.
 */
class ErrorPluginManagerNotExists extends ErrorPluginManager_1.default {
    /**
     * Constructor for the ErrorPluginManagerNotExists object.
     */
    constructor(base, id) {
        super(`${base.name} plugin "${id}" does not exist.`);
    }
}
exports.default = ErrorPluginManagerNotExists;
