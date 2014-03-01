define [
  'jquery'
  'underscore'
  'backbone'
  'marionette'
  'msgbus'
  'lib/entities/model'
  'lib/entities/collection'
  'routes'
], ($, _, Backbone, Marionette, msgBus, Model, Collection, routes) ->

  class Nav extends Model

  class Navs extends Collection
    model: Nav

  API =
    getNavs: ->
      new Navs [
        { name: 'listEnrollments',    url: routes.listEnrollments }
        { name: 'addEnrollment',      url: routes.addEnrollments }
        { name: 'removeEnrollments',  url: routes.removeEnrollments }
      ]

  msgBus.reqres.setHandler 'nav:entities', ->
    API.getNavs()