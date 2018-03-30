var _ = require('underscore');
var data = require('./data');
var learningUnits = data.learningUnits;

module.exports.getAll = function (req, res) {
  res.json(_.values(learningUnits))
};

module.exports.getOne = function (req, res) {
  res.json(learningUnits[req.params.id]);
};
