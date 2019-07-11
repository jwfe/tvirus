
import React, { Component } from 'react';
import Layout from '../../../common/webcomponent';

import { Result, Button, Row, Col } from 'tvirus';
import './index.less'

export default class ResultDemo extends Component{
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
                    <Row>
                        <Col span={12}>
                            <Result type="nodata" title="404" subtitle="Sorry，页面找不到了...">
                                <Button type="primary">返回首页</Button>
                            </Result>
                        </Col>
                        <Col span={12}>
                            <Result type="loadfail" title="加载失败" subtitle="Sorry，服务器开小差了，重新刷新一下试试。">
                                <Button type="primary">重试</Button>
                            </Result>
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
            keyword="result"
            className="main-result-box"
            title="Result"
            desc="结果页"
            childs={childs}
        />
    }
}
            