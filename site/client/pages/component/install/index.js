import React, { Component } from 'react';
import Layout from '../../../common/compLayout';

import Highlight from 'react-highlight' 

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
            title: '1. 前情提要',
            children: (
                <div>
                    <p>T-virus 是基于react.js，依赖于16.6.0版本。内部通过新版本的context来完成数据转换，请检查您当前的版本是否支持。</p>
                </div>    
            )
        });

        childs.push({
            doc: true,
            title: '2. 使用组件',
            children: (
                <div>
                    <p>T-virus 提供一个 Provider 组件用于配置组件内部文案的语言。组件利用 context 实现对组件内部文案的配置，需要在应用最外层包裹使用。</p>
                    <div className="language-jsx">
                        <Highlight>
                            {`
import React from 'react';
import ReactDOM from 'react-dom';
import { I18nProvider as Provider, I18nReceiver as Receiver, message } from 'tvirus';
import enUS from './en-US'; // 自获取
import "tvirus/dist/tvirus.css";
import "./index.css";

class App extends React.Component {
  handleClick = () => {
    message.info('第一个案例');
  }
  render() {
    return (
        <Receiver componentName="Select">
            {i18n => (
                <Button onClick={this.handleClick.bind(this)}>{i18n['message']}</Button>
            )}
        </Receiver>
    );
  }
}

ReactDOM.render(<Provider i18n={enUS}><App /></Provider>, document.getElementById('root'));
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
            className="main-install-box"
            title="快速上手"
            desc="T-virus 是一套服务于公司内部的底层UI组件库。"
            childs={childs}
        />
    }
}
            