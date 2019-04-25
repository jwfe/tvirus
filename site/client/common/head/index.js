import React, { Component } from 'react';
import Menu from '@menu';
import Icon from '@icon';
import Input from '@input';
import './index.less';

// 父组件
export default class Head extends Component{
    constructor(props){
        super(props);
    }
    onClick(item){
        const { url } = item.props;
        if(!url){
            return;
        }
        window.location.href = `#${url}`;
    }
    opened(path){
        return this.props.hash.path === path;
    }
    render(){
        return (
            <header className="header clearfix">
                <div className="logo">
                    <a href="/">T-Virus</a>
                </div>
                <div className="search-box">
                    <Input type="text" prefix="search" placeholder="搜索组件" />
                </div>
                <Menu className="site" mode="horizontal" onClick={this.onClick.bind(this)}>
                    <Menu.Item opened={this.opened('index')} url="/">首页</Menu.Item>
                    <Menu.Item opened={this.opened('spec')} url="/spec/introduce">设计语言</Menu.Item>
                    <Menu.Item opened={this.opened('component')} url="/component/install">组件</Menu.Item>
                </Menu>
            </header>
        )
    }
}
