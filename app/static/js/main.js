import 'babel-polyfill';
import React from 'react';
import ReactDom from 'react-dom';

ReactDom.render(
        <h1>Hello React World!</h1>
    ,
    document.querySelector('#container')
);
