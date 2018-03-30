define [
  'jquery'
  'underscore'
  'backbone'
  'marionette'
  'msgbus'
], ($, _, Backbone, Marionette, msgBus) ->

  default: 'listEnrollments'
  
  listEnrollments:    '#listEnrollments'
  addEnrollments:     '#addEnrollments'
  removeEnrollments:  '#removeEnrollments'