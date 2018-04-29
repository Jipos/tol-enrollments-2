import {ApplicationController} from 'lib/application_controller';
import {CollectionView} from './views';
import Bb from 'backbone';
import random from 'lodash/random';
import times from 'lodash/times';
import uniqueId from 'lodash/uniqueId'

const ListEnrollmentsController = ApplicationController.extend({

  initialize: function() {
    const enrollments = this.getChannel().request('enrollment:entities');
    const listEnrollmentsView = this.getListEnrollmentsView(enrollments);
    console.log('listEnrollmentsController', enrollments, listEnrollmentsView);
    this.show(listEnrollmentsView, {loading: true});
  },

  getListEnrollmentsView: function(enrollments) {
    return new CollectionView({collection: enrollments});
  }

});

export default ListEnrollmentsController
