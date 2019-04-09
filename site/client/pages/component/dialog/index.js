
import React, { Component } from 'react';
import Layout from '../../../common/compLayout';

import { Row, Col } from '@grid';
import Button from '@button';
import Dialog from '@dialog';
import './index.less'

export default class DialogDemo extends Component{
    constructor(props){
        super(props);
        this.state = {
            childs: [],
            visible: false
        }
    }

    componentWillMount(){
        this.childs();
    }

    showModal = () => {
        this.setState({
            visible: true,
        }, () => {
            this.childs();
        });
    }

    handleCancel(){
        this.setState({
            visible: false,
        }, () => {
            this.childs();
        });
    }

    childs(){
        const childs = [];
        childs.push({
            title: '正常',
            children: (
                <div className="code-demo">
                    <Row>
                        <Col span={12}>
                            <Button onClick={this.showModal.bind(this)}>基础</Button>
                            <Dialog title="基础" visible={this.state.visible} onClose={this.handleCancel.bind(this)} footer={true}>
                                <p>Some contents...</p>
                                <p>Some contents...</p>
                                <p>Some contents...</p>
                            </Dialog>
                        </Col>
                        <Col span={12}>
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
            className="main-dialog-box"
            title="Dialog"
            desc="Dialog的说明"
            childs={childs}
        />
    }
}
            