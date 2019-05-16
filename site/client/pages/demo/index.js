import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import { Menu, Icon, Row, Col, Badge } from 'tvirus';

import './demo.less'

export default class DemoIndex extends Component{
    state = {
        collapsed: false
    }
    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }
    render() {
        return (
            <div className="root-wraper">
                <div className="root-menu" style={{width: this.state.collapsed ? 80 : ''}}>
                    <div className="logo">
                        <a href="#">Brandwisdom</a>
                        <span onClick={this.toggleCollapsed}><Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} /></span>
                    </div>
                    <Menu theme="dark" inlineCollapsed={this.state.collapsed}>
                        <Menu.Item><span><Icon type="overview" /><span>概览</span></span></Menu.Item>
                        <Menu.SubMenu title={<span><Icon type="review" /><span>点评</span></span>}>
                            <Menu.ItemGroup title={`点评分析`}>
                                <Menu.Item>点评总览</Menu.Item>
                                <Menu.Item>点评热词</Menu.Item>
                                <Menu.Item>点评总览</Menu.Item>
                            </Menu.ItemGroup>
                        </Menu.SubMenu>

                        <Menu.SubMenu title={<span><Icon type="quality_inspection" /><span>质检</span></span>}>
                            <Menu.ItemGroup title={`质检分析`}>
                                <Menu.Item>质检总览</Menu.Item>
                                <Menu.Item>质检热词</Menu.Item>
                                <Menu.Item>质检总览</Menu.Item>
                            </Menu.ItemGroup>
                        </Menu.SubMenu>

                        <Menu.SubMenu title={<span><Icon type="live_in" /><span>住中</span></span>}>
                            <Menu.ItemGroup title={`住中分析`}>
                                <Menu.Item>住中总览</Menu.Item>
                                <Menu.Item>住中热词</Menu.Item>
                                <Menu.Item>住中总览</Menu.Item>
                            </Menu.ItemGroup>
                        </Menu.SubMenu>
                    </Menu>
                </div>
                <main className="content-wrapper">
                    <nav className="navbar">
                        <Row>
                            <Col span="10">当前酒店：北京龙泉宾馆马甸桥店</Col>
                            <Col span="14">
                                <ul>
                                    <li>
                                        <Icon type="search" />
                                        <span className="text">切换酒店</span>
                                    </li>
                                    <li>
                                        <Badge><Icon type="email" /></Badge>
                                        <span className="text">消息</span>
                                    </li>
                                    <li>
                                        <Icon type="user" />
                                        <span className="text">May</span>
                                    </li>
                                    <li>
                                        <Icon type="setup" />
                                        <span className="text">设置</span>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </nav>
                </main>
            </div>
        )
    }
}