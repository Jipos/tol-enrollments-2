import {ApplicationController} from 'backbone.toledo';
import {EnrollView} from './views';
import Bb from 'backbone';
import random from 'lodash/random';

const EnrollController = ApplicationController.extend({

  constructorName: 'EnrollController',

  initialize: function() {
    const enrollView = this.getEnrollView();
    this.show(enrollView, {loading: true});
  },
  getEnrollView: function() {
    const model = new Bb.Model({val: random(1,100)});
    return new EnrollView({model: model});
  }

});

export default EnrollController
