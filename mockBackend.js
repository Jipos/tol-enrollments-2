// Export the MockBackend middleware
module.exports = function(app) {
  app.get('/users/me', function (req, res) {
    return res.json({id: 123, userid: 'u0076006', firstName: 'Kevin', lastName: 'Rogiers'});
  });
}
