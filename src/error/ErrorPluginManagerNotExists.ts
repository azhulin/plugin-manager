import ErrorPluginManager from "./ErrorPluginManager"

/**
 * The plugin does not exist error.
 */
export default class ErrorPluginManagerNotExists extends ErrorPluginManager {

  /**
   * Constructor for the ErrorPluginManagerNotExists object.
   */
  public constructor(base: Function, id: string) {
    super(`${base.name} plugin "${id}" does not exist.`)
  }

}
