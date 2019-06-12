import React, { Component } from 'react';
import Layout from '../../../common/design';

import './index.less'

export default class ReactionDemo extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return <Layout {...this.props} 
            className="main-reaction-box"
            title="即时反应"
            desc="就像『牛顿第三定律』所描述作用力和反作用一样，用户进行了操作或者内部数据发生了变化，系统就应该立即有对应的反馈，同时输入量级越大、重要性越高，那么反馈量级越大、重要性越高。"
        >
            <p>虽然反馈太多（准确的说，错误的反馈太多）是一个问题，但是反馈太少甚至没有反馈的系统，则让人感觉迟钝和笨拙，用户体验更差。<br /><cite>牛顿第三定律 ：当两个物体互相作用时，彼此施加于对方的力，其大小相等、方向相反。——摘自《维基百科》</cite></p>
            
            <h3>反馈模式</h3>
            <p>实时预览：在用户提交输入之前，让他先行了解系统将如何处理他的输入。<br /><cite>注：解决错误最好的办法，就是不让错误发生。而『实时预览』就是有效避免错误的好设计。</cite></p>
            <div className="reaction1"></div>

            <p>进度指示：当一个操作需要一定时间完成时，就需要即时告知进度，保持与用户的沟通。<br />常见的进度指示：『按钮加载』、『表格加载』、『富列表加载』、『页面加载』。可根据操作的量级和重要性，展示不同类型的进度指示。</p>
            <div className="reaction2"></div>
            <p>点击刷新：告知用户有新内容，并提供按钮等工具帮助用户查看新内容。</p>
            <div className="reaction3"></div>
            <p>定时刷新：无需用户介入，定时展示新内容。</p>
            <div className="reaction4"></div>
        </Layout>
    }
}
