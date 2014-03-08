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
], ($, _, Backbone, Marionette, msgBus, ItemView, CompositeView, Layout, layoutTemplate) ->

  class EnrollmentsLayout extends Layout
    template: layoutTemplate

  Layout: EnrollmentsLayout