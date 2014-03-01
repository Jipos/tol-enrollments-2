
var users = {
  'q0064518': {id: 'q0064518', firstname: 'Kevin', lastname: 'Rogiers'},
  'q0000000': {id: 'q0000000', firstname: 'Foo', lastname: 'Bar'}
}

var learningUnits = {
  'h123a': {id: 'h123a', title: 'Math 101', active: true},
  'j234b': {id: 'j234b', title: 'Physics 101', active: false}
};

var enrollments = {
  '1': {id: '1', role: 'Instructor', user: users['q0064518'], learningUnit: learningUnits['h123a']},
  '2': {id: '2', role: 'TeachingAssistant', user: users['q0064518'], learningUnit: learningUnits['j234b']},
  '3': {id: '3', role: 'Learner', user: users['q0000000'], learningUnit: learningUnits['h123a']}
};

module.exports = {
  users: users,
  learningUnits: learningUnits,
  enrollments: enrollments
};
