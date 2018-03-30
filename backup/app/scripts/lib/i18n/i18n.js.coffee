define [
  'jquery'
  'underscore'
  'backbone'
  'marionette'
  'msgbus'
  'lib/i18n/dictionary'
], ($, _, Backbone, Marionette, msgBus, dictionary) ->

  # Extract the locale from the url parameters
  getLanguage = ->
    # http://www.jquery4u.com/snippets/url-parameters-jquery/
    results = new RegExp('[\\?&amp;]lang=([^&amp;#]*)').exec window.location.href
    language = (results && results[1]) || 0
    # http://stackoverflow.com/a/18568917/2201792
    availableLanguages = ['en', 'nl']
    # 'en' is default locale
    if availableLanguages.indexOf(language) >= 0 then language else 'en'
  
  # collect all translations for the current language
  translations = do ->
      language = getLanguage()
      results = {}
      _.each dictionary, (translations, key) ->
        results[key] = translations[language]
      results

  # Return a translation function for the current language
  (key) ->
    translations[key] or '!' + key