define [
  'jquery'
  'underscore'
  'backbone'
  'marionette'
  'msgbus'
], ($, _, Backbone, Marionette, msgBus) ->

    navigate: (route, options = {}) ->
      Backbone.history.navigate route, options
    ,
    getCurrentRoute: ->
      frag = Backbone.history.fragment
      if _.isEmpty(frag) then null else frag
    ,
    startHistory: ->
      if Backbone.history
        Backbone.history.start()
