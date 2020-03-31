import React from 'react';
import { cube } from './math';
import './index.scss';

console.log(React);

console.log('计算', cube(5));

document.getElementById('btn').onclick = function () {
    console.log(1);
    import('./handle').then(fn => fn.default());
}

fetch('/api/user')
    .then((res => res.json()))
    .then(data => console.log(data))
    .catch(e => console.log(e));