import React, { Component } from 'react';
import Layout from '../../../common/design';

import './index.less'

export default class LightweightDemo extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return <Layout {...this.props} 
            className="main-lightweight-box"
            title="化繁为简"
            desc="根据费茨法则（Fitts's Law）所描述的，如果用户鼠标移动距离越少、对象相对目标越大，那么用户越容易操作。通过运用放在内容中的操作工具，使内容和操作融合，从而简化交互。"
        >
            <blockquote>
            费茨法则 ：到达目标的时间是到达目标的距离与目标大小的函数，其中：1.设备当前位置和目标位置的距离（D）；2.目标的大小（W）。距离越长，所用时间越长；目标越大，所用时间越短。
            </blockquote>

            <h3>实时可见</h3>
            <p>如果某个操作非常重要，就应该把它放在界面中，并实时可见。</p>
            <div className="lightweight1"></div>

            <h3>悬停即现</h3>
            <p>如果某个操作不那么重要，可以在悬停在该对象上时展示操作项。</p>
            <div className="lightweight2"></div>

            <h3>开关显示</h3>
            <p>如果某些操作只需要在特定模式时显示，可以通过开关来实现。</p>
            <div className="lightweight3"></div>

            <h3>可视区域 ≠ 可点击区域</h3>
            <p>当需要增强按钮的响应性时，可通过增加用户点击热区的范围，而不是增大按钮，从而增强响应性，又不缺失美感。</p>
            <div className="lightweight4"></div>
        </Layout>
    }
}
