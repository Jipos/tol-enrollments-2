import Bb from 'backbone';
import Mn from 'backbone.marionette';
import headerTemplate from './header.hbs';

const OptionView = Mn.View.extend({
  constructorName: 'OptionView',
  tagName: 'option',
  attributes: {name: 'optionview'},
  template: function (data) {
    return `<option>${data.name}</option>`;
  },
  onRender: function () {
    console.log('option rendered');
    // Remove wrapper element. This assumes the template contains only one root element.
    // this.$el = this.$el.children();
  }
})

const OptionsView = Mn.NextCollectionView.extend({
  constructorName: 'OptionsView',
  attributes: {name: 'optionsview'},
  childView: OptionView,
  tagName: 'optgroup',
});

const OptgroupView = Mn.View.extend({
  constructorName: 'OptgroupView',
  tagName: 'optgroup',
  attributes: {name: 'optgroupview'},
  template: () => '<optgroup></optgroup>',
  regions: {
    optgroup: {
      el: 'optgroup',
      replaceElement: true
    }
  },
  onRender: function () {
    this.showChildView('optgroup', new OptionsView({
      collection: new Bb.Collection(this.model.get('options'))
    }));
  }
})

const OptgroupsView = Mn.NextCollectionView.extend({
  constructorName: 'OptgroupsView',
  childView: OptgroupView,
  attributes: {name: 'optgroupsview'},
  tagName: 'select'
});

export const HeaderView = Mn.View.extend({
  constructorName: 'HeaderView',
  template: headerTemplate,
  attributes: {name: 'headerview'},
  regions: {
    links: {
      el: '.links',
      replaceElement: true
    }
  },
  onRender: function () {
    this.showChildView('links', new OptgroupsView({
      collection: this.collection,
    }));
  }
});
