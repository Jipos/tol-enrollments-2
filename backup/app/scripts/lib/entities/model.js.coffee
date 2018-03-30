define [
  'jquery'
  'underscore'
  'backbone'
  'marionette'
  'msgbus'
], ($, _, Backbone, Marionette, msgBus) ->

  class Model extends Backbone.Model