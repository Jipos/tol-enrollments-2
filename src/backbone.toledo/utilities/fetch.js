import $ from 'jquery';
import Radio from 'backbone.radio';
import _ from 'underscore';

import channel from './channel';

// Resolves when all of the specified entities are fetched.
// Returns a promise.
channel.reply('when:fetched', function (entities) {
  var xhrs = _.map(_.flatten([entities]), '_fetch');
  return $.when(...xhrs);
});
