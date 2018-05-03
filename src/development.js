/*
This file is only included during development.
It sets some debug options and exposes some globals.
*/

import $ from 'jquery';
window.jQuery = $;

import Bb from 'backbone';
window.Bb = Bb;

import Mn from 'backbone.marionette';
window.Mn = Mn;

import {channel} from 'backbone.toledo';
window.channel = channel;

import Radio from 'backbone.radio';
Radio.DEBUG = true;
