define [
  'jquery'
  'underscore'
  'backbone'
  'marionette'
  'msgbus'
  'lib/i18n/dictionary'
], ($, _, Backbone, Marionette, msgBus, dictionary) ->

  # navs
  
  'navgroup:all':
    en: 'Tools for everybody'
    nl: 'Tools voor iedereen'
  'enrollments:list':
    en: 'View my enrollments'
    nl: 'Toon mijn inschrijvingen'
  'enrollment:add':
    en: 'Enroll'
    nl: 'Schrijf in'
  'enrollments:remove':
    en: 'Unenroll'
    nl: 'Schrijf uit'

  'navgroup:staff':
    en: 'Only for staff'
    nl: 'Enkel voor personeel'
  'learningUnits:update:active':
    en: 'Courses & communities: availability'
    nl: 'Cursussen & communities: beschikbaarheid'
  'learningUnits:update:enrollPolicy':
    en: 'Courses & communities: security'
    nl: 'Cursussen & communities: beveiliging'
  'communities:add':
    en: 'Communities: create a new one'
    nl: 'Communities: maak een nieuwe aan'
  'communities:edit':
    en: 'Communities: manage'
    nl: 'Communities: beheer'
  
  'navgroup:helpdesk':
    en: 'Only for helpdesk'
    nl: 'Enkel voor helpdesk'
  'enrollments:list:user':
    en: 'Find another user\'s enrollments'
    nl: 'Zoek een andere gebruiker\'s inschrijvingen'
  
  'navgroup:admin':
    en: 'Only for local admin'
    nl: 'Enkel voor local admin'
  'enrollments:add:user':
    en: 'Enroll as instructor (by user)'
    nl: 'Schrijf in als docent (via gebruiker)'
  'enrollments:add:learningunit':
    en: 'Enroll as instructor (by course/community)'
    nl: 'Schrijf in als docent (via cursus/community)'
  'bcourses:add':
    en: 'B-courses: create'
    nl: 'B-cursussen: maak een nieuwe aan'
  'bcourses:edit':
    en: 'B-courses: manage'
    nl: 'B-courses: beheer'
  'enrollments:add:batch':
    en: 'Batch enroll users'
    nl: 'Schrijf gebruikers in batch in'
  'previewuser:edit':
    en: 'Preview tabs and modules'
    nl: 'Preview tabs en modules'
