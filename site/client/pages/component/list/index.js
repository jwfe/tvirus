
import React, { Component } from 'react';
import Layout from '../../../common/webcomponent';

import {List} from 'tvirus';
import './index.less'

export default class ListDemo extends Component{
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
                    <List></List>
                </div>
            )
        });

        this.setState({childs})
    }

    render() {
        const {childs} = this.state;

        return <Layout {...this.props} 
            keyword="list"
            className="main-list-box"
            title="List"
            desc="List的说明"
            childs={childs}
        />
    }
}
            