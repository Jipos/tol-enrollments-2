import Mn from 'backbone.marionette';
import headerTemplate from './header.hbs';

const HeaderLinkView = Mn.View.extend({
  constructorName: 'HeaderLinkView',
  tagName: 'span',
  template: function (data) {
    return ` | ${data.name}`;
  }
})

export const HeaderLinksView = Mn.NextCollectionView.extend({
  constructorName: 'HeaderLinksView',
  childView: HeaderLinkView
});

export const HeaderView = Mn.View.extend({
  constructorName: 'HeaderView',
  template: headerTemplate,
  regions: {
    links: {
      el: '.links',
      replace: true
    }
  },
  onRender: function () {
    this.showChildView('links', new HeaderLinksView({
      collection: this.collection
    }));
  }
});
