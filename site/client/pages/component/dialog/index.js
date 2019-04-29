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
            visible_base: false
        }
    }

    componentWillMount(){
        this.childs();
    }

    showBaseModal = () => {
        this.setState({
            visible_base: true,
        }, () => {
            this.childs();
        });
    }

    handleBaseCancel(){
        this.setState({
            visible_base: false,
        }, () => {
            this.childs();
        });
    }


    showAlertModal() {
        const dom = Dialog.alert.info(
            (
                <div>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </div>
            ),
            {
                onClose: () => {this.childs();},
                title: "Alert",
                type: "alert",
                footer: true,
                cancel: false,
                okText: "知道了"
            }
        );
        this.setState({
            alertDom: dom,
        }, () => {
            dom.onShow();
        });
    }

    handleAlertCancel(){
        this.state.alertDom.onClose();
    }

    childs(){
        const childs = [];
        childs.push({
            title: '正常',
            children: (
                <div className="code-demo">
                    <Row>
                        <Col span={12}>
                            <Button onClick={this.showBaseModal.bind(this)}>基础</Button>
                            <Dialog title="基础" visible={this.state.visible_base} onClose={this.handleBaseCancel.bind(this)} footer={true}>
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


        childs.push({
            title: 'Alert',
            children: (
                <div className="code-demo">
                    <Row>
                        <Col span={12}>
                            <Button onClick={this.showAlertModal.bind(this)}>Alert</Button>
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
            