var userRoutes = require('./userRoutes');
var learningUnitRoutes = require('./learningUnitRoutes');
var enrollmentRoutes = require('./enrollmentRoutes');
var express = require('express');
var app = express();

// User Routes
app.get('/users', userRoutes.getAll);
app.get('/users/:id', userRoutes.getOne);

// LearningUnit routes
app.get('/learningunits', learningUnitRoutes.getAll);
app.get('/learningunits/:id', learningUnitRoutes.getOne);

// Enrollment routes
app.get('/enrollments', enrollmentRoutes.getMany);
app.get('/enrollment/:id', enrollmentRoutes.getOne);


module.exports = app
