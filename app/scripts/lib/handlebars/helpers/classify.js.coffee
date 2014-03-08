define ['hbs/handlebars'], (Handlebars) ->

  classify = (value = '') ->
    value.toString().replace /[:_\.]/g, '-'

  Handlebars.registerHelper 'classify', classify

  classify
