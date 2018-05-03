import Mn from 'backbone.marionette';
import enrollmentTemplate from './enrollment.hbs';

const EnrollmentView = Mn.View.extend({
  constructorName: 'EnrollmentView',
  template: enrollmentTemplate
})

export const ListEnrollmentsView = Mn.NextCollectionView.extend({
  constructorName: 'ListEnrollmentsView',
  childView: EnrollmentView,
  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
  },
  onRender: function () {
    console.log(this.cid, this.collection);
  }
});
