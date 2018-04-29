import Mn from 'backbone.marionette';

export const EnrollView = Mn.View.extend({
  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },
  template: function(data) {
    console.log(this.model);
    return `<h2>test: ${data.val}</h2>`;
  },
  onRender: function () {
    console.log(this.cid, this.model.get('val'));
  }
});
