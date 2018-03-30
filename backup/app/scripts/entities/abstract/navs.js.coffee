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

  class NavGroup extends Model

  class NavGroups extends Collection
    model: NavGroup

  API =
    getNavGroups: ->
      new NavGroups [

        name: 'navgroup:all'
        navs: new Navs [
          name: 'enrollments:list'
          event: 'app:enrollments:list'
        ,
          name: 'enrollment:add'
          event: 'app:enrollments:add'
        ,
          name: 'enrollments:remove'
          event: 'app:enrollments:remove'
        ]
      ,
        name: 'navgroup:staff'
        navs: new Navs [
          name: 'learningUnits:update:active'
          event: 'app:learningUnits:update:active'
        ,
          name: 'learningUnits:update:enrollPolicy'
          event: 'app:learningUnits:update:enrollPolicy'
        ,
          name: 'communities:add'
          event: 'app:communities:add'
        ,
          name: 'communities:edit'
          event: 'app:communities:edit'
        ]
      ,
        name: 'navgroup:helpdesk'
        navs: new Navs [
          name: 'enrollments:list:user'
          event: 'app:enrollments:list:user'
        ]
      ,
        name: 'navgroup:admin'
        navs: new Navs [
          name: 'enrollments:add:user'
          event: 'app:enrollments:add:user'
        ,
          name: 'enrollments:add:learningunit'
          event: 'app:enrollments:add:learningunit'
        ,
          name: 'bcourses:add'
          event: 'app:bcourses:add'
        ,
          name: 'bcourses:edit'
          event: 'app:bcourses:edit'
        ,
          name: 'enrollments:add:batch'
          event: 'app:enrollments:add:batch'
        ,
          name: 'previewuser:edit'
          event: 'app:previewuser:edit'
        ]

      ]

  msgBus.setRequestHandler 'nav:entities', ->
    API.getNavGroups()
