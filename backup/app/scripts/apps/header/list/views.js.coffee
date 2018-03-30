define [
  'jquery'
  'underscore'
  'backbone'
  'marionette'
  'msgbus'
  'lib/views/itemview'
  'lib/views/compositeview'
  'hbs!apps/header/list/templates/nav'
  'hbs!apps/header/list/templates/navgroup'
  'hbs!apps/header/list/templates/header'
  'css!apps/header/list/templates/header'
], ($, _, Backbone, Marionette, msgBus, ItemView, CompositeView, navTemplate, navgroupTemplate, headerTemplate) ->

  class Nav extends ItemView
    template: navTemplate
    
    onRender: ->
      # get rid of that pesky wrapping-div, assumes 1 child element
      @setElement @$el.children()

  class NavGroup extends CompositeView
    template: navgroupTemplate
    itemView: Nav
    itemViewContainer: 'optgroup'

    onRender: ->
      # get rid of that pesky wrapping-div, assumes 1 child element
      @setElement @$el.children()

  class Header extends CompositeView
    template: headerTemplate
    itemView: NavGroup
    itemViewContainer: "select"

    itemViewOptions: (model) ->
      collection: model.get 'navs'

    events:
      'change': 'triggerEvent'

    ui:
      navs: 'select'

    triggerEvent: ->
      @trigger 'change:selected', @ui.navs.val()

  Header: Header
