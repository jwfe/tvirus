import React, { Component } from 'react';
import Layout from '../../../common/design';
import { Card, Chart } from 'tvirus';

import './index.less'

export default class DatashowDemo extends Component{
    constructor(props){
        super(props);
        this.state = {
            line: {
                title: {
                    text: '多条折线图模板',
                    left: 10,
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: 16
                    }
                },
                grid: {
                    top: 100,
                    left: 50,
                    right: 0,
                    bottom: 25
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    left: 10,
                    top: 40,
                    itemWidth: 10,
                    itemHeight: 10,
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisLine: {
                        lineStyle: {
                            color: '#e0e0e0'
                        }
                    },
                    axisLabel: {
                        color: '#333'
                    },
                    data: ['周一','周二','周三','周四','周五','周六','周日']
                },
                yAxis : { 
                    type : 'value',
                    axisLine: {
                        show: false
                    },
                    axisTick:{ 
                        show: false
                    },
                    splitLine:{ 
                        show: true, 
                        lineStyle:{ 
                            type:'dashed',
                            color: '#E9E9E9'
                        }
                    } 
                },
                
                series: [
                    {
                        name: '差评率',
                        type: 'line',
                        showSymbol: false,
                        smooth: true,
                        barWidth: 20,
                        itemStyle:{
                            color: '#45a2fc',
                        },
                       
                        data: [
                            120,
                            110,
                            80,
                            234,
                            5,
                            4
                        ]
                    },
                    {
                        name: '好评率',
                        type: 'line',
                        showSymbol: false,
                        smooth: true,
                        barWidth: 20,
                        itemStyle:{
                            color: '#57ca77',
                        },
                       
                        data: [
                            110,
                            10,
                            120,
                            124,
                            95,
                            204
                        ]
                    }
                ]
            },
            bar: {
                title: {
                    text: '普通柱状图',
                    left: 10,
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: 16
                    }
                },
                grid: {
                    top: 100,
                    left: 50,
                    right: 0,
                    bottom: 25
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    x: 80,
                    y: 'top'
                },
                xAxis: {
                    type : 'category',
                    axisLine: {
                        lineStyle: {
                            color: '#e0e0e0'
                        }
                    },
                    axisTick:{ 
                        show: false
                    },
                    axisLabel: {
                        color: '#333'
                    },
                    data: ['周一','周二','周三','周四','周五','周六','周日'],
                },
                yAxis : { 
                    type: 'value',
                    axisLine: {
                        show: false
                    },
                    axisTick:{ 
                        show: false
                    },
                    splitLine:{ 
                        show: true, 
                        lineStyle:{ 
                            type:'dashed',
                            color: '#E9E9E9'
                        }
                    },
                },
                
                series: [
                    {
                        type: 'bar',
                        showSymbol: false,
                        smooth: true,
                        barWidth: 20,
                        itemStyle:{
                            color: '#45a2fc',
                        },
                       
                        data: [
                            120,
                            110,
                            80,
                            234,
                            5,
                            4
                        ]
                    }
                ]
            },
            bar2: {
                title: {
                    text: '普通条形图',
                    left: 10,
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: 16
                    }
                },
                grid: {
                    top: 100,
                    left: 50,
                    right: 0,
                    bottom: 25
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    x: 80,
                    y: 'top'
                },
                xAxis: {
                    type: 'value',
                    axisLine: {
                        show: false
                    },
                    axisTick:{ 
                        show: false
                    },
                    splitLine:{ 
                        show: true, 
                        lineStyle:{ 
                            type:'dashed',
                            color: '#E9E9E9'
                        }
                    },
                },
                yAxis : { 
                    type : 'category',
                    axisTick:{ 
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#e0e0e0'
                        }
                    },
                    axisLabel: {
                        color: '#333'
                    },
                    data: ['周一','周二','周三','周四','周五','周六','周日'],
                },
                
                series: [
                    {
                        type: 'bar',
                        showSymbol: false,
                        smooth: true,
                        barWidth: 20,
                        itemStyle:{
                            color: '#45a2fc',
                        },
                       
                        data: [
                            120,
                            110,
                            80,
                            234,
                            5,
                            4
                        ]
                    }
                ]
            },
            pie: {
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}: {c}<br />占比：{d}%"
                },
                legend: {
                    orient: 'horizontal',
                    x: 80,
                    y: 'top'
                },
                series: [
                    {
                        
                        type: 'pie',
                        showSymbol: false,
                        smooth: true,
                        barWidth: 20,
                       
                        data: [
                            {
                                name: '展会占比',
                                value: 20, 
                                itemStyle:{
                                    color: '#45a2fc',
                                }
                            },
                            {
                                name: '情侣出行占比',
                                value: 50, 
                                itemStyle:{
                                    color: '#57ca77',
                                }
                            },
                            {
                                name: '旅游占比',
                                value: 80, 
                                itemStyle:{
                                    color: '#fed465',
                                }
                            },
                            {
                                name: '家人出行占比',
                                value: 100, 
                                itemStyle:{
                                    color: '#9766e1',
                                }
                            },
                            {
                                name: '商务出行占比',
                                value: 130, 
                                itemStyle:{
                                    color: '#ff856a',
                                }
                            }
                        ]
                    }
                ]
            }
        }
    }
    render() {
        return <Layout {...this.props} 
            className="main-datashow-box"
            title="数据可视化"
            desc={
                <div>
                    可视化语言让数据表达更符合用户心理，帮助『设计者』孵化出更具业务特性的可视化解决方案以满足个性化设计需求，屏蔽不必要的设计差异和实现成本，从而解放『设计者』和前端的研发资源，实现全面提高数据图表的研发效率。<br />图表的作用是用来准确明了的向用户传递信息，所以装饰效果能不加则不加，简约至上。
                </div>
            }
        >
            
            <h3>展示</h3>
            <Card className="datashow1">
                <Chart option={this.state.line} />
            </Card>

            <Card className="datashow1">
                <Chart option={this.state.bar} />
            </Card>

            <Card className="datashow1">
                <Chart option={this.state.bar2} />
            </Card>

            <Card className="datashow1">
                <Chart option={this.state.pie} type="pie" />
            </Card>
        </Layout>
    }
}
