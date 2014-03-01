define [
  'jquery'
  'underscore'
  'backbone'
  'marionette'
  'msgbus'
  'apps/header/list/controller'
], ($, _, Backbone, Marionette, msgBus, Controller) ->

  API =
    list: (navs) ->
      new Controller
        region: msgBus.request 'header:region'

  msgBus.commands.setHandler 'start:header:app', ->
    API.list