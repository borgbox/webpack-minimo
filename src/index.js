//const sum = require('./sum');
import sum from './sum';
//import './image_viewer';

import react from 'react';

//Carregando o módulo de forma dinâmica sob demanda
const button = document.createElement('button');
button.innerText = 'Click me';
button.onclick = () =>{
    System.import('./image_viewer').then(module => {
        console.log(module);
        module.default();
    });
}
document.body.appendChild(button);

const total = sum(1,2);
console.log(total);