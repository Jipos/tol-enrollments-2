import {Model} from 'lib';
import {Collection} from 'lib';
import Radio from 'backbone.radio';
import memoize from 'lodash/memoize';
import extend from 'lodash/extend';

import {channel} from 'lib';

import mockjax from 'lib/utilities/mockjax';
import enrollments_me from 'entities/enrollments-me'

mockjax({
  url: '/api/enrollments/me',
  responseText: enrollments_me,
  responseTime: 2000
});

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
