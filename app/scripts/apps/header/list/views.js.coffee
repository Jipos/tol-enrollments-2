define [
  'jquery'
  'underscore'
  'backbone'
  'marionette'
  'msgbus'
  'lib/views/itemview'
  'lib/views/compositeview'
  'hbs!apps/header/list/templates/nav'
  'hbs!apps/header/list/templates/header'
], ($, _, Backbone, Marionette, msgBus, ItemView, CompositeView, navTemplate, headerTemplate) ->

  class Nav extends ItemView
    template: navTemplate

  class Header extends CompositeView
    template: headerTemplate
    itemView: Nav
    itemViewContainer: "#nav-links"

  Header: Header