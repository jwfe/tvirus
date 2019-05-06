import React, { Component } from 'react';
import Layout from '../../../common/design';
import Table from '@table';

import './index.less'

export default class FontDemo extends Component{
    constructor(props){
        super(props);
        this.state = {
            columns: [
                { title: '字体调用顺序', key: 'sort', width: 260},
                { title: 'OS', key: 'os', width: 260 },
                { title: 'Window', key: 'window', width: 260 }
            ],
            data: [
                {
                    sort: `默认中文字体`,
                    os: '苹方',
                    window: `微软雅黑`,
                },

                {
                    sort: `备用中文字体`,
                    os: '黑体',
                    window: `黑体`,
                },

                {
                    sort: `默认英文字体`,
                    os: 'Helvetica',
                    window: `arial`,
                },

                {
                    sort: `备用英文字体`,
                    os: 'arial',
                    window: `SimHei`,
                },
                {
                    sort: `默认数字字体`,
                    os: 'Helvetica',
                    window: `arial`,
                },
                {
                    sort: `备用数字字体`,
                    os: 'arial',
                    window: `SimHei`,
                },

            ]
        }
    }

    render() {
        const { columns, data } = this.state;
        return <Layout {...this.props} 
            className="main-font-box"
            title="字体"
            desc="从下面五个方面进行规范：1.字体	2.字号	3.字阶与行高	4.字重	5.字体颜色"
        >
            
            <h3>字体使用</h3>
            <p>设计字体默认使用无版权字体，技术调用优先使用系统默认的界面字体，同时提供一套利于屏显的备用字体库，来维护在不同平台以及浏览器的显示下，字体始终保持易读性和可读性。</p>
            <div>
                <Table 
                    style={{height: '460px'}}
                    columns={columns}
                    data={data}
                />
            </div>

            <h3>主字体</h3>
            <p>基于电脑显示器阅读距离（50 cm）以及最佳阅读角度（0.3），确定主字体大小为 14，以保证在多数常用显示器上的用户阅读效果。</p>
            <div className="font1"></div>

            <h3>字阶行高</h3>
            <p>字阶是指一系列有规律的不同尺寸的字体。行高可以理解为一个包裹在字体外面的无形的盒子。建议的主要字体为 14，与之对应的行高为 22。其余的字阶的选择可根据具体情况进行自由的定义。</p>
            <p>在系统设计中（展示型页面除外）常用字阶为12、14、16、18，保持克制的原则。</p>
            <div className="font2"></div>

            <h3>字重</h3>
            <p>字重只出现 regular 以及 medium 的两种字体重量，分别对应代码中的 400 和 500。在英文字体加粗的情况下会采用 semibold 的字体重量，对应代码中的 600。</p>
            <div className="font3"></div>

            <h3>应用场合</h3>
            <div className="font4"></div>

            <h3>原则</h3>
            <p>少即是多：在视觉展现上能够用尽量少的样式去实现设计目的。避免毫无意义的使用大量字阶、颜色、字重强调视觉重点或对比关系。</p>
        </Layout>
    }
}
