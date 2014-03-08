define [
  'jquery'
  'underscore'
  'backbone'
  'marionette'
  'msgbus'
  'lib/controllers/application_controller'
  'apps/enrollments/list/views'
], ($, _, Backbone, Marionette, msgBus, ApplicationController, views) ->

  class Controller extends ApplicationController

    initialize: ->
      enrollments = msgBus.request 'userEnrollments:entities'
      
      layout = @getLayoutView()
      
      msgBus.execute 'when:fetched', enrollments, =>
        @show layout


    getLayoutView: ->
      new views.Layout()