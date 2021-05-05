declare type Config = Record<string, unknown>;
declare type Constructor = new (config?: Config) => any;
declare type Info = Record<string, {
    path: string;
    ctor?: Constructor;
}>;
/**
 * The plugin manager.
 */
export default class PluginManager {
    readonly basePlugin: Function;
    /**
     * The plugins info.
     */
    readonly info: Info;
    /**
     * Constructor for the PluginManager object.
     */
    constructor(basePlugin: Function);
    /**
     * Registers plugins from specified location.
     */
    register(path: string | string[], dirname?: string, match?: string | RegExp | (string | RegExp)[]): this;
    /**
     * Returns an instance of a plugin with specified ID and configuration.
     */
    instance(id: string, config?: Config): any;
    /**
     * Returns a constructor of a plugin with specified ID.
     */
    ctor(id: string): Constructor;
    /**
     * Determines whether the plugin ID should be registered.
     */
    protected filter(id: string, match?: string | RegExp | (string | RegExp)[]): boolean;
    /**
     * Returns a snakecased string.
     */
    private snakecase;
}
export {};
