import React, { Component } from 'react';
import Layout from '../../../common/webcomponent';

import { Button, Message } from 'tvirus';
import './index.less'

export default class MessageDemo extends Component{
    constructor(props){
        super(props);
        this.state = {
            childs: []
        }
    }

    componentWillMount(){
        this.childs();
    }

    onShow(){
        Message.info(`This is a informations.`);
    }

    childs(){
        const childs = [];
        childs.push({
            title: '正常',
            children: (
                <div className="code-demo">
                    <Button onClick={this.onShow.bind(this)}>基本信息</Button>
                </div>
            )
        });

        this.setState({childs})
    }

    render() {
        const {childs} = this.state;

        return <Layout {...this.props} 
            keyword="message"
            className="main-message-box"
            title="Message"
            desc="通过一个操作引发的反馈浮层位于顶部居中显示并自动消失，是一种不打断用户操作的轻量级提示方式。"
            childs={childs}
        />
    }
}
            