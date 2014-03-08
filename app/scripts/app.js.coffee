define [
  'jquery'
  'underscore'
  'backbone'
  'marionette'
  'msgbus'
  'lib/utilities/navigation'
  'routes'
], ($, _, Backbone, Marionette, msgBus, navigation, routes) ->

  # Initialize regions
  headerRegion = new Marionette.Region el: '#header-region'
  mainRegion = new Marionette.Region el: '#main-region'
  footerRegion = new Marionette.Region el: '#footer-region'

  # Register region request handlers
  msgBus.setRequestHandler 'header:region', -> headerRegion
  msgBus.setRequestHandler 'main:region', -> mainRegion
  msgBus.setRequestHandler 'footer:region', -> footerRegion
  msgBus.setRequestHandler 'default:region', -> mainRegion

  # Start the application
  msgBus.setCommandHandler 'start:application', ->

    msgBus.execute 'start:header:app'
    msgBus.execute 'start:enrollments:app'

    # starts listening to Backbone History
    navigation.startHistory()

    # navigates us to the default route unless we're already navigated somewhere else
    navigation.navigate(routes.default, trigger: true) unless navigation.getCurrentRoute()

  $ ->
    # Prefetch user before starting application, to make sure the user is logged in
    # TODO loading enrollments now, change to loading user.
    enrollments = msgBus.request 'userEnrollments:entities'
    msgBus.execute 'when:fetched', enrollments, ->
      msgBus.execute 'start:application'

  # Expose msgBus for debugging. Find a way to disable this in production.
  window.msgBus = msgBus

  return