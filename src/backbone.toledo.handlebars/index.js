import Handlebars from 'handlebars/runtime';
import {translate} from 'backbone.toledo';

Handlebars.registerHelper('t', translate);
