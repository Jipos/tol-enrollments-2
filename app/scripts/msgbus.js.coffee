define ['underscore', 'backbone.wreqr'], (_, Wreqr) ->

  reqres =   new Wreqr.RequestResponse()
  commands = new Wreqr.Commands()
  events =   new Wreqr.EventAggregator()

  reqres:   reqres,
  commands: commands,
  events: events,
  # Shortcuts for 'trigger' functions
  request: _.bind(reqres.request, reqres),
  execute: _.bind(commands.execute, commands),
  trigger: _.bind(events.trigger, events)