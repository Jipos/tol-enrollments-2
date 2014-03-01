var _ = require('underscore');
var data = require('./data');
var enrollments = data.enrollments;

module.exports.getEnrollments = function (req, res) {
  if (req.query.userid) {
    res.json(_.filter(_.values(enrollments), function (enrollment) { return enrollment.user.id === req.query.userid; }));
  } else if (req.params.learningunitid) {
    res.json(_.filter(_.values(enrollments), function (enrollment) { return enrollment.learningUnit.id === req.query.learningunitid; }));
  } else {
    res.send('The shit has hit the fan', 404);
  }
};
