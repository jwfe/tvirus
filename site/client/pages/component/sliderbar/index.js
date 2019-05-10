import React, { Component } from 'react';
import Layout from '../../../common/compLayout';

import { Sliderbar } from 'tvirus';
import './index.less'

export default class SliderbarDemo extends Component{
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
                    <Sliderbar />
                </div>
            )
        });

        childs.push({
            title: '默认设置',
            children: (
                <div className="code-demo">
                    <Sliderbar value={30} />
                </div>
            )
        });

        childs.push({
            title: '竖向',
            children: (
                <div className="code-demo" style={{height: 300}}>
                    <Sliderbar vertical={true} value={30} />
                </div>
            )
        });

        childs.push({
            title: '禁用',
            children: (
                <div className="code-demo">
                    <Sliderbar disabled={true} value={30} />
                </div>
            )
        });

        this.setState({childs})
    }

    render() {
        const {childs} = this.state;

        return <Layout {...this.props} 
            className="main-sliderbar-box"
            title="Sliderbar"
            desc="滑块选择可以在连续或间断的区间内，通过滑动锚点来选择一个合适的数值。这种交互特性使得它在设置诸如音量，亮度，色彩饱和度等需要反映强度等级的选项时是一种极好的选择。"
            childs={childs}
        />
    }
}
            