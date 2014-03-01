define [
  'jquery'
  'underscore'
  'backbone'
  'marionette'
  'msgbus'
  'lib/views/itemview'
  'lib/views/compositeview'
], ($, _, Backbone, Marionette, msgBus) ->

  class ItemView extends Marionette.ItemView