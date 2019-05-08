import React, { Component } from 'react';
import Layout from '../../../common/design';

import './index.less'

export default class LayoutDemo extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return <Layout {...this.props} 
            className="main-layout-box"
            title="布局"
            desc={
                <div>
                    UI界面的布局空间要基于『动态、体系化』的角度出发展开。<br />在中台视觉体系中定义布局系统，从 5 个方面出发：1.统一的画板尺寸  2.适配方案  3.网格单位  4.栅格  .5.常用模度
                </div>
            }
        >
            
            <h3>统一画板</h3>
            <p>我们统一画板尺寸为1366px,左侧导航区域180px，间距10px，工作区域1166px。</p>
            <div className="layout1"></div>

            <h3>适配</h3>
            <p>将左边的导航栏固定，对右边的工作区域进行动态缩放。</p>

            <h3>栅格化</h3>
            <p>
            通过网格体系来实现视觉体系的秩序。网格的基数为24栅格体系，不仅符合偶数的思路同时能够匹配多数主流的显示设备。通过建立网格的思考方式，还能帮助设计者快速实现布局空间的设计决策同时也能简化设计到开发的沟通损耗。<br />
            如下图所示。页面中栅格的 Gutter 设定了定值，即浏览器在一定范围扩大或缩小，栅格的 Column 宽度会随之扩大或缩小，但 Gutter的宽度值固定不变。<br />
            交付时请注意：<br />
            1.清晰的定义动态布局范围<br />
            2.尽量保持偶数思维<br />
            3.关键数据的交付（Gutter=10、Column=39）<br />
            4.区块的定义要从 column 开始到 column 结束
            </p>
            <div className="layout2"></div>
            <p>在一个组件内部，元素的横向间距也应该有所不同。</p>
            <div className="layout3"></div>
        </Layout>
    }
}
