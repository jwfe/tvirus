
import React, { Component } from 'react';
import Layout from '../../../common/webcomponent';

import {Loading} from 'tvirus';
import './index.less'

export default class LoadingDemo extends Component{
    constructor(props){
        super(props);
        this.state = {
            childs: []
        }
    }

    componentWillMount(){
        this.childs();
    }

    childs(){
        const childs = [];
        childs.push({
            title: '正常',
            children: (
                <div className="code-demo">
                    <Loading></Loading>
                </div>
            )
        });

        this.setState({childs})
    }

    render() {
        const {childs} = this.state;

        return <Layout {...this.props} 
            className="main-loading-box"
            title="Loading"
            desc="Loading的说明"
            childs={childs}
        />
    }
}
            