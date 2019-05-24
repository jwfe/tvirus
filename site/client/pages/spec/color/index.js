import React, { Component } from 'react';
import Layout from '../../../common/design';
import { I18nReceiver as Receiver, Row, Col } from 'tvirus';

import './index.less';
const funColors = {
    feel: {
        'bad': '#ff7e7a',
        'good': '#6ec590',
        'medium': '#ffd16b',
        'nomarl': '#efefef',
    },
    fun: {
        'fail': '#f32736',
        'success': '#57c22d',
        'warn': '#f8ac2f',
        'link': '#2592fb',
    },
    season: {
        'hot': '#ff5e59',
        'cool': '#2592fb',
        'menu': '#33415c'
    }
} 

export default class ColorDemo extends Component{
    constructor(props){
        super(props);
    }
    renderColorCard(data){
        const arr = [];

        function colorChild(childData, masterKey){
            const arr2 = [];
            const data = funColors[masterKey];
            for(let key in childData){
                arr2.push(<span style={{backgroundColor: data[key]}}><em>{data[key]}</em>{childData[key]}</span>);
            }
            return arr2;
        }

        for(let key in data){
            if(key !== 'mark'){
                arr.push(
                    <Col span={8}>
                        <div className={key}>
                            {
                                colorChild(data[key], key)
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
                {
                    ['#e18342', '#fc6034', '#e15f61'].map((color) => {
                        return <i style={{backgroundColor: color}}></i>
                    })
                }
            </div>
            <div className="color1">
                {
                    ['#fff4e9', '#fee0c1', '#fecb99', '#fdb073', '#ff9645', '#d7733a', '#b15527'].map((color, index) => {
                        let text = `C-${index + 1}`;
                        if(index === 4){
                            text = '主色'
                        }
                        return <span className={`c${index+1}`} style={{backgroundColor: color}}>{text}<em>{color}</em></span>
                    })
                }
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
                {
                    ['#fc9539', '#45a2fc', '#57ca77', '#fed465', '#9766e1'].map((color, index) => {
                        let text = `图表色${index}`;
                        if(!index) text = '图表-竞对平均';
                        return <span style={{backgroundColor: color}}>{text}<em>{color}</em></span>
                    })
                }
            </div>

            <div className="color4">
                {
                    ['#ff856a', '#87c4ff', '#e559ea', '#5de1c1', '#fb5838'].map((color, index) => {
                        let text = `图表色${index+5}`;
                        return <span style={{backgroundColor: color}}>{text}<em>{color}</em></span>
                    })
                }
            </div>

            <div className="color4">
                {
                    ['#65eeec', '#dbaffa', '#60fcbb', '#ff8533', '#fbbe95'].map((color, index) => {
                        let text = `图表色${index+10}`;
                        return <span style={{backgroundColor: color}}>{text}<em>{color}</em></span>
                    })
                }
            </div>
            
            <h3>色彩使用原则</h3>
            <p>在设计中，色彩在使用时更多的是基于信息传递、操作引导和交互反馈等目的。在不破坏操作效率，影响信息的清晰传达的这些原则之上，<em style={{color: '#ff9645'}}>理性而克制</em>的选择颜色。<strong>配图插画以及展示性页面中可以适当打破这一思路。</strong></p>
        </Layout>
    }
}
