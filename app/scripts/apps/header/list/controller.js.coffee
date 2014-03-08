define [
  'jquery'
  'underscore'
  'backbone'
  'marionette'
  'msgbus'
  'lib/controllers/application_controller'
  'apps/header/list/views'
], ($, _, Backbone, Marionette, msgBus, ApplicationController, views) ->

  class Controller extends ApplicationController

    initialize: ->
      navs = msgBus.request 'nav:entities'
      header = @getHeaderView navs
      @show header

    getHeaderView: (navs) ->
      header = new views.Header
        collection: navs

      @listenTo header, 'change:selected', (event) ->
        msgBus.trigger event

      header
