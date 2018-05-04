import Mn from 'backbone.marionette';
import Controller from './controller';
import {channel} from 'backbone.toledo';

import {addTranslations} from 'i18n';
addTranslations({
  welcome: {
    nl: 'Welkom',
    en: 'Welcome'
  }
});

const API = {
  show: () => new Controller()
}

const ListEnrollmentsRouter = Mn.AppRouter.extend({
  appRoutes: {
    'listEnrollments': 'show'
  }
});

const router = new ListEnrollmentsRouter({controller: API});

channel.on('start:listEnrollments:app', function () {
  router.navigate('listEnrollments', {trigger: true});
});
