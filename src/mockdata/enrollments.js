import mockjax from './mockjax';
import enrollments_me from './data/enrollments-me'

import take from 'lodash/take';

mockjax({
  url: '/api/enrollments/me',
  responseText: take(enrollments_me, 5),
  responseTime: 2000
});
