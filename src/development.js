/*
This file is only included during development.
It sets some debug options and exposes some globals.
*/

import $ from 'jquery';
window.$ = $;

import Bb from 'backbone';
window.Bb = Bb;

import Mn from 'backbone.marionette';
window.Mn = Mn;

import {channel} from 'backbone.toledo';
window.channel = channel;

import Radio from 'backbone.radio';
Radio.DEBUG = true;

import {customize as customizeI18n} from 'i18n';
customizeI18n({
  debug: true
});
