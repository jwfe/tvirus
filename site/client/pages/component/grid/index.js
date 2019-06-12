
import React, { Component } from 'react';
import Layout from '../../../common/webcomponent';

import { Row, Col } from 'tvirus';
import './index.less'

export default class GridDemo extends Component{
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
            title: '基础',
            children: (
                <div className="code-demo">
                    <Row>
                        <Col span={24}><div class="orange"></div></Col>
                    </Row>

                    <Row>
                        <Col span={12}><div class="orange"></div></Col>
                        <Col span={12}><div class="orange"></div></Col>
                    </Row>

                    <Row>
                        <Col span={8}><div class="orange"></div></Col>
                        <Col span={8}><div class="orange"></div></Col>
                        <Col span={8}><div class="orange"></div></Col>
                    </Row>

                    <Row>
                        <Col span={6}><div class="orange"></div></Col>
                        <Col span={6}><div class="orange"></div></Col>
                        <Col span={6}><div class="orange"></div></Col>
                        <Col span={6}><div class="orange"></div></Col>
                    </Row>

                    <Row>
                        <Col span={4}><div class="orange"></div></Col>
                        <Col span={4}><div class="orange"></div></Col>
                        <Col span={4}><div class="orange"></div></Col>
                        <Col span={4}><div class="orange"></div></Col>
                        <Col span={4}><div class="orange"></div></Col>
                        <Col span={4}><div class="orange"></div></Col>
                    </Row>
                </div>
            )
        });


        childs.push({
            title: '区间间隔',
            children: (
                <div className="code-demo">
                    <Row gutter={16}>
                        <Col span={6}><div class="orange"></div></Col>
                        <Col span={6}><div class="orange"></div></Col>
                        <Col span={6}><div class="orange"></div></Col>
                        <Col span={6}><div class="orange"></div></Col>
                    </Row>
                </div>
            )
        });

        childs.push({
            title: '偏移',
            children: (
                <div className="code-demo">
                    <Row gutter={16}>
                        <Col span={6}><div class="orange"></div></Col>
                        <Col span={6}><div class="orange"></div></Col>
                        <Col span={6} offset={6}><div class="orange"></div></Col>
                    </Row>
                </div>
            )
        });

        this.setState({childs})
    }

    render() {
        const {childs} = this.state;

        return <Layout {...this.props} 
            keyword="grid"
            className="main-grid-box"
            title="Grid"
            desc="布局的栅格化系统，我们是基于行（row）和列（col）来定义信息区块的外部框架，以保证页面的每个区域能够稳健地排布起来。"
            childs={childs}
        />
    }
}
