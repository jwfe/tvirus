
import React, { Component } from 'react';
import Layout from '../../../common/webcomponent';

import { Chart } from 'tvirus';
import './index.less'

export default class ChartDemo extends Component{
    constructor(props){
        super(props);
        this.state = {
            child: [],
            line: {
                title: {
                    text: '多条折线图模板'
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
                        name: '点评数',
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
                    text: '普通柱状图'
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
                    text: '普通条形图'
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

    componentWillMount(){
        this.childs();
    }

    childs(){
        const childs = [];
        childs.push({
            title: '线',
            children: (
                <div className="code-demo">
                    <Chart option={this.state.line}/>
                </div>
            )
        });

        childs.push({
            title: '柱',
            children: (
                <div className="code-demo">
                    <Chart option={this.state.bar}/>
                </div>
            )
        });

        childs.push({
            title: '饼',
            children: (
                <div className="code-demo">
                    <Chart type="pie" option={this.state.pie}/>
                </div>
            )
        });

        childs.push({
            title: '圆环',
            children: (
                <div className="code-demo">
                    <Chart.ProgressCircle value={60} startColor="#FF9645" endColor="#FF9645" width={300} height={300} />
                </div>
            )
        });

        this.setState({childs})
    }

    render() {
        const {childs} = this.state;
        
        return <Layout {...this.props} 
			keyword="chart"
            className="main-chart-box"
            title="Chart"
            desc="图表让数据表达更符合用户心理，帮助『设计者』孵化出更具业务特性的可视化解决方案以满足个性化设计需求。注：需要手工引入Echart"
            childs={childs}
        />
    }
}
            