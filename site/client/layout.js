import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

import Head from './common/head';

import './normalize'
import './assets/animation'
import './assets/base'
import './assets/menu';

import './assets/input';
import './assets/radio';
import './assets/checkbox';
import './assets/cascader';
import './assets/switch';
import './assets/datepicker';

import './assets/icon';
import './assets/grid';
import './assets/button';
import './assets/breadcrumb';
import './assets/pagination';
import './assets/tabs';
import './assets/table';
import './assets/popup';
import './assets/dialog';
import './assets/chart';
import './assets/theme/default';

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

export default withRouter(App);
