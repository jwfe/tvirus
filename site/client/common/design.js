import React, { Component } from 'react';

import Menu from '@menu';
import './main.less';

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
        margin: '0 60px',
        width: 800
    }
}

export default class Layout extends Component{
    constructor(props){
        super(props);
        this.state = {
            children: null
        }
    }
    
    onClick(index, to, openMaps){
        if(!to){
            return;
        }

        openMaps[index] = true;
        this.props.history.push({ pathname: to, state: { openMaps } });
    }
    opened(query){
        const currQuery = this.props.location.pathname.split('/')[2];
        console.log(currQuery , query)
        return currQuery === query;
    }
    createMenus(){
        return [
            {
                title: '设计语言',
                child: [
                    {
                        title: '人文体验',
                        query: 'arts'
                    },
                    {
                        title: '直接了当',
                        query: 'direct'
                    },
                    {
                        title: '减少跳转',
                        query: 'jump'
                    },
                    {
                        title: '化繁为简',
                        query: 'lightweight'
                    },
                    {
                        title: '提供邀请',
                        query: 'invitation'
                    },
                    {
                        title: '即时反映',
                        query: 'reaction'
                    }
                ]
            },
            {
                title: '设计规范',
                child: [
                    {
                        title: '间距',
                        query: 'margin'
                    },
                    {
                        title: '对齐',
                        query: 'align'
                    },
                    {
                        title: '颜色',
                        query: 'color'
                    },
                    {
                        title: '布局',
                        query: 'layout'
                    },
                    {
                        title: '字体',
                        query: 'font'
                    },
                    {
                        title: '图标',
                        query: 'icon'
                    },
                    {
                        title: '文案',
                        query: 'text'
                    },
                    {
                        title: '数据录入',
                        query: 'data'
                    },
                    {
                        title: '数据展示',
                        query: 'datashow'
                    },
                    {
                        title: '信息反馈',
                        query: 'notice'
                    },
                    {
                        title: '微动效',
                        query: 'animation'
                    }
                ]
            }
        ].map((item) => {
            const SubmenuTitle = <span>{item.title}</span>;
            const child = item.child.map((child) => {
                const isShow = this.opened(child.query);
                return <Menu.Item opened={isShow} to={`/spec/${child.query}`}>
                    {child.title}
                </Menu.Item>
            })
            return (
                <Menu.SubMenu title={SubmenuTitle}>
                    {child}
                </Menu.SubMenu>
            )    
        })
    }
    render() {
        const { children, className, title, desc } = this.props;
        return (
            <main style={style.main} className="main">
                <aside style={style.left}>
                    <Menu className="tv-menu-vertical-demo" onClick={this.onClick.bind(this)}>
                        {this.createMenus()}
                    </Menu>
                </aside>
                <section style={style.right} className="main-spec">
                    <article className={className}>
                        <h1>{title}</h1>
                        <p>{desc}</p>
                        <section className="main-body">
                            {children}
                        </section>
                    </article>
                </section>   
                
            </main>
        )
    }
}