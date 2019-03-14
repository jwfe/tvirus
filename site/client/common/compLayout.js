import React, { Component } from 'react';
import Highlight from 'react-highlight' 
import reactElementToJSXString from 'react-element-to-jsx-string';

import Menu from '@menu';
import Icon from '@icon';
import { Tabs, Tabpanel } from '@tabs';

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
    constructor(props){
        super(props);
        this.state = {
            controlTitle: '显示',
            codebox: {}
        }
    }
    onShowCode(index){
        const {codebox} = this.state;
        const {show} = codebox[index] || {};
        const temp = {
            [index]: {
                show: !show
            }
        }
        this.setState({
            codebox: temp
        })
    }
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
                        title: 'Grid 栅格',
                        query: 'grid'
                    },
                    {
                        title: 'Button 按钮',
                        query: 'button'
                    },
                    {
                        title: 'Icon 图标',
                        query: 'icon'
                    }
                ]
            },
            {
                title: '表单',
                child: [
                    {
                        title: 'Input 输入框',
                        query: 'input'
                    },

                    {
                        title: 'Radio 单选',
                        query: 'radio'
                    },
                    {
                        title: 'Checkbox 多选项',
                        query: 'checkbox'
                    }
                ]
            },
            {
                title: '导航',
                child: [
                    {
                        title: 'Menu 菜单',
                        query: 'menu'
                    },

                    {
                        title: 'Breadcrumb 面包屑',
                        query: 'breadcrumb'
                    },

                    {
                        title: 'Pagination 分页',
                        query: 'pagination'
                    },

                    {
                        title: 'Tabs 选项卡',
                        query: 'tabs'
                    }
                    
                ]
            },
            {
                title: '数据展示',
                child: [
                    {
                        title: 'Table 表格',
                        query: 'table'
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
    getCodeDemo(child, index){
        const { codebox } = this.state;
        const codeboxCurrent = codebox[index] || {};
        const isShow = !!codeboxCurrent.show;
        if(Array.isArray(child.children)){
            return (
                <Tabs activeKey={child.children[0]}>
                    {
                        child.children.map((item) => {
                            const itemCompoent = child.func(item);
                            return (<Tabpanel tab={item} tabKey={item}>
                                {itemCompoent}
                                <div className="language-jsx" style={{display: isShow ? '' : 'none'}}>
                                    <Highlight>
                                        {reactElementToJSXString(itemCompoent, {tabStop: 4})}
                                    </Highlight>
                                </div>
                                <div className="code-block-control" onClick={this.onShowCode.bind(this, index)}>{isShow ? '隐藏' : '展示'}</div>
                            </Tabpanel>)
                        })
                    }
                </Tabs>
            )
        }
        return (<div>
            {child.children}
            <div className="language-jsx" style={{display: isShow ? '' : 'none'}}>
                <Highlight>
                    {child.jsx || reactElementToJSXString(child.children, {tabStop: 4})}
                </Highlight>
            </div>
            <div className="code-block-control" onClick={this.onShowCode.bind(this, index)}>{isShow ? '隐藏' : '展示'}</div>
        </div>)
    }
    render() {
        const {title, desc, className, childs} = this.props;
        return (
            <main style={style.main}>
                <aside style={style.left}>
                    <Menu className="tv-menu-vertical-demo" onClick={this.onClick.bind(this)}>
                        {this.createMenus()}
                    </Menu>
                </aside>
                <section style={style.right} className="main-component">
                    <article className={className}>
                    <h1>{title}</h1>
                    <p>{desc}</p>
                    <section className="main-body">
                        {
                            childs.map((child, index) => {
                                return (
                                    <div>
                                        <h2>{child.title}</h2>
                                        <div className="code-wraper">{this.getCodeDemo(child, index)}</div>
                                    </div>
                                )
                            })
                        }
                    </section>
                </article>

                </section>        
            </main>
        )
    }
}