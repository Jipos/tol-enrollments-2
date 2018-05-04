import Bb from 'backbone';
import _ from 'underscore';

var _sync = Bb.sync;

const methods = {
  beforeSend: function () {
    this.trigger('sync:start', this);
  },
  complete: function () {
    this.trigger('sync:stop', this);
  }
};

Bb.sync = function (method, entity, options = {}) {

  _.defaults(options, {
    beforeSend: _.bind(methods.beforeSend, entity),
    complete:   _.bind(methods.complete, entity)
  });
  var sync = _sync(method, entity, options);
  if (!entity._fetch && method === 'read') {
    entity._fetch = sync;
  }
  return sync;
}

Bb.Model.prototype.isFetched = function () {
  return !!this._fetch;
}

Bb.Collection.prototype.isFetched = function () {
  return !!this._fetch;
}
