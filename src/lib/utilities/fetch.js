import $ from 'jquery';
import Radio from 'backbone.radio';
import flatten from 'lodash/flatten';
import map from 'lodash/map';

import {channel} from 'lib';

// Resolves when all of the specified entities are fetched.
// Returns a promise.
channel.reply('when:fetched', function (entities) {
  var xhrs = map(flatten([entities]), '_fetch');
  return $.when(...xhrs);
});
