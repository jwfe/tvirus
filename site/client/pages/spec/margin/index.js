import React, { Component } from 'react';
import Layout from '../../../common/design';
import Table from '@table';

import './index.less'

export default class MarginDemo extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return <Layout {...this.props} 
            className="main-margin-box"
            title="间距"
            desc="根据接近法则，如果信息之间关联性越高，它们之间的距离就应该越接近，也越像一个视觉单元；反之，则它们的距离就应该越远，也越像多个视觉单元。通过允许用户一目了然的对不同内容进行归组，来提升易读性。"
        >
            
            <h3>纵向间距关系</h3>
            <p>通过『小号间距』、『中号间距』、『大号间距』这三种规格来划分信息层次,10px（小号间距）、20px（中号间距）、30px（大号间距）。在这三种规格不适用的情况下，可以通过加减『基础间距』的倍数，或者增加元素来拉开信息层次。<cite>注：y=10+10*n。其中，n>=0，y 是纵向间距，10 是『基础间距』。</cite></p>
            <div className="margin1"></div>

            <h3>横向间距关系</h3>
            <p>为了适用不同尺寸的屏幕，在横向采用栅格布局来排布组件，从而保证布局的灵活性。</p>
            <div className="margin2"></div>
            <p>在一个组件内部，元素的横向间距也应该有所不同。</p>
            <div className="margin3"></div>
        </Layout>
    }
}
