import Mn from 'backbone.marionette';
import defaults from 'lodash/defaults';

// We override the Mn.Object methods instead of using the provided extension points
// (e.g. initialize, onDestroy), so that extensions of this application_controller
// can still use them without having to call 'super' (or break this class' functionality).
export const ApplicationController = Mn.Object.extend({

  constructor: function () {
    // TODO: KR make all lib utilities use the same channel. Make this channelName configurable.
    // And get it from somewhere, instead of just 'knowing' it here.
    this.channelName = 'toledo';
    this.cidPrefix = 'controller';
    // is this necessary? It was concise with coffeescript's @ notation, but woth ES6?
    // this.region = options.region; // Use this.getOption('region') instead?
    // TODO: KR ensure that a region is passed as an option

    const args = Array.prototype.slice.call(arguments);

    Mn.Object.prototype.constructor.apply(this, args);
    this.getChannel().trigger('controller:created', this, this.cid);
  },

  destroy: function () {
    const args = Array.prototype.slice.call(arguments);
    Mn.Object.prototype.destroy.apply(this, args);
    this.getChannel().trigger('controller:destroyed', this, this.cid);
  },

  _isController: function (controller) {
    return controller instanceof ApplicationController;
  },

  show: function (view, options = {}) {
    defaults(options, {
      loading: false,
      region: this.getOption('region')
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
