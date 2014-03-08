requirejs.config
  
  baseUrl: '/scripts'

  shim:
    jquery:
      exports: 'jQuery'
    underscore:
      exports: '_'
    backbone:
      deps: ['underscore', 'jquery']
      exports: 'Backbone'
    bootstrap:
      deps: ['jquery']

  paths:
    jquery: '../bower_components/jquery/jquery'
    backbone: '../bower_components/backbone/backbone'
    underscore: '../bower_components/underscore/underscore'

    # alias all marionette libs
    'backbone.wreqr': '../bower_components/backbone.wreqr/lib/amd/backbone.wreqr'
    'backbone.babysitter': '../bower_components/backbone.babysitter/lib/amd/backbone.babysitter'
    marionette: '../bower_components/backbone.marionette/lib/core/amd/backbone.marionette'

    # alias the bootstrap js lib
    bootstrap: '../bower_components/bootstrap/dist/js/bootstrap'

    # handlebars from the require handlerbars plugin below
    handlebars: '../bower_components/require-handlebars-plugin/hbs/handlebars'

    # require handlebars plugin - Alex Sexton
    #i18nprecompile: '../bower_components/require-handlebars-plugin/hbs/i18nprecompile'
    #json2: '../bower_components/require-handlebars-plugin/hbs/json2'
    hbs: '../bower_components/require-handlebars-plugin/hbs'

    # i18next
    # Version 1.7.x doesn't work in dist version (initialized not defined error), using 1.6.x instead
    # i18next: '../bower_components/i18next/release/i18next.amd.withJQuery-1.6.3'

    # alias css.js for css loading
    css: '../bower_components/require-css/css'
    normalize: '../bower_components/require-css/normalize'
    'css-builder': '../bower_components/require-css/css-builder'

  hbs:
    disableI18n: true
    helperPathCallback: (name) ->
      "lib/handlebars/helpers/#{name}"

  deps: [
    'bootstrap'

    'lib/backbone/sync'
    
    'lib/utilities/registry'
    'lib/utilities/fetch'
    
    'entities/abstract/navs'
    'entities/user_enrollments'
    
    'apps/header/header_app'
    'apps/enrollments/enrollments_app'
    
    'app'
  ]