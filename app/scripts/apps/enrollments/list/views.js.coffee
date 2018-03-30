define [
  'jquery'
  'underscore'
  'backbone'
  'marionette'
  'msgbus'
  'lib/views/itemview'
  'lib/views/compositeview'
  'lib/views/layout'
  'hbs!apps/enrollments/list/templates/layout'
  'hbs!apps/enrollments/list/templates/filter'
  'hbs!apps/enrollments/list/templates/enrollments'
  'hbs!apps/enrollments/list/templates/filterWrapper'
], ($, _, Backbone, Marionette, msgBus, ItemView, CompositeView, Layout, layoutTemplate, filterTemplate, enrollmentsTemplate, filterWrapperTemplate) ->

  class EnrollmentsLayout extends Layout
    template: layoutTemplate

    regions:
      filterRegion:      '#filter-region'
      enrollmentsRegion: '#enrollments-region'

  class Filter extends ItemView #CompositeView
    template: filterTemplate

  class Enrollments extends ItemView # CompositeView
    template: enrollmentsTemplate

  class EnrollmentsFilterWrapper extends Layout
    template: filterWrapperTemplate

  Layout: EnrollmentsLayout
  Filter: Filter
  Enrollments: Enrollments