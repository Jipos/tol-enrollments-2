import Mn from 'backbone.marionette';
import _ from 'underscore';

import {channel} from './utilities/channel';

// We override the Mn.Object methods instead of using the provided extension points
// (e.g. initialize, onDestroy), so that extensions of this application_controller
// can still use them without having to call 'super' (or break this class' functionality).
// NOTE: KR we need the ApplicationController variable in order to be able to do an instance checking
// see the _isController function. So this is why we don't use
//   export default Mn.Object.extend({...})
const ApplicationController = Mn.Object.extend({
  constructorName: 'ApplicationController',
  channelName: 'toledo',

  _initRadio: function () {
    const args = Array.prototype.slice.call(arguments);
    Mn.Object.prototype._initRadio.apply(this, args);
    // 1. Hijack _initRadio function in order to send event AFTER channel is initialized, but BEFORE
    // the initialize function is called.
    // If we trigger it after the initialize function is called, the order of the controller:created
    // and controller:destroyed events is wrong.
    this.getChannel().trigger('controller:created', this, this.cid);
    // 2. Hijack the _initRadio function to ensure that a region is set.
    this._ensureRegion();
  },

  _ensureRegion: function() {
    if (!this.region) {
      this.region = this.getChannel().request('default:region');
    }
   if (!this.region) {
     throw new Error('An applicationController requires a region.');
   }
  },

  constructor: function (options = {}) {
    this.cidPrefix = 'tc';

    this.region = options.region;

    const args = Array.prototype.slice.call(arguments);
    Mn.Object.prototype.constructor.apply(this, args);
  },

  destroy: function () {
    const args = Array.prototype.slice.call(arguments);
    Mn.Object.prototype.destroy.apply(this, args);
    this.resetMainView();
    this.getChannel().trigger('controller:destroyed', this, this.cid);
  },

  _isController: function (controller) {
    return controller instanceof ApplicationController;
  },

  show: function (view, options = {}) {
    _.defaults(options, {
      loading: false,
      region: this.region
    });
    // Allow us to pass in a controller instance instead of a views
    // if a controller instance, set the view to the mainView of the controller
    view = this._isController(view) ? view.getMainView() : view;
    if (!view) {
      throw new Error('No view could be resolved for this controller');
    }

    this.setMainView(view);
    this._manageView(view, options);
  },

  resetMainView: function () {
    delete this._mainView;
  },

  getMainView: function () {
    return this._mainView;
  },

  setMainView: function (view) {
    // the first view we show is always going to become the mainView of our
    // controller (whether its a layout or another view type). So if this
    // *is* a layout, when we show other regions inside of that layout, we
    // check for the existance of a mainView first, so our controller is only
    // destroyed when the original mainView is destroyed.
    if (this._mainView) {
      return;
    }
    this._mainView = view;
    this.listenTo(view, 'destroy', this.destroy);
  },

  _manageView: function (view, options) {
    if (options.loading) {
      // show the loading views
      this.getChannel().request('show:loading', view, options);
    } else {
      options.region.show(view);
    }
  }

});

export default ApplicationController;
