define [
  'jquery'
  'underscore'
  'backbone'
  'marionette'
  'msgbus'
], ($, _, Backbone, Marionette, msgBus) ->

  registry = {}

  API =

    register: (instance, id) ->
      registry[id] = instance

    unregister: (instance, id) ->
      delete registry[id]

    resetRegistry: ->
      oldCount = _.size(registry)
      for key, controller of registry
        controller.region.close()

      result =
        count: _.size(registry)
        previous: oldCount
        msg: 'There were #{oldCount} controllers in the registry, there are now #{getRegistrySize()}'

      console.info result
      result

    getRegistry: ->
      registry

  msgBus.commands.setHandler 'register:instance', (instance, id) ->
    API.register instance, id # if App.environment is 'development'

  msgBus.commands.setHandler 'unregister:instance', (instance, id) ->
    API.unregister instance, id # if App.environment is 'development'

  msgBus.reqres.setHandler 'reset:registry', ->
    API.resetRegistry()

  msgBus.reqres.setHandler 'get:registry', ->
    API.getRegistry()
