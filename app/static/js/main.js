import 'babel-polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import hello from './components/hello';

ReactDom.render(
    <hello />,
    document.querySelector('#container')
);
