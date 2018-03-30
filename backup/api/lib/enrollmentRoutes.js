var _ = require('underscore');
var data = require('./data');
var enrollments = data.enrollments;

module.exports.getMany = function (req, res) {
  if (req.query.userid) {
    var userid = req.query.userid;
    userid = userid === 'me' ? 'q0064518' : userid;
    res.json(_.filter(_.values(enrollments), function (enrollment) { return enrollment.user.id === userid; }));
  } else if (req.query.learningunitid) {
    res.json(_.filter(_.values(enrollments), function (enrollment) { return enrollment.learningUnit.id === req.query.learningunitid; }));
  } else {
    res.send('The shit has hit the fan', 404);
  }
};

module.exports.getOne = function (req, res) {
  res.json(enrollments[req.params.id]);
};
