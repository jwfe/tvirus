import React, { Component } from 'react';
import Layout from '../../../common/compLayout';

import Button from '@button';
import Message from '@message';
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
            className="main-message-box"
            title="Message"
            desc="Message的说明"
            childs={childs}
        />
    }
}
            