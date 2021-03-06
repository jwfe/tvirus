import React, { Component } from 'react';
import Layout from '../../../common/design';

import './index.less'

export default class AlignDemo extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return <Layout {...this.props} 
            className="main-align-box"
            title="间距"
            desc="正如『格式塔学派』中的连续律（Law of Continuity）所描述的，在知觉过程中人们往往倾向于使知觉对象的直线继续成为直线，使曲线继续成为曲线。在界面设计中，将元素进行对齐，既符合用户的认知特性，也能引导视觉流向，让用户更流畅地接收信息。"
        >
            <blockquote>
            格式塔学派（德语：Gestalttheorie） ：是心理学重要流派之一，兴起于 20 世纪初的德国，又称为完形心理学；主张人脑的运作原理是整体的，『整体不同于其部件的总和』。——摘自『维基百科』
            </blockquote>

            <h3>文案对齐</h3>
            <p>如果页面的字段或段落较短、较散时，需要确定一个统一的视觉起点。</p>
            <div className="align1"></div>

            <h3>表单类对齐</h3>
            <p>冒号对齐（右对齐）能让内容锁定在一定范围内，让用户眼球顺着冒号的视觉流，就能找到所有填写项，从而提高填写效率。</p>
            <div className="align2"></div>

            <h3>数字类对齐</h3>
            <p>为了快速对比数值大小，建议所有数值取相同有效位数，并且右对齐。</p>
            <div className="align3"></div>
        </Layout>
    }
}
