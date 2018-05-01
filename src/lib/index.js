// (backbone.toledo)
// The root file to load
// The backbone.toledo dependency contains extensions to the backbone and marionette libraries,
// used by the Toledo team.
// These are various changes, like
// * changing the default behaviour of the Marionette Renderer,
// * extending the behaviour of the Backbone.Model.save method to omit certain properties
// * provide utility functions for checking whether models/collections are fetched

// Usage
// TODO: KR this part isn't clear yet.
// Idealy, you load the toledo dependency the first time you use it. But since it extends some
// Backbone/Marionette classes, these extensions have to be applied, before you use those classes
// for the first time.
// Currently, It seems that you have to import the toledo extensions in 2 always:
// 1. as an import for side effects, before you instantiate any Backbone/Marionette classes
// 2. as an import of a specific function, at the time you want to use that function (e.g. whenFetched)
// NOTE: KR I'm still trying to figure out a way to avoid this.
// IDEA: this might be a reason to access all functionality through backbone.radio (like the
// tol-whatsrecent-frontend rewrite does). This loading the extensions one time for it's side effects
// would suffice.
// This might even provide a way to configure the extensions.
// E.g.
//   import toledoExtensions from 'backbone.toledo';
//   toledoExtensions.initialize({
//     debug: true,
//     channelName: 'toledo'
//   })
// BUT: there still seems to be a need for importing separate classes.
// e.g. application_controller, Model, Collection, and possibly other classes.
// What if there were a way to throw an exception if one of the separate classes whatsrecent
// loaded without the initialize method being called?

// Configure the channel

// Register the loading component (it's functionality gets called using the channel)
// TODO: KR registering the loading component with the channel has to wait until the initialization
// has finished. Otherwise, we won't know which channel to listen to.

// Vendor functions
import once from 'lodash/once';
import defaults from 'lodash/defaults';
import Radio from 'backbone.radio';

// Vendor customizations
import './config/namedConstructors';
import './config/cocktail';
import './config/backbone/sync';
import './config/marionette/renderer';
import './config/marionette/object'; // when debug is disabled, this fix doesn't really matter

// Classes
// Base classes to be used in applications
export {default as ApplicationController} from './application_controller';
export {Model} from './entities/model';
export {Collection} from './entities/collection';
export {default as config} from './config';

// initializers
// Initializing both the base classes (if necessary) and internal classes/components.
import {initializeConfig} from './config';
import {initializeRegistry} from './utilities/registry';
import {initializeLoadingComponent} from './components/loading';
import {initializeWhenFetched} from './utilities/fetch';

// Export an initialize function, for running the initializers
export const initialize = once(function (options = {}) {

    defaults(options, {
      channelName: 'toledo',
      debug: true,
      availableLanguages: ['en'],
      defaultLanguage: 'en'
    });

    if (options.availableLanguages.indexOf(options.defaultLanguage) === -1) {
      throw new Error(`The default language (${options.defaultLanguage}) must be one of the available languages (${options.availableLanguages}).`);
    }

    initializeConfig(options);

    initializeRegistry(options);
    initializeLoadingComponent(options);
    initializeWhenFetched(options);

    if (options.debug) {
      // Enable Radio's debug logging
      Radio.DEBUG = true;
      // Expose the channel (i.e. make it accessible in the browser dev tools)
      window.channel = Radio.channel(options.channelName);
    }

});
