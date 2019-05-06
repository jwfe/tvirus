import React, { Component } from 'react';
import Layout from '../../../common/design';
import { I18nReceiver as Receiver } from '@i18n';
import { Row, Col } from '@grid';

import './index.less'

export default class ColorDemo extends Component{
    constructor(props){
        super(props);
    }
    renderColorCard(data){
        const arr = [];

        function colorChild(childData){
            const arr2 = [];
            for(let key in childData){
                arr2.push(<span className={key}>{childData[key]}</span>);
            }
            return arr2;
        }

        for(let key in data){
            if(key !== 'mark'){
                arr.push(
                    <Col span={8}>
                        <div className={key}>
                            {
                                colorChild(data[key])
                            }
                            
                        </div>
                    </Col>
                    
                )
            }
            
        }

        return arr;
    }
    render() {
        return <Layout {...this.props} 
            className="main-color-box"
            title="颜色"
            desc="T-virus色彩体系主要定义了基础色板、功能色板、中性色板和数据可视化色板。"
        >
            
            <h3>主色</h3>
            <p>色彩是体现产品特性和传播理念最直观的视觉元素之一，主色色值为#ff9645，色彩：保留智慧、商务、通透。<br />应用场景包括：关键行动点，操作状态、重要信息高亮，图形化等场景。同时根据主色延伸出一套色板共8色，可以根据不同场景进行克制的使用</p>
            <div className="color1-r">
                <i className="r1"></i>
                <i className="r2"></i>
                <i className="r3"></i>
            </div>
            <div className="color1">
                <span className="c1">C-1</span>
                <span className="c2">C-2</span>
                <span className="c3">C-3</span>
                <span className="c4">C-4</span>
                <span className="c5 master">主色</span>
                <span className="c6">C-6</span>
                <span className="c7">C-7</span>
            </div>

            <h3>功能色</h3>
            <p>功能色代表了明确的信息以及状态，比如成功、出错、失败、提醒、链接、好、差、等。功能色的选取需要遵守用户对色彩的基本认知。在一套产品体系下，功能色尽量保持一致，不要有过多的自定义干扰用户的认知体验。</p>
            <div className="color2">
                <Row gutter={50}>
                    <Receiver componentName="colorPage">
                        {i18n => (
                            this.renderColorCard(i18n)
                        )}
                    </Receiver>
                </Row>
            </div>
            
            <h3>中性色</h3>
            <p>中性色主要被大量的应用在界面的文字部分，此外背景、边框、分割线、等场景中也非常常见。产品中性色的定义需要考虑深色背景以及浅色背景的差异,以#000000和#ffffff为标准，按照透明度方式实现。</p>
            <div className="color3"></div>

            <h3>数据可视化色板</h3>
            <p>数据可视化色板是在基础色板以及中性色板的基础上，依照『有效、清晰、准确、美』的原则产生的。</p>
            <div className="color4">
                <span className="c1">图表-竞对平均</span>
                <span className="c2">图表色1</span>
                <span className="c3">图表色2</span>
                <span className="c4">图表色3</span>
                <span className="c5">图表色4</span>
            </div>

            <div className="color4">
                <span className="c6">图表色5</span>
                <span className="c7">图表色6</span>
                <span className="c8">图表色7</span>
                <span className="c9">图表色8</span>
                <span className="c10">图表色9</span>
            </div>

            <div className="color4">
                <span className="c11">图表色10</span>
                <span className="c12">图表色11</span>
                <span className="c13">图表色12</span>
                <span className="c14">图表色13</span>
                <span className="c15">图表色14</span>
            </div>
            
            <h3>色彩使用原则</h3>
            <p>在设计中，色彩在使用时更多的是基于信息传递、操作引导和交互反馈等目的。在不破坏操作效率，影响信息的清晰传达的这些原则之上，<em style={{color: '#ff9645'}}>理性而克制</em>的选择颜色。<strong>配图插画以及展示性页面中可以适当打破这一思路。</strong></p>
        </Layout>
    }
}
