import $ from 'jquery';
import Bb from 'backbone';
import Mn from 'backbone.marionette';

import Radio from 'backbone.radio';

// Turn on debug mode (log unhandled requests)
Radio.DEBUG = true;

// import utilities for side-effects (e.g. extending libraries)
import 'lib/marionette.renderer';
import 'lib/utilities/fetch';

import 'lib/components/loading';

// Register entities (for side effects)
import 'entities/enrollments';

import './components/enroll'; // Register enroll component
import './components/list_enrollments'; // Register listEnrollments component
//import Pages from './pages'

window.Mn = Mn;
window.Bb = Bb;
window.jQuery = $;

Backbone.history.start();
