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
      listView = @getListView navs
      @show listView

    getListView: (navs) ->
      new views.Header
        collection: navs