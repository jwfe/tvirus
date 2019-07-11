import React, { Component } from 'react';
import Layout from '../../../common/webcomponent';

import { Dialog, Button, Row, Col } from 'tvirus';
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


    showAlertModal(type) {
        // const child = (
        //     <div>
        //         <p>Some contents...</p>
        //         <p>Some contents...</p>
        //         <p>Some contents...</p>
        //     </div>
        // );
        const options = {
            onClose: () => {
                // this.childs();
            },
            width: 180,
            title: "这是一个提示内容，你也可以设置child。",
            type: "alert",
            footer: true,
            cancel: false,
            okText: "知道了"
        }

        let dom;

        if(type === 'info'){
            options.cancel = true;
            options.cancelText = '留下';
            dom = Dialog.alert.info(
                null,
                options
            );
        }

        if(type === 'success'){
            dom = Dialog.alert.success(
                null,
                options
            );
        }
        if(type === 'warning'){
            dom = Dialog.alert.warning(
                null,
                options
            );
        }
        if(type === 'error'){
            dom = Dialog.alert.error(
                null,
                options
            );
        }

        this.setState({
            alertDom: dom,
        }, () => {
            dom.onShow();
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
                            <Button onClick={this.showAlertModal.bind(this, 'info')}>info</Button>
                            <Button onClick={this.showAlertModal.bind(this, 'success')}>success</Button>
                            <Button onClick={this.showAlertModal.bind(this, 'warning')}>warning</Button>
                            <Button onClick={this.showAlertModal.bind(this, 'error')}>error</Button>
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
            keyword="dialog"
            className="main-dialog-box"
            title="Dialog"
            desc="通过一个操作引发的反馈浮层位于页面中心，反馈内容可通过确认或取消按钮进行关闭，用户在反馈层出现时不可进行任何的操作，用于重要的反馈。"
            childs={childs}
        />
    }
}
            