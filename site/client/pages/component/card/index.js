
import React, { Component } from 'react';
import Layout from '../../../common/compLayout';

import Card from '@card';
import './index.less'

export default class CardDemo extends Component{
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
                    <Card title="标题1" extra={<a href="#">More</a>}>
                        <p>测试1</p>
                        <p>测试2</p>
                        <p>测试3</p>
                    </Card>
                </div>
            )
        });

        childs.push({
            title: '无边框',
            children: (
                <div className="code-demo" style={{background: '#999'}}>
                    <Card bordered={false} title="标题1" extra={<a href="#">More</a>}>
                        <p>测试1</p>
                        <p>测试2</p>
                        <p>测试3</p>
                    </Card>
                </div>
            )
        });

        childs.push({
            title: '无头',
            children: (
                <div className="code-demo">
                    <Card>
                        <p>测试1</p>
                        <p>测试2</p>
                        <p>测试3</p>
                    </Card>
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
            desc="Card的说明"
            childs={childs}
        />
    }
}
            