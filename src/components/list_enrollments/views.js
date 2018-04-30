import Mn from 'backbone.marionette';

const ItemView = Mn.View.extend({
  template: function(data) {
    return `<p>listEnrollments: ${data.id}</p>`;
  },
})

export const CollectionView = Mn.NextCollectionView.extend({
  childView: ItemView,
  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
  },
  onRender: function () {
    console.log(this.cid, this.collection);
  }
});
