define [
  'jquery'
  'underscore'
  'backbone'
  'marionette'
  'msgbus'
  'lib/views/itemview'
  'lib/views/compositeview'
], ($, _, Backbone, Marionette, msgBus) ->

  class Layout extends Marionette.Layout