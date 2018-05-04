import Mn from 'backbone.marionette';
import Controller from './controller';
import {channel} from 'backbone.toledo';

const API = {
  show: () => new Controller()
}

const EnrollRouter = Mn.AppRouter.extend({
  appRoutes: {
    'enroll': 'show'
  }
});

const router = new EnrollRouter({controller: API});

channel.on('show:enroll:component', function () {
  router.navigate('enroll', {trigger: true});
});
