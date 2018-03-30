define ['hbs/handlebars', 'lib/i18n/i18n'], (Handlebars, t) ->

  Handlebars.registerHelper 't', t

  t
