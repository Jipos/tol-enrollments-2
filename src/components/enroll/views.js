import Mn from 'backbone.marionette';

export const EnrollView = Mn.View.extend({
  template: function(data) {
    return `<h2>test: ${data.val}</h2>`;
  }
});
