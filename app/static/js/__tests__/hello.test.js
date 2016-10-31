import React from 'react';
import { render } from 'enzyme';
import Hello from '../components/hello';

it('Check that Hello returns expected content', () => {
    const hello = render(
        <Hello />
    );
    expect(hello.html()).toEqual('<h1>Hello React World!</h1>');
});
