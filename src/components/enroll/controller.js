import {ApplicationController} from 'backbone.toledo';
import {EnrollView} from './views';
import Bb from 'backbone';

const EnrollController = ApplicationController.extend({

  constructorName: 'EnrollController',

  initialize: function() {
    const enrollView = this.getEnrollView();
    this.show(enrollView, {loading: true});
  },
  getEnrollView: function() {
    const model = new Bb.Model({val: Math.ceil(100 * Math.random())});
    return new EnrollView({model: model});
  }

});

export default EnrollController
