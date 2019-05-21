import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import { Row, Col } from 'tvirus';

import './index.less';

export default class Index extends Component{
    render() {
        return (
            <div className="index-wraper">
                <div className="index-header">
                    <Row>
                        <Col span={4}><div className="logo">T-virus</div></Col>
                        <Col span={20}>
                            <ul className="index-menu">
                                <li className="active"><Link to='/'>首页</Link></li>
                                <li><Link to='/spec/arts'>设计指南</Link></li>
                                <li><Link to='/component/install'>组件</Link></li>
                                <li><Link to='###'>资源</Link></li>
                            </ul>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}