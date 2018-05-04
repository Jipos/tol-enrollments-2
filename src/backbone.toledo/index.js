// Vendor customizations
import './config/namedConstructors';
import './config/cocktail';
import './config/backbone/sync';
import './config/marionette/renderer';
import './config/marionette/object'; // This is only relevant when Radio.DEBUG === true

// functionality accessible through the channel.
// to be used in applications (and used in this lib itself too)
import './utilities/registry';
import './components/loading';
import './utilities/fetch';

// Classes
// Base classes to be used in applications
// NOTE: KR There is a more concise syntax:
//   export {default as channel} from './utilities/channel';
// But this causes the import to be executed before all the ones above.
// Because some of the imports above (e.g. namedConstructors) are requirements
// for some of the imports below (e.g. Model/Collection), this causes problems.
// We avoid this by importing the dependencies first and exporting them later (in 2 statements).
import {default as _channel} from './utilities/channel';
import {default as _ApplicationController} from './application_controller';
import {default as _Model} from './entities/model';
import {default as _Collection} from './entities/collection';

export const channel = _channel;
export const ApplicationController = _ApplicationController;
export const Model = _Model;
export const Collection = _Collection;
