define [
  'jquery'
  'underscore'
  'backbone'
  'marionette'
  'msgbus',
  'urls'
  'lib/entities/model'
  'lib/entities/collection'
], ($, _, Backbone, Marionette, msgBus, urls, Model, Collection) ->

  class UserEnrollment extends Model
    urlRoot: -> urls.enrollments

  class UserEnrollments extends Collection
    model: UserEnrollment

    initialize: (models, options) ->
      {@userId} = options

    url: -> "#{urls.enrollments}?userid=#{@userId}"


  API =
    getUserEnrollments: (userId) ->
      userEnrollments = new UserEnrollments [], userId: userId
      userEnrollments.fetch reset: true
      userEnrollments

  msgBus.setRequestHandler 'userEnrollments:entities', (userId = 'me') ->
    API.getUserEnrollments userId