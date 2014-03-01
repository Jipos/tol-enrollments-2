define [
  'jquery'
  'underscore'
  'backbone'
  'marionette'
  'msgbus'
], ($, _, Backbone, Marionette, msgBus) ->

  root: 'listEnrollments'
  
  listEnrollments:    '#listEnrollments'
  addEnrollments:     '#addEnrollments'
  removeEnrollments:  '#removeEnrollments'