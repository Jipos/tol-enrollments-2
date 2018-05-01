// NOTE: KR all dependencies of ES modules are loaded before the code in the module is executed.
// So code which initialized this config, will only be run AFTER the modules using the configure
// are loaded. Either the config should be used asynchronously (like in application_controller),
// or an initialization function should be exported, to be executed after the initialization of
// this config (like in registry).

function Config () {}

export default new Config();

export function initializeConfig(options = {}) {
  for (var key in options) {
    Config.prototype[key] = options[key];
  }
}
