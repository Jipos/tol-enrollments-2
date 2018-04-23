import './two.css';

function component() {
  var element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = 'component two ';
  element.classList.add('common');

  return element;
}

export default component;
