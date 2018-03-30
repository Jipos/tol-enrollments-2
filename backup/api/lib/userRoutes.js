var _ = require('underscore');
var data = require('./data');
var users = data.users;

module.exports.getAll = function (req, res) {
  res.json(_.values(users));
};

module.exports.getOne = function (req, res) {
  res.json(users[req.params.id]);
};
