import Mn from 'backbone.marionette';
import {channel} from 'backbone.toledo';

const headerRegion = new (Mn.Region.extend({constructorName: 'HeaderRegion'}))({el: 'body > div > header'});
const mainRegion = new (Mn.Region.extend({constructorName: 'MainRegion'}))({el: 'body > div > main'});
const footerRegion = new (Mn.Region.extend({constructorName: 'FooterRegion'}))({el: 'body > div > footer'});

channel.reply('header:region', () => headerRegion);
channel.reply('main:region', () => mainRegion);
channel.reply('footer:region', () => footerRegion);
channel.reply('default:region', () => mainRegion);
