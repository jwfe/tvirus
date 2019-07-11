
import React, { Component } from 'react';
import Layout from '../../../common/webcomponent';

import { Result, Button } from 'tvirus';
import './index.less'

export default class ResultDemo extends Component{
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
            title: '正常',
            children: (
                <div className="code-demo">
                    <Result type="nodata" title="404" subtitle="Sorry，页面找不到了...">
                        <Button type="primary">返回首页</Button>
                    </Result>
                </div>
            )
        });

        this.setState({childs})
    }

    render() {
        const {childs} = this.state;

        return <Layout {...this.props} 
            keyword="result"
            className="main-result-box"
            title="Result"
            desc="Result的说明"
            childs={childs}
        />
    }
}
            