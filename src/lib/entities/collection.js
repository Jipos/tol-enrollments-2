import Bb from 'backbone';
import defaults from 'lodash/defaults';

export default Bb.Collection.extend({

  constructorName: 'Collection',

  fetch: function (options = {}) {
    defaults(options, {
      wait: true
    });

    Bb.Collection.prototype.fetch.apply(this, [options]);
  }

});
