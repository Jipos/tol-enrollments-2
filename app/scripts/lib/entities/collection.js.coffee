define [
  'jquery'
  'underscore'
  'backbone'
  'marionette'
  'msgbus'
], ($, _, Backbone, Marionette, msgBus) ->

  class Collection extends Backbone.Collection