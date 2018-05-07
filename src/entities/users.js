import {Model, Collection, channel} from 'backbone.toledo';
import _ from 'underscore';

const User = Model.extend({
  constructorName: 'User',
  initialize: function (options = {}) {
    if (!options.userId) throw new Error('a userId is required');
    this.userId = options.userId;
  },
  url: function () {
    return `/api/users/${this.userId}`
  }
});

const API = {
  getUser: _.memoize(function (userId = 'me') {
    return new User({userId: userId});
  })
};

channel.reply('user:entity', () => API.getUser());
