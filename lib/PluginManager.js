"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorPluginManagerNotExists_1 = require("./error/ErrorPluginManagerNotExists");
const ErrorPluginManagerNotExtends_1 = require("./error/ErrorPluginManagerNotExtends");
const glob = require("glob");
const path_1 = require("path");
/**
 * The plugin manager.
 */
class PluginManager {
    /**
     * Constructor for the PluginManager object.
     */
    constructor(basePlugin) {
        this.basePlugin = basePlugin;
        /**
         * The plugins info.
         */
        this.info = {};
    }
    /**
     * Registers plugins from specified location.
     */
    register(path, dirname = "", match) {
        [].concat(path).forEach((path) => {
            path = path_1.resolve(dirname, path);
            const length = path.length + 1;
            glob.sync(`${path}/**/*.js`)
                .map(path => path.replace(/\.js$/, ""))
                .map(path => {
                const id = path.substring(length).split("/")
                    .map(value => this.snakecase(value)).join(".");
                this.filter(id, match) && (this.info[id] = { path });
            });
        });
        return this;
    }
    /**
     * Returns an instance of a plugin with specified ID and configuration.
     */
    instance(id, config = {}) {
        return new (this.ctor(id))(config);
    }
    /**
     * Returns a constructor of a plugin with specified ID.
     */
    ctor(id) {
        const { info, basePlugin } = this;
        id = this.snakecase(id);
        if (!(id in info)) {
            throw new ErrorPluginManagerNotExists_1.default(basePlugin, id);
        }
        if (!info[id].ctor) {
            const ctor = require(info[id].path).default;
            if (!(ctor.prototype instanceof basePlugin)) {
                throw new ErrorPluginManagerNotExtends_1.default(basePlugin, id);
            }
            info[id].ctor = ctor;
        }
        return info[id].ctor;
    }
    /**
     * Determines whether the plugin ID should be registered.
     */
    filter(id, match) {
        return undefined !== match
            ? [].concat(match).some((match) => "string" === typeof match ? match === id : match.test(id))
            : true;
    }
    /**
     * Returns a snakecased string.
     */
    snakecase(string) {
        return string
            .replace(/([^A-Z])([A-Z])/g, "$1_$2")
            .replace(/([A-Z])([A-Z][a-z])/g, "$1_$2")
            .replace(/_+/g, "_")
            .replace(/^_|_$/g, "")
            .toLowerCase();
    }
}
exports.default = PluginManager;
