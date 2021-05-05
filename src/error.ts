import ErrorPluginManager from "./error/ErrorPluginManager"
import ErrorPluginManagerNotExists from "./error/ErrorPluginManagerNotExists"
import ErrorPluginManagerNotExtends from "./error/ErrorPluginManagerNotExtends"

export default {
  Base: ErrorPluginManager,
  NotExists: ErrorPluginManagerNotExists,
  NotExtends: ErrorPluginManagerNotExtends,
}
