import Bb from 'backbone';
import Mn from 'backbone.marionette';

// Hack to set the constructor name of extended classes
// Altered version of the 'Named Constructors' feature onsi/coccyx provides
// (https://github.com/onsi/coccyx)

// Using Coffeescript 1.x you'd get this for free, but with normal JS extend, you don't.
// Using ES6 classes give you this too, but this doesn't allow classes to have properties
// (at least not using the class syntax).
// Properties can be added to the class prototype later, but declaring your class in 2 steps
// seems undesirable. Also, using classs, forces you to call super first in the subclass
// constructor, which is not always what we want.

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

// Function name validation regex, from https://stackoverflow.com/a/2008444
function validateConstructorName(constructorName) {
  if (!/^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/.test(constructorName)) {
    throw new Error(`An invalid constructorName was specified: '${constructorName}'`)
  }
}

const originalExtend = Backbone.Model.extend;
const extendWithConstructorName = function(protoProps, classProps) {
  const parent = this;
  if (protoProps.constructorName && !protoProps.hasOwnProperty('constructor')) {
    validateConstructorName(protoProps.constructorName);
    eval("protoProps.constructor = function " + protoProps.constructorName + " () { parent.apply(this, arguments) };");
  }
  return originalExtend.call(parent, protoProps, classProps);
}
BackboneClassNames.forEach(function (className) {
  Bb[className].extend = extendWithConstructorName;
});
MarionetteClassNames.forEach(function (className) {
  Mn[className].extend = extendWithConstructorName;
});
