import Mn from 'backbone.marionette';
import Controller from './controller';
import {channel} from 'backbone.toledo';

const API = {
  show: () => new Controller({
    region: channel.request('header:region')
  })
}

channel.on('show:header:component', function () {
  API.show();
});
