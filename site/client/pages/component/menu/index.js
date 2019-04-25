import React, { Component } from 'react';
import Layout from '../../../common/compLayout';

import Menu from '@menu';
import './index.less'

export default class MenuDemo extends Component{
    constructor(props){
        super(props);
        this.state = {
            childs: []
        }
    }

    componentWillMount(){
        this.childs([
            {
                title: '方向性图标',
                list: [
                    'search'
                ]
            }
        ]);
    }

    childs(){
        const childs = [];
        childs.push({
            title: '侧边栏',
            children: (
                <div className="code-demo">
                    <Menu style={{width: 256}} theme="dark">
                        <Menu.Item>概览</Menu.Item>
                        <Menu.SubMenu title={`点评`}>
                            <Menu.ItemGroup title={`点评分析`}>
                                <Menu.Item>点评总览</Menu.Item>
                                <Menu.Item>点评热词</Menu.Item>
                                <Menu.Item>点评总览</Menu.Item>
                            </Menu.ItemGroup>
                        </Menu.SubMenu>

                        <Menu.SubMenu title={`质检`}>
                            <Menu.ItemGroup title={`质检分析`}>
                                <Menu.Item>质检总览</Menu.Item>
                                <Menu.Item>质检热词</Menu.Item>
                                <Menu.Item>质检总览</Menu.Item>
                            </Menu.ItemGroup>
                        </Menu.SubMenu>
                    </Menu>
                </div>
            )
        });

        childs.push({
            title: '顶栏',
            children: (
                <div className="code-demo">
                    <Menu mode="horizontal">
                        <Menu.Item>概览</Menu.Item>
                        <Menu.SubMenu title={`点评`}>
                            <Menu.ItemGroup title={`点评分析`}>
                                <Menu.Item>点评总览</Menu.Item>
                                <Menu.Item>点评热词</Menu.Item>
                                <Menu.Item>点评总览</Menu.Item>
                            </Menu.ItemGroup>
                        </Menu.SubMenu>

                        <Menu.SubMenu title={`质检`}>
                            <Menu.ItemGroup title={`质检分析`}>
                                <Menu.Item>质检总览</Menu.Item>
                                <Menu.Item>质检热词</Menu.Item>
                                <Menu.Item>质检总览</Menu.Item>
                            </Menu.ItemGroup>
                        </Menu.SubMenu>
                    </Menu>
                </div>
            )
        })
        this.setState({childs})
    }

    render() {
        const {childs} = this.state;

        return <Layout {...this.props} 
            className="main-menu-box"
            title="导航菜单"
            desc="导航菜单是一个网站的灵魂，用户依赖导航在各个页面中进行跳转。采用侧边导航提供多级结构来收纳和排列网站架构。"
            childs={childs}
        />
    }
}