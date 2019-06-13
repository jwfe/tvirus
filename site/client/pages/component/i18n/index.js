import React, { Component } from 'react';
import Layout from '../../../common/webcomponent';

import Highlight from 'react-highlight' 

import './index.less'

export default class I18nDemo extends Component{
    constructor(props){
        super(props);
        this.state = {
            childs: []
        }
    }

    componentWillMount(){
        this.childs();
    }

    childs(){
        const childs = [];
        childs.push({
            doc: true,
            title: '正常',
            children: (
                <div>
                    <p>T-virus 提供一个 Provider 组件用于配置组件内部文案的语言。组件利用 context 实现对组件内部文案的配置，需要在应用最外层包裹使用。</p>
                    <div className="language-jsx">
                        <Highlight>
                            {`
// 入口处，直接使用 I18nProvider 包裹
import { I18nProvider as Provider } from 'tvirus';
import enUS from './en-US'; // 自获取

<Provider value={enUS}>
    <App />
</Provider>

// 组件内使用
import { I18nReceiver as Receiver } from 'tvirus';
<Receiver key={index} componentName="Select">
    {i18n => (
        <span>{i18n[item.value]}</span>
    )}
</Receiver>
                            `}
                        </Highlight>
                    </div>
                    <p>需要遵循分类对应相应的数据。</p>
                    <div className="language-jsx">
                        <Highlight>
                            {`
export const Select = {
    input: '请选择',
    empty: '没有找到匹配项',
};
                            `}
                        </Highlight>
                    </div>
                </div>    
            )
        });

        this.setState({childs})
    }

    render() {
        const {childs} = this.state;

        return <Layout {...this.props} 
            keyword="i18n"
            className="main-i18n-box"
            title="国际化"
            desc="T-virus 目前的默认文案是中文，如果需要使用其他语言，可以参考下面的方案。"
            childs={childs}
        />
    }
}
            