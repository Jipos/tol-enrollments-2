import Mn from 'backbone.marionette';
import $ from 'jquery';
import Radio from 'backbone.radio';
import defaults from 'lodash/defaults';
import isBoolean from 'lodash/isBoolean';
import pick from 'lodash/pick';
import toArray from 'lodash/toArray';
import compact from 'lodash/compact';

import {ApplicationController} from 'lib/application_controller';
import {LoadingView} from './views';

// TODO: KR I'm not sure the opacity loadingType works correctly.
// The cleanup of the realView for this type seems to be missing
export const LoadingController = ApplicationController.extend({
  initialize: function (options = {}) {
    // TODO: KR ensure the following options: view, region and config
    var { view, config } = options;

    console.log(isBoolean(undefined));
    console.log(isBoolean(true));
    console.log(isBoolean(false));
    console.log(isBoolean({}));
    console.log(isBoolean(config));

    config = isBoolean(config) ? {} : config;

    defaults(config, {
      loadingType: "spinner",
      entities: this.getEntities(view),
      debug: false
    });

    if (config.loadingType === 'opacity') {
      this.region.currentView.$el.css('opacity', 0,5);
    } else if (config.loadingType === 'spinner') {
      var loadingView = this.getLoadingView();
      this.show(loadingView);
    } else {
      throw new Error('Invalid loadingType');
    }

    this.showRealView(view, loadingView, config);
  },
  showRealView: function (realView, loadingView, config) {
   whenFetched(config.entities).done(function() {
     // ...after the entities are fetched, execute this callback
     // ================================================================ ##
     // If the region we are trying to insert is not the loadingView then
     // we know the user has navigated to a different page while the loading
     // view was still open. In that case, we know to manually close the original
     // view so its controller is also closed. We also prevent showing the real
     // view (which would snap the user back to the old view unexpectedly)
     // ================================================================ ##
     if (config.loadingType === 'opacity') {
       // TODO: KR only remove the opacity setting
       this.region.currentView.$el.removeAttr('style');
     } else if (config.loadingType === 'spinner') {
       if (this.region.currentView !== loadingView) {
         return realView.destroy();
       }
     }
     // show the real view unless we've set debug in the loading options
     if (!config.debug) {
       this.show(realView);
     }
   });
  },
  getEntities: function (view) {
   // return the entities manually set during configuration, or just pull
   // off the model and collection from the view (if they exist)
   // TODO: KR the option to set the entities manually seems to be missing
   return compact(toArray(pick(view, 'model', 'collection')));
  },
  getLoadingView: function () {
   return new LoadingView();
  }
});

// TODO: KR make all lib utilities use the same channel. Make this channelName configurable.
// And get it from somewhere, instead of just 'knowing' it here.
Radio.channel('toledo').reply('show:loading', function(view, options) {
  return new LoadingController({
    view: view,
    region: options.region,
    config: options.loading
  })
});
