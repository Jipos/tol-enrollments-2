import Bb from 'backbone';

import {ApplicationController} from 'backbone.toledo';
import {HeaderView} from './views';

const HeaderController = ApplicationController.extend({

  constructorName: 'HeaderController',

  initialize: function() {
    const headerView = this.getHeaderView();
    this.show(headerView);
  },

  getHeaderView: function() {
    // TODO: KR get model from somewhere
    const collection = new Bb.Collection([{id: 1, name: 'enroll'}, {id: 2, name: 'listEnrollments'}]);
    return new HeaderView({collection: collection});
  }

});

export default HeaderController
