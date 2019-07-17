
import React, { Component } from 'react';
import Layout from '../../../common/webcomponent';

import { Result, Button, Row, Col } from 'tvirus';
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
        [
            {
                type: "badnetwork",
                title: "网络异常", 
                subtitle:"重新刷新一下试试。"
            }, 
            {
                type: "dev",
                title: "敬请期待", 
                subtitle:"模块正在开发中"
            }, 
            {
                type: "done",
                title: "已完成", 
                subtitle:"xx已完成"
            }, 
            {
                type: "loadfail",
                title: "加载失败", 
                subtitle:"Sorry，服务器开小差了，重新刷新一下试试。"
            }, 
            {
                type: "notbuy",
                title: "模块未购买", 
                subtitle:"您可以联系我们的销售完成购买。电话：xxx-xxxx"
            }, 
            {
                type: 'nodata',
                title: '数据不存在',
                subtitle: '查询的数据不存在'
            }, 
            {
                type: "notfound",
                title: '404',
                subtitle: 'Sorry，页面找不到了...'
            }, 
            {
                type: "notnotice",
                title: '通知失败',
                subtitle: '通知发送失败，请稍后重新发送。'
            },
            {
                type: "taskfail",
                title: '任务失败',
                subtitle: '当前任务执行失败，请重试。'
            }
        ].forEach((item) => {
            childs.push({
                title: item.title,
                children: (
                    <div className="code-demo">
                        <Result type={item.type} title={item.title} subtitle={item.subtitle}>
                            <Button type="primary">返回首页</Button>
                        </Result>
                        
                    </div>
                )
            });
        })
        

        this.setState({childs})
    }

    render() {
        const {childs} = this.state;

        return <Layout {...this.props} 
            keyword="result"
            className="main-result-box"
            title="Result"
            desc="结果页"
            childs={childs}
        />
    }
}
            