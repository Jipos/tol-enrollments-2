define [
  'jquery'
  'underscore'
  'backbone'
  'marionette'
  'msgbus'
  'apps/header/list/controller'
], ($, _, Backbone, Marionette, msgBus, Controller) ->

  API =
    list: ->
      new Controller
        region: msgBus.request 'header:region'

  msgBus.setCommandHandler 'start:header:app', ->
    API.list()