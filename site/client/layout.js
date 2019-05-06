import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { I18nProvider } from '@i18n';

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

import './normalize'
import './assets/animation'
import './assets/base'
import './assets/menu';

import './assets/input';
import './assets/search';
import './assets/sliderbar';
import './assets/radio';
import './assets/checkbox';
import './assets/cascader';
import './assets/switch';
import './assets/datepicker';

import './assets/icon';
import './assets/grid';
import './assets/card';
import './assets/button';
import './assets/breadcrumb';
import './assets/pagination';
import './assets/tabs';
import './assets/table';
import './assets/popup';
import './assets/dialog';
import './assets/message';
import './assets/chart';
import './assets/theme/default';
import './assets/theme/dark';

import './common/component'
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
            return React.cloneElement(child, {hash})
        });
        return (
            <I18nProvider value={i18nMaps['zh-CN']}>
                <section>
                    {hash.path !== 'index' && <Head hash={hash} />}
                    {children}
                </section>
            </I18nProvider>
            
        )
    }
}

export default withRouter(App);
