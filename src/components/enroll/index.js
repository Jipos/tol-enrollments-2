import Mn from 'backbone.marionette';
import Controller from './controller'

const API = {
  show: () => new Controller()
}

const EnrollRouter = Mn.AppRouter.extend({
  appRoutes: {
    'enroll': 'show'
  }
});

new EnrollRouter({controller: API});
