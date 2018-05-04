import Handlebars from 'handlebars/runtime';
import {translate} from 'i18n';

Handlebars.registerHelper('t', translate);
