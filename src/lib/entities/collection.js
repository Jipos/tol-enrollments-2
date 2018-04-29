import Bb from 'backbone';
import defaults from 'lodash/defaults';
import clone from 'lodash/clone';
import omit from 'lodash/omit';
import bind from 'lodash/bind';

export const Collection = Bb.Collection.extend({

  fetch: function (options = {}) {
    defaults(options, {
      wait: true
    });

    Bb.Collection.prototype.fetch.apply(this, [options]);
  }

});
