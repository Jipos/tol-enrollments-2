import Mn from 'backbone.marionette';
import _ from 'underscore';

const _destroyRadioOrig = Mn.Object.prototype._destroyRadio;

// On destroying a Marionette Object, the _destroyRadio function is called.
// The purpose of this function is to clean up all request handlers created
// by the object. When no handlers are registered, this causes a warning
// when debug logging is enabled in backbone.radio.
// This patch fixes that warning, by only cleaning up the handlers if any were defined.
Mn.Object.prototype._destroyRadio = function _destroyRadio() {
  if (_.result(this, 'radioRequests')) {
    const args = Array.prototype.slice.call(arguments);
    _destroyRadioOrig.apply(this, args);
  }
};
