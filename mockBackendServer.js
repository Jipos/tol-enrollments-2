const express = require('express');
const app = express();

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});

app.get('/users/me', function (req, res) {
  return res.json({id: 123, userid: 'u0076006', firstName: 'Kevin', lastName: 'Rogiers'});
});
