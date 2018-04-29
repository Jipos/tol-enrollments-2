import {Model} from 'lib/entities/model';
import {Collection} from 'lib/entities/collection';
import memoize from 'timed-memoize';
import Radio from 'backbone.radio';

import mockjax from 'lib/utilities/mockjax';
import enrollments_me from 'entities/enrollments-me'

mockjax({
  url: '/api/enrollments/me',
  responseText: enrollments_me
})

const Enrollment = Model.extend({

});

const Enrollments = Collection.extend({
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
  // TODO: KR how about loading enrollments for other users?
  getEnrollments: memoize(function () {
    var enrollments = new Enrollments({userId: 'me'});
    enrollments.fetch({reset: true});
    return enrollments;
  }, {timeout: 300000, hot: false})
};

// TODO: KR make all lib utilities use the same channel. Make this channelName configurable.
// And get it from somewhere, instead of just 'knowing' it here.
Radio.channel('toledo').reply('enrollment:entities', () => API.getEnrollments());
