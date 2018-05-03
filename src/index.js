import 'bootstrap/scss/bootstrap.scss';
import './main.scss';

import $ from 'jquery';
import Bb from 'backbone';
import Mn from 'backbone.marionette';

import Radio from 'backbone.radio';

// for side effects (e.g. the registry).
import 'lib';

// Register entities (for side effects)
import 'entities/enrollments';

import './components/enroll'; // Register enroll component
import './components/list_enrollments'; // Register listEnrollments component
//import Pages from './pages'

$(function () {
  Backbone.history.start();
});

// TODO: KR find a way to do this using webpack. So that it can be added in the dev build,
// but removed in the production build.

Radio.DEBUG = true;

import './mockdata';

window.Mn = Mn;
window.Bb = Bb;
window.jQuery = $;
