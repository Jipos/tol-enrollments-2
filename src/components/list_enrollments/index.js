import Mn from 'backbone.marionette';
import Controller from './controller'

const API = {
  show: () => new Controller()
}

const ListEnrollmentsRouter = Mn.AppRouter.extend({
  appRoutes: {
    'listEnrollments': 'show'
  }
});

new ListEnrollmentsRouter({controller: API});
