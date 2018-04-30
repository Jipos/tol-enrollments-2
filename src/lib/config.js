// Defines the config, which can be used by custom code, using the toledo utilities.
// This config isn't used in the utilities internally.

// NOTE: KR when using webpack, some script files are executed before the config is setup.
// This can cause problems.

function Config () {}

export default new Config();

export function initializeConfig(options = {}) {
  for (var key in options) {
    Config.prototype[key] = options[key];
  }
}
