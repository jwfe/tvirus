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

import './normalize';
import '../../dist/tvirus.css';

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
        const children = React.Children.map(this.props.children, (child, i) => {
            return React.cloneElement(child, {key: i, hash})
        });
        return (
            <I18nProvider value={i18nMaps['zh-CN']}>
                <section>
                    {(hash.path !== 'index' && hash.path !== 'demo')&& <Head hash={hash} />}
                    {children}
                </section>
            </I18nProvider>
        )
    }
}

export default withRouter(App);
