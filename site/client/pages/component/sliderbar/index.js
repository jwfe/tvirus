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
            desc="Sliderbar的说明"
            childs={childs}
        />
    }
}
            