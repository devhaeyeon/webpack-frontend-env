import '../css/index.css';
import test from './ui.js';
import template from '../numberList.handlebars';

const title = 'Webpack Configuration';
const $el = document.getElementById('root');
$el.innerHTML = `<h1>Hello World! ${title}</h1>`;
test();
const val = Object.assign({ a: '1' }, { a: 'b' });
console.log(val);
let numbers = [1,2,3,4,5,6];
console.log(template({numbers}));