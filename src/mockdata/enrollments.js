import mockjax from './mockjax';
import enrollments_me from './data/enrollments-me'

mockjax({
  url: '/api/enrollments/me',
  responseText: enrollments_me,
  responseTime: 2000
});
