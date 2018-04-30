import Radio from 'backbone.radio';
import size from 'lodash/size';

import config from '../config';

const API = {

  _registry: {},

  register: function (instance, id) {
    console.log('registering', id, instance);
    this._registry[id] = instance;
  },

  unregister: function (instance, id) {
    console.log('unregistering', id, instance);
    delete this._registry[id];
  },

  resetRegistry: function () {
    const oldCount = this.getRegistrySize();
    for (var key in this._registry) {
      var controller = this._registry[key];
      controller.region.empty();
    }
    const newCount = this.getRegistrySize();
    return {
      count: newCount,
      previous: oldCount,
      msg: `There were ${oldCount} controllers in the registry, there are now ${newCount}`
    };
  },

  getRegistrySize: function () {
    return size(this._registry);
  }
}

export function initializeRegistry (options = {}) {
  if (!options.channelName) {
    throw new Error('A channelName must be provided');
  }
  const channel = Radio.channel(options.channelName);
  channel.on('controller:created', (instance, id) => API.register(instance, id));
  channel.on('controller:destroyed', (instance, id) => API.unregister(instance, id));
  channel.reply('reset:registry', () => API.resetRegistry());
}
