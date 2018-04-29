import Mn from 'backbone.marionette';

export const CollectionView = Mn.NextCollectionView.extend({
  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
  },
  template: function(data) {
    return `<h2>listEnrollments: ${data.val}</h2>`;
  },
  onRender: function () {
    console.log(this.cid, this.model.get('val'));
  }
});
