import React from 'react';
import fetch from 'isomorphic-fetch';

export default class Hello extends React.Component {

    componentDidMount() {
        this.fetchHello();
    }

    fetchHello() {
        fetch('/hello').then(response => {
            if(response.status < 200 && response.status >= 300) {
                return {
                    'error': {
                        'status': response.status,
                        'text': response.statusText}
                };
            } else {
                return response.json();
            }
        }).then(response => {
            if(!response.error) {
                this.setState({
                    message: response.message
                });
            } else {
                this.setState({message: `An error has occured. 
                code: ${response.status} message: ${response.message}`});
            }
        });
    }

    render() {
        return <h1>Hello React World!</h1>;
    }
}
