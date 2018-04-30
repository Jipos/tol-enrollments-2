import $ from 'jquery';
import Radio from 'backbone.radio';
import flatten from 'lodash/flatten';
import map from 'lodash/map';

export function initializeWhenFetched (options = {}) {
  if (!options.channelName) {
    throw new Error('A channelName must be provided');
  }
  const channel = Radio.channel(options.channelName);

  // Returns a promise which resolves when all of the specified entities are fetched
  channel.reply('when:fetched', function (entities) {
    var xhrs = map(flatten([entities]), '_fetch');
    return $.when(...xhrs);
  });
};
