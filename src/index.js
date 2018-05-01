import $ from 'jquery';
import Bb from 'backbone';
import Mn from 'backbone.marionette';

import {initialize} from 'lib';
initialize({channelName: 'something'});

// Register entities (for side effects)
import initializeEnrollments from 'entities/enrollments';

import './components/enroll'; // Register enroll component
import './components/list_enrollments'; // Register listEnrollments component
//import Pages from './pages'

initializeEnrollments();

window.Mn = Mn;
window.Bb = Bb;
window.jQuery = $;

$(function () {
  Backbone.history.start();
});
