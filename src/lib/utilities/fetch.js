import Bb from 'backbone';
import $ from 'jquery';
import flatten from 'lodash/flatten';
import map from 'lodash/map';
import defaults from 'lodash/defaults';

var _sync = Backbone.sync;

Backbone.sync = function (method, entity, options = {}) {
  var sync = _sync(method, entity, options);
  if (!entity._fetch && method === 'read') {
    entity._fetch = sync;
  }
  return sync;
}

Backbone.Model.prototype.isFetched = function () {
  return !!this._fetch;
}

Backbone.Collection.prototype.isFetched = function () {
  return !!this._fetch;
}

// Returns a promise which resolves when all of the specified entities are fetched
export function whenFetched (entities) {
  var xhrs = map(flatten([entities]), '_fetch');
  return $.when(...xhrs);
}
