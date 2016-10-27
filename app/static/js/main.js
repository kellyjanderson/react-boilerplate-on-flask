import 'babel-polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import Hello from './components/hello';

ReactDom.render(
    <div>
        <Hello />
    </div>,
    document.querySelector('#container')
);
