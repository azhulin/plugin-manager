import ErrorPluginManager from "./ErrorPluginManager"

/**
 * The plugin does not extend the base plugin error.
 */
export default class ErrorPluginManagerNotExtends extends ErrorPluginManager {

  /**
   * Constructor for the ErrorPluginManagerNotExtends object.
   */
  public constructor(base: Function, id: string) {
    super(`${base.name} plugin "${id}" does not extend the base plugin.`)
  }

}
