
import React, { Component } from 'react';
import Layout from '../../../common/webcomponent';

import { Input, Row, Col } from 'tvirus';
import './index.less'

export default class InputDemo extends Component{
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
                    <Row gutter={16}>
                        <Col span={12}>
                            <Input placeholder="base input" />
                        </Col>
                        <Col span={12}>
                            <Input placeholder="large size" size="large" /> <br />
                            <Input placeholder="medium size" size="medium" /><br />
                            <Input placeholder="small size" size="small" />
                        </Col>
                    </Row>
                </div>
            )
        });


        childs.push({
            title: '前/后缀',
            children: (
                <div className="code-demo">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Input placeholder="base input" prefix="cloud" />
                        </Col>
                        <Col span={12}>
                            <Input placeholder="large size" size="large" /><br />
                            <Input placeholder="medium size" size="medium" /><br />
                            <Input placeholder="small size" size="small" />
                        </Col>
                    </Row>
                </div>
            )
        });


        childs.push({
            title: 'password/number',
            children: (
                <div className="code-demo">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Input type="password" showToggle />
                        </Col>
                        <Col span={12}>
                            <Input type="number" />
                        </Col>
                    </Row>
                </div>
            )
        });

        childs.push({
            title: 'textarea',
            children: (
                <div className="code-demo">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Input type="textarea" />
                        </Col>
                        <Col span={12}>
                            <Input type="textarea" autosize />
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
            className="main-input-box"
            title="Input"
            desc="输入框为用户提供了编辑文本的控件，是录入数据最基础和常见的方式。"
            childs={childs}
        />
    }
}
