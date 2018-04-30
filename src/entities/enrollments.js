import {Model} from 'lib/entities/model';
import {Collection} from 'lib/entities/collection';
import memoize from 'timed-memoize';
import Radio from 'backbone.radio';

import mockjax from 'lib/utilities/mockjax';
import enrollments_me from 'entities/enrollments-me'

mockjax({
  url: '/api/enrollments/me',
  responseText: enrollments_me,
  responseTime: 2000
});

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
  // TODO: KR is there ever a need to create a new Collection? We might want to re-fetch it.
  //       but the existing Collection should be fine.
  getEnrollments: memoize(function (userId = 'me') {
    var enrollments = new Enrollments({userId: userId});
    enrollments.fetch({reset: true});
    return enrollments;
  }, {timeout: 300000, hot: false})
};

// TODO: KR make all lib utilities use the same channel. Make this channelName configurable.
// And get it from somewhere, instead of just 'knowing' it here.
Radio.channel('foobar').reply('enrollment:entities', () => API.getEnrollments());
