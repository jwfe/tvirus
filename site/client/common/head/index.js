import React, { Component } from 'react';
import { Input, Menu } from 'tvirus';
import './index.less';

// 父组件
export default class Head extends Component{
    constructor(props){
        super(props);
    }
    opened(path){
        return this.props.hash.path === path;
    }

    onClick(index, to, openMaps){
        if(!to){
            return;
        }

        openMaps[index] = true;
        window.location.href = `#${to}`;
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
                    <Menu.Item opened={this.opened('index')} to="/">首页</Menu.Item>
                    <Menu.Item opened={this.opened('spec')} to="/spec/arts">设计语言</Menu.Item>
                    <Menu.Item opened={this.opened('component')} to="/component/install">组件</Menu.Item>
                </Menu>
            </header>
        )
    }
}
