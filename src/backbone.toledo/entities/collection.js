import Bb from 'backbone';
import _ from 'underscore';

export default Bb.Collection.extend({

  constructorName: 'Collection',

  fetch: function (options = {}) {
    _.defaults(options, {
      wait: true
    });

    Bb.Collection.prototype.fetch.apply(this, [options]);
  }

});
