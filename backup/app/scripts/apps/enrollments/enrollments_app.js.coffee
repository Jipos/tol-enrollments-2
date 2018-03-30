define [
  'jquery'
  'underscore'
  'backbone'
  'marionette'
  'msgbus'
  'apps/enrollments/list/controller'
], ($, _, Backbone, Marionette, msgBus, Controller) ->

  API =
    list: ->
      new Controller

  msgBus.setCommandHandler 'start:enrollments:app', ->
    API.list()