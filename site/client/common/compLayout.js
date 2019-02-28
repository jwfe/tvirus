import React, { Component } from 'react';
import Menu from '@menu';
import Icon from '@icon';

const style = {
    main: {
        display: 'flex'
    },
    left: {
        flexGrow: 0,
        width: 299, 
        minWidth: 299,
        maxWidth: 299,
        height: 'auto',

        borderRight: '1px solid #ebebeb'
    },
    right: {
        flexGrow: 1,
    }
}

export default class Layout extends Component{
    onClick(item){
        const { url } = item.props;
        if(!url){
            return;
        }
        window.location.href = `#${url}`;
    }
    opened(query){
        const currQuery = this.props.location.pathname.split('/')[2];
        console.log(currQuery , query)
        return currQuery === query;
    }
    createMenus(){
        return [
            {
                title: '开发指南',
                child: [
                    {
                        title: '快速上手',
                        query: 'install'
                    },
                    {
                        title: '项目',
                        query: 'project'
                    },
                    {
                        title: '国际化',
                        query: 'i18n'
                    }
                ]
            },
            {
                title: '基础',
                child: [
                    {
                        title: 'Button 按钮',
                        query: 'button'
                    }
                ]
            },
            {
                title: '表单',
                child: [
                    {
                        title: 'Input 输入框',
                        query: 'input'
                    }
                ]
            }
        ].map((item) => {
            const SubmenuTitle = <span>{item.title}</span>;
            const child = item.child.map((child) => {
                return <Menu.Item opened={this.opened(child.query)} url={`/component/${child.query}`}>{child.title}</Menu.Item>
            })
            return (
                <Menu.SubMenu title={SubmenuTitle}>
                    {child}
                </Menu.SubMenu>
            )    
        })
    }
    render() {
        return (
            <main style={style.main}>
                <aside style={style.left}>
                    <Menu className="tv-menu-vertical-demo" onClick={this.onClick.bind(this)}>
                        {this.createMenus()}
                    </Menu>
                </aside>
                <section style={style.right} className="main-component">
                    {this.props.children}
                </section>        
            </main>
        )
    }
}