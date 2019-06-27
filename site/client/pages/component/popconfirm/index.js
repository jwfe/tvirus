
import React, { Component } from 'react';
import Layout from '../../../common/webcomponent';

import { PopConfirm, Button } from 'tvirus';
import './index.less'

export default class PopconfirmDemo extends Component{
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
                    <PopConfirm title="确认要删除么？">
                        <Button type="link">删除</Button>
                    </PopConfirm>
                </div>
            )
        });

        this.setState({childs})
    }

    render() {
        const {childs} = this.state;

        return <Layout {...this.props} 
            keyword="popconfirm"
            className="main-popconfirm-box"
            title="PopConfirm"
            desc="用于进一步确认用户的操作。"
            childs={childs}
        />
    }
}
            