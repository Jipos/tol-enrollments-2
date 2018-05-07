import Bb from 'backbone';

import {ApplicationController, channel} from 'backbone.toledo';
import {HeaderView} from './views';

const HeaderController = ApplicationController.extend({

  constructorName: 'HeaderController',

  initialize: function() {
    const headerView = this.getHeaderView();
    this.show(headerView);
    channel.on('component:shown', function(componentName) {
      console.log('[header] component is shown: ' + componentName);
    })
  },

  getHeaderView: function() {
    // TODO: KR get model from somewhere
    const collection = new Bb.Collection([
      {id: 1, name: 'enroll', options: [
        {id: 11, name: 'foo-11'},
        {id: 12, name: 'foo-12'}
      ]},
      {id: 2, name: 'listEnrollments', options: [
        {id: 21, name: 'foo-21'},
        {id: 22, name: 'foo-22'}
      ]},
    ]);
    return new HeaderView({collection: collection});
  }

});

export default HeaderController
