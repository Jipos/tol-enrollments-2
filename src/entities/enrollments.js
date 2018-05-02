import {Model, Collection, channel} from 'lib';
import memoize from 'lodash/memoize';
import extend from 'lodash/extend';

const Enrollment = Model.extend({
  constructorName: 'Enrollment'
});

const Enrollments = Collection.extend({
  constructorName: 'Enrollments',
  model: Enrollment,
  initialize: function (options = {}) {
    if (!options.userId) throw new Error('a userId is required');
    this.userId = options.userId;
  },
  url: function () {
    return `/api/enrollments/${this.userId}`
  }
});

const API = {
  // Cache loaded enrollments for 5 minutes (note that there's no way to alter this behaviour).
  // TODO: KR do we need a way to force a reload?
  // TODO: KR is there ever a need to create a new Collection? We might want to re-fetch it.
  //       but the existing Collection should be fine.
  getEnrollments: memoize(function (userId = 'me') {
    return new Enrollments({userId: userId});
  })
};

channel.reply('enrollment:entities', () => API.getEnrollments());
