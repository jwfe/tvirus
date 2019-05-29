import React, { Component } from 'react';
import Layout from '../../../common/webcomponent';

import { Badge, Icon } from 'tvirus';

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
                    <Badge count={10} style={{marginRight: 30}}>
                        <span style={{width: 40, height: 40, display: 'block', background: '#999'}}></span>
                    </Badge>
                    <Badge count={30} style={{marginRight: 30}}>
                        <span style={{width: 40, height: 40, display: 'block', background: '#999'}}></span>
                    </Badge>
                    <Badge count={1000}>
                        <span style={{width: 40, height: 40, display: 'block', background: '#999'}}></span>
                    </Badge>
                </div>
            )
        });

        childs.push({
            title: '小点',
            children: (
                <div className="code-demo">
                    <Badge>
                        <Icon type="email" />
                    </Badge>
                </div>
            )
        });

        childs.push({
            title: '状态点',
            children: (
                <div className="code-demo">
                    <div><Badge status="success">success</Badge></div>
                    <div><Badge status="info">info</Badge></div>
                    <div><Badge status="warning">warning</Badge></div>
                    <div><Badge status="danger">danger</Badge></div>
                    <h5>自定义</h5>
                    <div><Badge status="color" color="#722ed1">#722ed1</Badge></div>
                </div>
            )
        });

        this.setState({childs})
    }

    render() {
        const {childs} = this.state;

        return <Layout {...this.props} 
            className="main-card-box"
            title="Card"
            desc="卡片是一种承载信息的容器，对可承载的内容类型无过多限制，它让一类信息集中化，增强区块感的同时更易于操作。"
            childs={childs}
        />
    }
}
            