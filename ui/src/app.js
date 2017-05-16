import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

ReactDOM.render(<App />, document.getElementById('root'));

const name = 'me';
const time = '10'
console.log(`Hello ${name}, how are you ${time}?`);