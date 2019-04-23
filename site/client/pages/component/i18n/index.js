
import React, { Component } from 'react';
import Layout from '../../../common/compLayout';

import I18n from '@i18n';
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
            title: '正常',
            children: (
                <div className="code-demo">
                    <I18n></I18n>
                </div>
            )
        });

        this.setState({childs})
    }

    render() {
        const {childs} = this.state;

        return <Layout {...this.props} 
            className="main-i18n-box"
            title="I18n"
            desc="I18n的说明"
            childs={childs}
        />
    }
}
            