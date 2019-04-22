import React, { Component } from 'react';
import Body from './body';

import Menu from '@menu';

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
            childs: [],
            controlTitle: '显示',
            codebox: {}
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(JSON.stringify(nextProps.childs) !== JSON.stringify(prevState.childs)){
            return {
                childs: nextProps.childs
            };
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
                        title: 'Search 搜索框',
                        query: 'search'
                    },
                    {
                        title: 'Radio 单选',
                        query: 'radio'
                    },
                    {
                        title: 'Switch 开关',
                        query: 'switch'
                    },
                    {
                        title: 'Checkbox 多选项',
                        query: 'checkbox'
                    },
                    {
                        title: 'Select 下拉菜单',
                        query: 'select'
                    },
                    {
                        title: 'Cascader 级联菜单',
                        query: 'cascader'
                    },
                    {
                        title: 'Datepicker 日期控件',
                        query: 'datepicker'
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
                    },
                    {
                        title: 'Popup 弹出',
                        query: 'popup'
                    },
                    {
                        title: 'Chart 图表',
                        query: 'chart'
                    },
                    {
                        title: 'Dialog 对话框',
                        query: 'dialog'
                    }
                ]
            }
        ].map((item) => {
            const SubmenuTitle = <span>{item.title}</span>;
            const child = item.child.map((child) => {
                const isShow = this.opened(child.query);
                return <Menu.Item opened={isShow} to={`/component/${child.query}`}>
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
        const openMaps = this.props.location.state;
        return (
            <main style={style.main}>
                <aside style={style.left}>
                    <Menu className="tv-menu-vertical-demo" onClick={this.onClick.bind(this)}>
                        {this.createMenus()}
                    </Menu>
                </aside>
                <Body {...this.props} />
            </main>
        )
    }
}