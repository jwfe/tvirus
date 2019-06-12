import React, { Component } from 'react';
import Layout from '../../../common/webcomponent';

import { Progress } from 'tvirus';

import './index.less'

export default class BadgeDemo extends Component{
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
                    <div style={{marginBottom: 10}}><Progress value={30} /></div>
                    <div style={{marginBottom: 10}}><Progress status="info" value={50} /></div>
                    <div style={{marginBottom: 10}}><Progress status="danger" value={40} /></div>
                    <div style={{marginBottom: 10}}><Progress status="warning" value={80} /></div>
                    <div><Progress status="primary" value={70} /></div>
                </div>
            )
        });

        childs.push({
            title: '特殊类型',
            children: (
                <div className="code-demo">
                    <Progress type="color" value={[
                        {text: 'ctrip', color: '#3897FF'}, 
                        {text: 'elong', color: '#F9CD38'}, 
                        {text: 'qunar', color: '#36C4C4'}
                    ]} />
                </div>
            )
        });

        this.setState({childs})
    }

    render() {
        const {childs} = this.state;

        return <Layout {...this.props} 
            keyword="progress"
            className="main-progress-box"
            title="Progress"
            desc="展示操作的当前进度。当需要显示一个操作完成的百分比时请使用它。 "
            childs={childs}
        />
    }
}
            