import './style.css';

import one from './components/one';
import two from './components/two';

import printMe from './print.js';

import join from 'lodash/join';

import _ from 'lodash';

function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');

  element.innerHTML = join(['hello', 'webpacks'], ' '); //'Hello webpack';
  element.classList.add('hello');

  btn.innerHTML = _.join(['Click me and check the', 'console!'], ' ');
  btn.onclick = () => printMe();

  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());

document.body.appendChild(one());
document.body.appendChild(two());
