import ErrorPluginManagerNotExists from "./error/ErrorPluginManagerNotExists"
import ErrorPluginManagerNotExtends from "./error/ErrorPluginManagerNotExtends"
import * as glob from "glob"
import { resolve } from "path"

type Config = Record<string, unknown>
type Constructor = new (config?: Config) => any
type Info = Record<string, { path: string, ctor?: Constructor }>

/**
 * The plugin manager.
 */
export default class PluginManager {

  /**
   * The plugins info.
   */
  public readonly info: Info = {}

  /**
   * Constructor for the PluginManager object.
   */
  public constructor(
    public readonly basePlugin: Function
  ) {}

  /**
   * Registers plugins from specified location.
   */
  public register(path: string | string[], dirname: string = "", match?: string | RegExp | (string | RegExp)[]): this {
    [].concat(path).forEach((path: string) => {
      path = resolve(dirname, path)
      const prefixes = glob.sync(path).map(path => path.replace(/\/+$/, "") + "/")
      glob.sync(`${path}/**/*.js`)
        .map(path => path.replace(/\.js$/, ""))
        .map(path => {
          const prefix = prefixes.find(prefix => path.startsWith(prefix)) ?? ""
          const id = path.substring(prefix.length).split("/")
            .map(value => this.snakecase(value)).join(".")
          this.filter(id, match) && (this.info[id] = { path })
        })
    })
    return this
  }

  /**
   * Returns an instance of a plugin with specified ID and configuration.
   */
  public instance(id: string, config: Config = {}): any {
    return new (this.ctor(id))(config)
  }

  /**
   * Returns a constructor of a plugin with specified ID.
   */
  public ctor(id: string): Constructor {
    const { info, basePlugin } = this
    id = this.snakecase(id)
    if (!(id in info)) {
      throw new ErrorPluginManagerNotExists(basePlugin, id)
    }
    if (!info[id].ctor) {
      const ctor: Constructor = require(info[id].path).default
      if (!(ctor.prototype instanceof basePlugin)) {
        throw new ErrorPluginManagerNotExtends(basePlugin, id)
      }
      info[id].ctor = ctor
    }
    return info[id].ctor
  }

  /**
   * Returns a list of all registered plugin IDs.
   */
  public list(): string[] {
    return Object.keys(this.info)
  }

  /**
   * Determines whether the plugin ID should be registered.
   */
  protected filter(id: string, match?: string | RegExp | (string | RegExp)[]): boolean {
    return undefined !== match
      ? [].concat(match).some((match: string | RegExp) =>
        "string" === typeof match ? match === id : match.test(id))
      : true
  }

  /**
   * Returns a snakecased string.
   */
  private snakecase(string: string): string {
    return string
      .replace(/([^A-Z])([A-Z])/g, "$1_$2")
      .replace(/([A-Z])([A-Z][a-z])/g, "$1_$2")
      .replace(/_+/g, "_")
      .replace(/^_|_$/g, "")
      .toLowerCase()
  }

}
