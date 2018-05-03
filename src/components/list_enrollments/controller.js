import {ApplicationController} from 'backbone.toledo';
import {ListEnrollmentsView} from './views';
import Bb from 'backbone';
import random from 'lodash/random';
import times from 'lodash/times';
import uniqueId from 'lodash/uniqueId';

import Mn from 'backbone.marionette';

const ListEnrollmentsController = ApplicationController.extend({

  constructorName: 'ListEnrollmentsController',

  initialize: function() {
    const enrollments = this.getChannel().request('enrollment:entities');
    enrollments.fetch({reset: true});
    const listEnrollmentsView = this.getListEnrollmentsView(enrollments);
    this.show(listEnrollmentsView, {loading: true});
  },

  getListEnrollmentsView: function(enrollments) {
    return new ListEnrollmentsView({collection: enrollments});
  }

});

export default ListEnrollmentsController
