import Bb from 'backbone';
import defaults from 'lodash/defaults';
import bind from 'lodash/bind';

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

  defaults(options, {
    beforeSend: bind(methods.beforeSend, entity),
    complete:   bind(methods.complete, entity)
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
