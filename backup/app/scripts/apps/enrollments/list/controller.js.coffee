define [
  'jquery'
  'underscore'
  'backbone'
  'marionette'
  'msgbus'
  'lib/controllers/application_controller'
  'apps/enrollments/list/views'
  'backbone.projections'
], ($, _, Backbone, Marionette, msgBus, ApplicationController, views, projections) ->

  class Controller extends ApplicationController

    initialize: ->
      enrollments = msgBus.request 'userEnrollments:entities'
      
      @layout = @getLayoutView()

      @listenTo @layout, "show", =>
        # @filterRegion()
        @enrollmentsRegion enrollments

      msgBus.execute 'when:fetched', enrollments, =>
        @show @layout

    # Render the filter region
    filterRegion: (enrollments) ->
      filterView = @getFilterView enrollments

      @show filterView, region: @layout.filterRegion

    # Render the enrollments region
    enrollmentsRegion: (enrollments) ->
      enrollmentsView = @getEnrollmentsView enrollments

      @show enrollmentsView, region: @layout.enrollmentsRegion

    getFilters: (enrollments) ->
      # TODO extract filters from enrollments
      enrollments

    getFilterView: (filters) ->
      new views.Filter
        collection: filters

    getEnrollmentsView: (enrollments) ->
      new views.Enrollments
        collection: enrollments

    getLayoutView: ->
      new views.Layout()
