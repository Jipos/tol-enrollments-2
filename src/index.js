import 'bootstrap/scss/bootstrap.scss';
import './main.scss';

import './backbone.toledo.handlebars';

import $ from 'jquery';
import Bb from 'backbone';

// for side effects (e.g. the registry).
// import 'lib';
// NOTE: KR the current backbone.toledo lib is setup in such a way, that it doesn't require
// an import for side-effects. As long as your project uses at least 1 of it's components.
// This works, because the entire lib is exported as a whole and using 1 of it's components
// required loading all of it and this will initialize the lib.

// Register entities (for side effects)
import './entities/enrollments';

import './components/enroll'; // Register enroll component
import './components/list_enrollments'; // Register listEnrollments component
//import Pages from './pages'

$(function () {
  Bb.history.start();
});
