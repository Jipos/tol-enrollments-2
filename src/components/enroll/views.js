import Mn from 'backbone.marionette';
import enrollTemplate from './enroll.hbs'

export const EnrollView = Mn.View.extend({
  constructorName: 'EnrollView',
  template: enrollTemplate
});
