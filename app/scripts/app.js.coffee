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
  msgBus.reqres.setHandler 'header:region', -> headerRegion
  msgBus.reqres.setHandler 'main:region', -> mainRegion
  msgBus.reqres.setHandler 'footer:region', -> footerRegion
  msgBus.reqres.setHandler 'default:region', -> defaultRegion

  # Start the application
  msgBus.commands.setHandler 'start:application', ->

    msgBus.execute 'start:header:app'

    # starts listening to Backbone History
    navigation.startHistory()

    # navigates us to the root route unless we're already navigated somewhere else
    navigation.navigate(routes.root, trigger: true) unless navigation.getCurrentRoute()

  $ ->
    msgBus.execute 'start:application'

  return