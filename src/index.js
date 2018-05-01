import $ from 'jquery';
import Bb from 'backbone';
import Mn from 'backbone.marionette';

import Radio from 'backbone.radio';

import 'lib';

// Register entities (for side effects)
import 'entities/enrollments';

import './components/enroll'; // Register enroll component
import './components/list_enrollments'; // Register listEnrollments component
//import Pages from './pages'

Radio.DEBUG = true;

window.Mn = Mn;
window.Bb = Bb;
window.jQuery = $;

$(function () {
  Backbone.history.start();
});
