
import React, { Component } from 'react';
import Layout from '../../../common/webcomponent';

import { Spin, Card, Button } from 'tvirus';
import './index.less'

export default class SpinDemo extends Component{
    constructor(props){
        super(props);
        this.state = {
            childs: []
        }
    }

    state = {
        loading: false
    }

    componentWillMount(){
        this.childs();
    }
    handleToggle = () => {
        this.setState({
            loading: !this.state.loading
        }, () => {
            this.childs();
        })
    }
    childs(){
        const childs = [];
        childs.push({
            title: '正常',
            children: (
                <div className="code-demo">
                    <Spin loading={true} />
                </div>
            )
        });

        childs.push({
            title: 'Card loading',
            children: (
                <div className="code-demo">
                    <Spin loading={this.state.loading}>
                        <Card title="标题1" extra={<a href="#">More</a>}>
                            <p>测试1</p>
                            <p>测试2</p>
                            <p>测试3</p>
                        </Card>
                    </Spin>
                    <Button style={{marginTop: 10}} type="primary" onClick={this.handleToggle}>切换加载状态</Button>
                </div>
            )
        });

        this.setState({childs})
    }

    render() {
        const {childs} = this.state;

        return <Layout {...this.props} 
            keyword="spin"
            className="main-spin-box"
            title="Spin"
            desc="用于等待异步数据加载时，让用户感觉到当前的状态，不会出现焦虑和疑惑。"
            childs={childs}
        />
    }
}
            