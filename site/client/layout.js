import React, { Component } from 'react';
import Head from './common/head';
import './normalize'
import './assets/base'
import './assets/menu';

import './assets/input';
import './assets/radio';
import './assets/checkbox';

import './assets/icon';
import './assets/grid';
import './assets/button';
import './assets/tabs';
import './assets/table';
import './assets/popup';

import './common/component'
// 父组件
class App extends Component{
    constructor(){
        super();
    }
    getLocation(){
        const { hash } = window.location;
        const hashMap = hash.split('/');
        return {
            path: hashMap[1] || 'index',
            query: hashMap[2]
        }
    }
    render(){
        const hash = this.getLocation();
        const children = React.Children.map(this.props.children, (child, i) => {
            return React.cloneElement(child, {hash})
        });
        return (
            <section>
                <Head hash={hash} />
                {children}
            </section>
        )
    }
}

export default App;
