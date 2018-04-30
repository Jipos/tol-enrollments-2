import $ from 'jquery';
import Bb from 'backbone';
import Mn from 'backbone.marionette';

import {initialize} from 'lib';
initialize({channelName: 'foobar'});

// Register entities (for side effects)
import 'entities/enrollments';

import './components/enroll'; // Register enroll component
import './components/list_enrollments'; // Register listEnrollments component
//import Pages from './pages'

window.Mn = Mn;
window.Bb = Bb;
window.jQuery = $;

Backbone.history.start();
