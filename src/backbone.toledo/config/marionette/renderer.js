import Mn from 'backbone.marionette';
import _ from 'underscore';

// Override Marionette's Renderer.render function in order to pass the view as a second parameter
// to the template function.
Mn.Renderer.render = function (template, data, view) {
  if (!_.isFunction(template)) {
    throw new Error({
      name: 'InvalidTemplateError',
      message: 'Cannot render the template since it is not a function.'
    });
  }

  const templateFunc = _.bind(template, view);

  return templateFunc(data);
}
