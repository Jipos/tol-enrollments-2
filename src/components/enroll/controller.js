import {ApplicationController} from 'lib/application_controller';
import {EnrollView} from './views';
import Bb from 'backbone';
import random from 'lodash/random';

const EnrollController = ApplicationController.extend({

  initialize: function() {
    console.log('enrollController');
    const enrollView = this.getEnrollView();
    this.show(enrollView, {loading: true});
  },
  getEnrollView: function() {
    const model = new Bb.Model({val: random(1,100)});
    return new EnrollView({model: model});
  }

});

export default EnrollController
