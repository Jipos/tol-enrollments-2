import mockjax from './mockjax';
import users_me from './data/users-me'

mockjax({
  url: '/api/users/me',
  responseText: users_me,
  responseTime: 1000
});
