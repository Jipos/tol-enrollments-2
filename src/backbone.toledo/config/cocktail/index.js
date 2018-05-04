// Monkeypatch Cocktail's mixin behaviour on all Backbone and Marionette classes

import Bb from 'backbone';
import Mn from 'backbone.marionette';
import Cocktail from 'backbone.cocktail';
import _ from 'underscore';

const mixinKeywords = ['beforeIncluded', 'afterIncluded'];

function mixin(...mixins) {
  const klass = this;

  mixins.forEach((mixin) => {
    // call the beforeIncluded method if it exists on our concern
    // the context of 'this' within beforeIncluded method will be
    // the prototype of our klass
    if (mixin.beforeIncluded) {
      mixin.beforeIncluded.call(klass.prototype, klass, mixin);
    }

    // mix the concern into our klasses prototype minus any
    // methods or properties in 'mixinKeywords'
    Cocktail.mixin(klass, _.omit(mixin, mixinKeywords));

    // call the afterIncluded method if it exists on our concern
    if (mixin.afterIncluded) {
      mixin.afterIncluded.call(klass.prototype, klass, mixin);
    }
  });

  // return the klass for chaining purposes
  return klass
}

const BackboneClassNames = [
  'Model',
  'Collection',
  'View',
  'Router',
  'History',
  'Marionette'
];
const MarionetteClassNames = [
  'Application',
  'AppRouter',
  'View',
  'CollectionView',
  'NextCollectionView',
  'CompositeView',
  'Behavior',
  'Region',
  'Error',
  'Object'
];

BackboneClassNames.forEach(function (className) {
  Bb[className].mixin = mixin;
});
MarionetteClassNames.forEach(function (className) {
  Mn[className].mixin = mixin;
});
