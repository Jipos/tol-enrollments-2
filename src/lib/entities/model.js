import Bb from 'backbone';
import defaults from 'lodash/defaults';
import clone from 'lodash/clone';
import omit from 'lodash/omit';
import bind from 'lodash/bind';

export const Model = Bb.Model.extend({

  destroy: function (options = {}) {
    defaults(options, {wait: true});

    this.set({_destroy: true});
    Bb.Model.prototype.destroy.apply(this, [options]);
  },

  isDestroyed: function () {
    return this.get('_destroy');
  },

  save: function (data, options = {}) {
    var isNew = this.isNew();

    defaults(options, {
      wait: true,
      success: bind(this.saveSuccess, this, isNew, options.collection, options.callback),
      error: bind(this.saveError, this)
    });

    this.unset('_errors');

    data = data || clone(this.attributes);
    data = omit(data, this.blacklist);

    Bb.Model.prototype.save.apply(this, [data, options]);
  },

  saveSuccess: function (isNew, collection, callback) {
    if (isNew) { // model is being created
      collection && collection.add(this);
      collection && collection.trigger('model:created', this);
      this.trigger('created', this);
    } else { // model is being updated
      // if model has collection property defined, use that if no collection option exists
      collection = collection || this.collection
      collection && collection.trigger('model:updated', this);
      this.trigger('updated', this);
    }
    callback && callback();
  },

  saveError: function (model, xhr, options) {
    // set errors directly on the model unless status returned was 500 or 404
    if (!/500|404/.test(xhr.status)) {
      // TODO: KR parsing the responseText can throw an exception?
      // This seems to expect the error responses to contain valid JSON
      var response = JSON.parse(xhr.responseText);
      var errors = response && response.errors;
      this.set({_errors: errors})
    }
  }

});
