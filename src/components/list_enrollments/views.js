import Mn from 'backbone.marionette';

const EnrollmentView = Mn.View.extend({
  constructorName: 'EnrollmentView',
  template: function(data) {
    return `<p>listEnrollments: ${data.id}</p>`;
  },
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
