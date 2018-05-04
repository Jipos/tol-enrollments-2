import 'bootstrap/scss/bootstrap.scss';
import 'bootstrap'

import './main.scss';

import './utilities/handlebars';

import {customize as customizeI18n} from 'i18n';
customizeI18n({
  availableLanguages: ['en', 'nl'],
  defaultLanguage: 'nl'
});

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

import $ from 'jquery';
import Bb from 'backbone';
$(function () {
  Bb.history.start();
});
