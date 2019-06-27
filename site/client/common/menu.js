import React, { Component } from 'react';
import { Menu } from 'tvirus';

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

// 父组件
export default class CommonMenu extends Component{
    constructor(){
        super();
    }
    getLocation(){
        const { hash } = window.location;
        const hashMap = hash.split('/');
        return {
            pathname: hashMap[1],
            query: hashMap[2]
        }
    }
    onClick(index, to, openMaps){
        if(!to){
            return;
        }

        openMaps[index] = true;
        window.location.href = `/#${to}`;
    }
    opened(query){
        const location = this.getLocation();
        const currQuery = location.query;
        console.log(currQuery , query)
        return currQuery === query;
    }
    createComponentMenus(){
        return [
            {
                title: '开发指南',
                child: [
                    {
                        title: '快速上手',
                        query: 'install'
                    },
                    // {
                    //     title: '项目',
                    //     query: 'project'
                    // },
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
                        title: 'Sliderbar 滑动块',
                        query: 'sliderbar'
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
                    },
                    {
                        title: 'Tree 树形控件',
                        query: 'tree'
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
                        title: 'Badge 徽标',
                        query: 'badge'
                    },
                    {
                        title: 'Table 表格',
                        query: 'table'
                    },
                    {
                        title: 'Tag 标签',
                        query: 'tag'
                    },
                    {
                        title: 'Popup 弹出',
                        query: 'popup'
                    },

                    {
                        title: 'PopConfirm 气泡弹出层',
                        query: 'popconfirm'
                    },
                    {
                        title: 'Chart 图表',
                        query: 'chart'
                    },
                    {
                        title: 'Dialog 对话框',
                        query: 'dialog'
                    },
                    {
                        title: 'Message 全局提示',
                        query: 'message'
                    },
                    {
                        title: 'Progress 进度条',
                        query: 'progress'
                    },
                    {
                        title: 'Card 卡片',
                        query: 'card'
                    },
                    {
                        title: 'Loading 加载',
                        query: 'loading'
                    },
                    {
                        title: 'Spin 模块加载',
                        query: 'spin'
                    }
                ]
            }
        ].map((item, index2) => {
            const SubmenuTitle = <span>{item.title}</span>;
            const child = item.child.map((child, index) => {
                const isShow = this.opened(child.query);
                return <Menu.Item key={index} opened={isShow} to={`/component/${child.query}`}>
                    {child.title}
                </Menu.Item>
            })
            return (
                <Menu.SubMenu opened={true} key={index2} title={SubmenuTitle}>
                    {child}
                </Menu.SubMenu>
            )    
        })
    }
    createSpecMenus(){
        return [
            {
                title: '设计原则',
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
                        title: '数据可视化',
                        query: 'datavis'
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
        ].map((item, index2) => {
            const SubmenuTitle = <span>{item.title}</span>;
            const child = item.child.map((child, index) => {
                const isShow = this.opened(child.query);
                return <Menu.Item key={index} opened={isShow} to={`/spec/${child.query}`}>
                    {child.title}
                </Menu.Item>
            })
            return (
                <Menu.SubMenu key={index2} title={SubmenuTitle}>
                    {child}
                </Menu.SubMenu>
            )    
        })
    }
    render(){
        const { pathname, query } = this.getLocation();

        if(!pathname || !query){
            return null;
        }

        let menu;
        if(pathname === 'spec'){
            menu = this.createSpecMenus();
        } else {
            menu = this.createComponentMenus();
        }

        return (
            <aside style={style.left}>
                <Menu multiple className="tv-menu-vertical-demo" onClick={this.onClick.bind(this)}>
                    {menu}
                </Menu>
            </aside>
        )
    }
}
