import React, { Component } from 'react';
import Layout from '../../../common/webcomponent';

import { Button, Message, Row, Col } from 'tvirus';

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

    onShow(type){
        type === 'info' && Message.info(`This is a informations.`);
        type === 'success' && Message.success(`This is a success.`);
        type === 'warning' && Message.warning(`This is a warning.`);
        type === 'error' && Message.error(`This is a error.`);
        if(type === 'loading'){
            Message.loading(`This is a loading.`);
            setTimeout(() => {
                Message.hide();
                Message.info(`Loading is done.`)
            }, 2000)
        }
        
    }

    childs(){
        const childs = [];
        childs.push({
            title: '正常',
            children: (
                <div className="code-demo">
                    <Row>
                        <Col span={24}>
                            <Button onClick={this.onShow.bind(this, 'info')}>info</Button>
                            <Button onClick={this.onShow.bind(this, 'loading')}>loading 2s</Button>
                            <Button onClick={this.onShow.bind(this, 'warning')}>warning</Button>
                            <Button onClick={this.onShow.bind(this, 'error')}>error</Button>
                            <Button onClick={this.onShow.bind(this, 'success')}>success</Button>
                        </Col>
                    </Row>
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
            