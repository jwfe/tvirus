import React, { Component } from 'react';
import Layout from '../../../common/webcomponent';

import { Loading } from 'tvirus';
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
                    <Loading />
                </div>
            )
        });

        this.setState({childs})
    }

    render() {
        const {childs} = this.state;

        return <Layout {...this.props} 
            keyword="loading"
            className="main-loading-box"
            title="Loading"
            desc="模块的loading，可以使用这个组件。"
            childs={childs}
        />
    }
}
            