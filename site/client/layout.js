import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { I18nProvider } from 'tvirus';
const i18nMaps = {
    'zh-CN': {
        colorPage: {
            feel: {
                'bad': '差评/下降',
                'good': '好评/上升',
                'medium': '中评',
                'nomarl': '无情感',
            },
            fun: {
                'fail': '错误/失败',
                'success': '成功',
                'warn': '错误/失败',
                'link': '链接',
            },
            season: {
                'hot': '热/旺',
                'cool': '淡/低',
                'menu': '导航'
            }
        }
    }
}

import Head from './common/head';
import Menu from './common/menu';

import './normalize';
import './loading';
import '../../dist/tvirus.css';

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
class App extends Component{
    constructor(){
        super();
    }
    getLocation(){
        const { hash } = window.location;
        const hashMap = hash.split('/');
        return {
            path: hashMap[1] || 'index',
            query: hashMap[2]
        }
    }
    render(){
        const hash = this.getLocation();
        const showHead = hash.path === 'component' || hash.path === 'spec';
        const children = React.Children.map(this.props.children, (child, i) => {
            return React.cloneElement(child, {key: i, hash})
        });

        let child = children;
        if(hash.query){
            child = (
                <main style={style.main} className="main">
                    <Menu />
                    {children}
                </main>
            )
        }

        return (
            <I18nProvider value={i18nMaps['zh-CN']}>
                <section>
                    {showHead && <Head hash={hash} />}
                    {child}
                </section>
            </I18nProvider>
        )
    }
}

export default withRouter(App);
