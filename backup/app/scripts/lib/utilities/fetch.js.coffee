define [
  'jquery'
  'underscore'
  'backbone'
  'marionette'
  'msgbus'
], ($, _, Backbone, Marionette, msgBus) ->

  msgBus.setCommandHandler 'when:fetched', (entities, callback) ->
    xhrs = _.chain([entities]).flatten().pluck('_fetch').value()

    $.when(xhrs...).done ->
      callback()