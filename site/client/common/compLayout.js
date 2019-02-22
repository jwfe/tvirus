import React, { Component } from 'react';
import Menu from '@menu';

export default class Layout extends Component{
    onClick(){
        console.log('[Component]', ...arguments);
    }
    render() {
        return (
            <main>
                <aside>
                    <Menu className="tv-menu-vertical-demo" onClick={this.onClick}>
                        <Menu.Item><i className="el-icon-message"></i>介绍</Menu.Item>
                        <Menu.SubMenu title={<span><i className="el-icon-message"></i>组件</span>}>
                            <Menu.ItemGroup title={<span><i className="el-icon-message"></i>基础</span>}>
                                <Menu.Item opened="true">Button 按钮</Menu.Item>
                            </Menu.ItemGroup>

                            <Menu.ItemGroup title={<span><i className="el-icon-message"></i>表单</span>}>
                                <Menu.Item>Input 输入框</Menu.Item>
                            </Menu.ItemGroup>
                        </Menu.SubMenu> 
                    </Menu>
                </aside>
                <section>
                    {this.props.children}
                </section>        
            </main>
        )
    }
}