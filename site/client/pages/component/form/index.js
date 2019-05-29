import React, { Component } from 'react';
import Layout from '../../../common/webcomponent';

import {Form} from 'tvirus';
import './index.less'

export default class FormDemo extends Component{
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
                    <Form></Form>
                </div>
            )
        });

        this.setState({childs})
    }

    render() {
        const {childs} = this.state;

        return <Layout {...this.props} 
            className="main-form-box"
            title="表单"
            desc="具有数据收集、校验和提交功能的表单，包含复选框、单选框、输入框、下拉选择框等元素。"
            childs={childs}
        />
    }
}
            