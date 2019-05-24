import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import { Menu, Icon, Row, Col, Badge, Card, Button, Chart, Progress, Tabs, Tabpanel, Table, Datepicker, Popup } from 'tvirus';
import { columns, data as columns_data } from './tableData';

import './demo.less';

class ChartCard extends Component{
    state = {}
    constructor(props){
        super(props);
    }
    renderChart(){
        const { chart } = this.props;
        if(chart.type === 'progress'){
            return <Progress status={chart.status} value={chart.value} />
        }
        if(chart.type === 'colorProgress'){
            return <Progress type="color" status={chart.status} value={chart.value} />
        }
        return <Chart height={40} option={chart} />
    }
    render(){
        const { meta, total, chart, trend } = this.props;
        return (
            <Card
                className="chart-card-wraper" 
                bordered={false} 
                style={{paddingTop: 12, paddingBottom: 12}} ref={(el) => {this.chartNode = el}}
            >
                <div className="meta-wrapper">
                    <div className="meta">
                        <span>{ meta }</span>
                        <Popup
                            content={meta}
                            position="top left"
                            showArrow
                            trigger="hover"
                            prefix="tooltip"
                            visible={false}
                        >
                            <Icon type="info-circle" />
                        </Popup>
                        
                    </div>
                    <div className="meta-totall">{ total }</div>
                </div>
                <div className="chart-wrapper">
                    {this.renderChart()}
                </div>
                <div className="trend-footer">
                    {
                        trend.map((item, index) => {
                            return (
                                <div className="trend-item" key={index}>
                                    <span>
                                        <span>{item.text}</span>
                                        {item.value && <span className="trend-item-value">{item.value}</span>}
                                    </span>
                                    {item.isUp && <span className="trend-item-up up"></span>}
                                    {item.isDown && <span className="trend-item-down down"></span>}
                                </div> 
                            )
                        })
                    }
                </div>
            </Card>
        )
    }
}

export default class DemoIndex extends Component{
    constructor(props){
        super(props);

    }
    state = {
        columns,
        columns_data,
        bubble: [
            {
                name: '交通方便',
                value: 10,
                gradient: {
                    start: 'rgba(96, 191, 131, 0.7)',
                    end: 'rgba(96, 191, 131, 1)'
                }
            }, {
                name: '交通差',
                value: 100,
                gradient: {
                    start: 'rgba(255, 114, 108, 0.7)',
                    end: 'rgba(255, 114, 108, 1)'
                }
            }, {
                name: '设置不好',
                value: 50,
                gradient: {
                    start: 'rgba(255, 114, 108, 0.7)',
                    end: 'rgba(255, 114, 108, 1)'
                }
            }, {
                name: '设施',
                value: 70,
                gradient: {
                    start: 'rgba(96, 191, 131, 0.7)',
                    end: 'rgba(96, 191, 131, 1)'
                }
            }, {
                name: '早餐',
                value: 75,
                gradient: {
                    start: 'rgba(96, 191, 131, 0.7)',
                    end: 'rgba(96, 191, 131, 1)'
                }
            }, {
                name: '晚餐',
                value: 80,
                gradient: {
                    start: 'rgba(96, 191, 131, 0.7)',
                    end: 'rgba(96, 191, 131, 1)'
                }
            }
        ],
        collapsed: false,
        chartCardData: [
            {
                meta: '慧评得分',
                total: 89.31,
                chart: {
                    type: 'progress',
                    value: 90
                },
                trend: [
                    {
                        text: '周同比',
                        value: '12%',
                        isUp: true
                    },
                    {
                        text: '月同比',
                        value: '12%',
                        isDown: true
                    }
                ]
            },
            {
                meta: '点评数',
                total: 2654,
                chart: {
                    grid: {
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0
                    },
                    tooltip: {
                        confine: true,
                        trigger: 'axis',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        textStyle: {
                            color: '#5b5b5b'
                        },
                        extraCssText: 'box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);',
                        padding: [5, 3],
                        formatter(datas){
                            let html = '';
                            datas.forEach((data) => html += `<p>${data.marker}<span style="display:inline-block;width:120px">${data.name}</span><span>${data.value}</span></p>`);
                            return html;
                        }
                    },
                    legend: {
                        x: 0,
                        y: 'top'
                    },
                    xAxis: {
                        show: false,
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
                        data: ['12-01','12-02','12-03','12-04','12-05','12-06','12-07']
                    },
                    yAxis : { 
                        show: false,
                        type: 'value'
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
                                50,
                                70
                            ]
                        }
                    ]
                },
                trend: [
                    {
                        text: '好评数',
                        value: '2000'
                    },
                    {
                        text: '好评率',
                        value: '90%'
                    }
                ]
            },
            {
                meta: '未回复点评',
                total: 26,
                chart: {
                    type: 'colorProgress',
                    value: [
                        {text: 'ctrip', color: '#3897FF'}, 
                        {text: 'elong', color: '#F9CD38'}, 
                        {text: 'qunar', color: '#36C4C4'}
                    ]
                },
                trend: [
                    {
                        text: '分来来自携程、艺龙、去哪儿'
                    }
                ]
            },
            {
                meta: '差评数',
                total: 2654,
                chart: {
                    grid: {
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0
                    },
                    tooltip: {
                        confine: true,
                        trigger: 'axis',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        textStyle: {
                            color: '#5b5b5b'
                        },
                        extraCssText: 'box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);',
                        padding: [5, 3],
                        formatter(datas){
                            let html = '';
                            datas.forEach((data) => html += `<p>${data.marker}<span style="display:inline-block;width:120px">${data.name}</span><span>${data.value}</span></p>`);
                            return html;
                        }
                    },
                    xAxis: {
                        show: false, 
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
                        data: ['12-01','12-02','12-03','12-04','12-05','12-06','12-07']
                    },
                    yAxis : { 
                        show: false, 
                        type : 'value',
                        axisLine: {
                            show: false
                        },
                        axisTick:{ 
                            show: false
                        },
                        splitLine:{ 
                            show: false, 
                            lineStyle:{ 
                                type:'dashed',
                                color: '#E9E9E9'
                            }
                        } 
                    },
                    
                    series: [
                        {
                            type: 'line',
                            showSymbol: false,
                            smooth: true,
                            barWidth: 0,
                            lineStyle:{
                                width: 0,
                            },
                            areaStyle: {
                                color: '#975fe4',
                            },
                            data: [
                                120,
                                110,
                                80,
                                234,
                                5,
                                4,
                                250
                            ]
                        }
                    ]
                },
                trend: [
                    {
                        text: '周同比',
                        value: '12%',
                        isUp: true
                    },
                    {
                        text: '月同比',
                        value: '12%',
                        isDown: true
                    }
                ]
            }
        ],
        review: {
            chart: {
                grid: {
                    top: 5,
                    left: 28,
                    right: 0,
                    bottom: 19
                },
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: '#fff',
                    textStyle: {
                        color: '#5b5b5b'
                    },
                    padding: [7, 10],
                    formatter(datas){
                        // alert(JSON.stringify(datas));
                        let html = '';
                        let name = `<h6 style="margin-bottom: 10px;color:#8e8e8e">${datas[0].name}</h6>`;
                        html += name;
                        datas.forEach((data) => html += `<p>${data.marker}<span style="display:inline-block;width:120px">${data.seriesName}</span><span>${data.value}</span></p>`);
                        return html;
                    }
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
                    data: ['12-15','12-16','12-17','12-18','12-19','12-20','12-21'],
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
                            50,
                            110,
                            80,
                            134,
                            80,
                            41,
                            100
                        ]
                    }
                ]
            }
        },
        performance: {
            chart: {
                grid: {
                    top: 45,
                    left: 50,
                    right: 0,
                    bottom: 19
                },
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: '#fff',
                    textStyle: {
                        color: '#5b5b5b'
                    },
                    padding: [7, 10],
                    formatter(datas){
                        // alert(JSON.stringify(datas));
                        let html = '';
                        let name = `<h6 style="margin-bottom: 10px;color:#8e8e8e">${datas[0].name}</h6>`;
                        html += name;
                        datas.forEach((data) => html += `<p>${data.marker}<span style="display:inline-block;width:120px">${data.seriesName}</span><span>${data.value}</span></p>`);
                        return html;
                    }
                },
                legend: {
                    left: 10,
                    top: 0,
                    itemWidth: 10,
                    itemHeight: 10,
                },
                xAxis: {
                    type: 'category',
                    // boundaryGap: ['10%', '10%'],
                    axisLine: {
                        lineStyle: {
                            color: '#e0e0e0'
                        }
                    },
                    axisLabel: {
                        color: '#333'
                    },
                    data: ['12-15','12-16','12-17','12-18','12-19','12-20','12-21'],
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
                            50,
                            110,
                            80,
                            134,
                            80,
                            41,
                            100
                        ]
                    },
                    {
                        name: '好评率',
                        type: 'bar',
                        showSymbol: false,
                        smooth: true,
                        barWidth: 20,
                        itemStyle:{
                            color: '#48C368',
                        },
                       
                        data: [
                            50,
                            120,
                            100,
                            154,
                            70,
                            141,
                            30
                        ]
                    }
                ]
            }
        }
    }
    componentDidMount(){

    }
    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }
    render() {
        return (
            <div className="root-wraper">
                <div className="root-menu" style={{width: this.state.collapsed ? 80 : ''}}>
                    <div className="logo">
                        <a href="#"><Icon type="bwlogo" /></a>
                        {/* <span onClick={this.toggleCollapsed}><Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} /></span> */}
                    </div>
                    <Menu theme="dark" inlineCollapsed={this.state.collapsed}>
                        <Menu.Item><span><Icon type="overview" /><span>概览</span></span></Menu.Item>
                        <Menu.SubMenu title={<span><Icon type="review" /><span>点评</span></span>}>
                            <Menu.ItemGroup title={`点评分析`}>
                                <Menu.Item>点评总览</Menu.Item>
                                <Menu.Item>点评热词</Menu.Item>
                                <Menu.Item>点评总览</Menu.Item>
                            </Menu.ItemGroup>
                        </Menu.SubMenu>

                        <Menu.SubMenu title={<span><Icon type="quality_inspection" /><span>质检</span></span>}>
                            <Menu.ItemGroup title={`质检分析`}>
                                <Menu.Item>质检总览</Menu.Item>
                                <Menu.Item>质检热词</Menu.Item>
                                <Menu.Item>质检总览</Menu.Item>
                            </Menu.ItemGroup>
                        </Menu.SubMenu>

                        <Menu.SubMenu title={<span><Icon type="live_in" /><span>住中</span></span>}>
                            <Menu.ItemGroup title={`住中分析`}>
                                <Menu.Item>住中总览</Menu.Item>
                                <Menu.Item>住中热词</Menu.Item>
                                <Menu.Item>住中总览</Menu.Item>
                            </Menu.ItemGroup>
                        </Menu.SubMenu>
                    </Menu>
                </div>
                <main className="content-wrapper">
                    <nav className="navbar">
                        <Row>
                            <Col span={10}>当前酒店：北京龙泉宾馆马甸桥店</Col>
                            <Col span={14}>
                                <ul>
                                    <li>
                                        <Icon type="search" />
                                        <span className="text">切换酒店</span>
                                    </li>
                                    <li>
                                        <Badge><Icon type="email" /></Badge>
                                        <span className="text">消息</span>
                                    </li>
                                    <li>
                                        <Icon type="user" />
                                        <span className="text">May</span>
                                    </li>
                                    <li>
                                        <Icon type="setup" />
                                        <span className="text">设置</span>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </nav>
                    <div className="page-main">
                        <Card bordered={false} style={{paddingTop: 12, paddingBottom: 12}}>
                            <div className="sort-wrapper">
                                <span>统计时间: 2019-02-15 ~ 2019-02-21</span>
                                <div className="date-sort">
                                    <Datepicker position="bottom" trigger="hover" minDate='2019-05-08' maxDate='2019-05-12'><Button size="small">今日</Button></Datepicker>
                                    <Button size="small">昨日</Button>
                                    <Button size="small">近2日</Button>
                                    <Button size="small">近7日</Button>
                                    <Button type="primary" size="small">近30日</Button>
                                </div>
                            </div>
                        </Card>
                        <Row gutter={20} style={{marginTop: 20, marginBottom: 20, marginLeft: -12, marginRight: -12}}>
                            {
                                this.state.chartCardData.map((data, index) => {
                                    return (
                                        <Col span={6} key={index}>
                                            <ChartCard meta={data.meta} total={data.total} chart={data.chart} trend={data.trend} />
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                        <Row gutter={20} style={{marginTop: 20, marginBottom: 20, marginLeft: -12, marginRight: -12}}>
                            <Col span={18}>
                                <Card className="review" title="点评" extra={<span><a href="#">查看详情</a><Icon type="right" /></span>} bordered={false} style={{paddingTop: 12}}>
                                    <Row gutter={20} style={{marginLeft: -12, marginRight: -12}}>
                                        <Col span={16}>
                                            <h4>点评趋势图</h4>
                                            <div>
                                                <Chart height={250} option={this.state.review.chart}/>
                                            </div>
                                        </Col>
                                        <Col span={8}>
                                            <div className="review-wrapper">
                                                <h4>点评来源排行</h4>
                                                <ul className="review-rankingList">
                                                    {
                                                        [
                                                            {text:'携程', value:18, as: 10, isDown: true},
                                                            {text:'艺龙', value:18, as: 10, isDown: true},
                                                            {text:'去哪儿', value:18, as: 10, isUp: true},
                                                            {text:'美团', value:18, as: 10, isDown: true},
                                                            {text:'飞猪', value:18, as: 10, isUp: true},
                                                            {text:'大众点评', value:18, as: 10, isUp: true},
                                                            {text:'马蜂窝', value:18, as: 10, isUp: true}
                                                        ].map((item, index)=>{
                                                            const cls = ['review-rankingItemNumber'];
                                                            if(index < 3){
                                                                cls.push('review-active');
                                                            }
                                                            return (
                                                                <li key={index}>
                                                                    <span className={cls.join(' ')}>{index + 1}</span>
                                                                    <span className="review-rankingItemTitle">{item.text}</span>
                                                                    <span className="review-rankingItemValue">{item.value}</span>
                                                                    <span>同比 {item.as}%</span>
                                                                    {item.isUp && <span className="review-rankingItemArrow up"></span>}
                                                                    {item.isDown && <span className="review-rankingItemArrow down"></span>}
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card title="点评关键词" bordered={false} style={{paddingTop: 12, paddingBottom: 12}}>
                                    <Chart.Bubble height={314} data={this.state.bubble} />
                                </Card>
                            </Col>
                        </Row>
                        
                        <Row gutter={20} style={{marginTop: 20, marginBottom: 20, marginLeft: -12, marginRight: -12}}>
                            <Col span={18}>
                                <Card className="performance" title="关键表现" extra={<span><Button type="link">图表</Button>|<Button className="default-link" type="link">表格</Button></span>} bordered={false} style={{paddingTop: 12}}>
                                    <Chart height={316} option={this.state.performance.chart}/>
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card className="critical" title="首页批评" bordered={false} style={{paddingTop: 12, paddingBottom: 12}}>
                                    <div className="critical-item">
                                        <p>周边有不错的早餐，周边空旷，<span style={{color: '#f00'}}>出行不很方便</span>，酒店比较干净，空气湿度可以，酒店环境生态非常好，有些小动物。</p>
                                        <em>2018/10/23 来自携程</em>
                                    </div>
                                    <div className="critical-item">
                                        <p>周边有不错的早餐，周边空旷，<span style={{color: '#f00'}}>出行不很方便</span>，酒店比较干净，空气湿度可以，酒店环境生态非常好，有些小动物。</p>
                                        <em>2018/10/23 来自携程</em>
                                    </div>
                                    <div className="critical-item">
                                        <p>周边有不错的早餐，周边空旷，<span style={{color: '#f00'}}>出行不很方便</span>，酒店比较干净，空气湿度可以，酒店环境生态非常好，有些小动物。</p>
                                        <em>2018/10/23 来自携程</em>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                        <div className="fc-wrapper">
                            <Card style={{padding: 0}}>
                                <Tabs activeKey={1} extra={<span>
                                        <Button type="link">按日</Button>
                                        <Button type="link">按周</Button>
                                        <Button type="link">按月</Button>
                                        <Datepicker.Range minDate='2019-05-08' maxDate='2019-05-12' />
                                    </span>}>
                                    <Tabpanel tab={`预测报告`} tabKey={1}>
                                        <div className="fc-report">
                                            <Table 
                                                bordered
                                                style={{height: 396}}
                                                columns={this.state.columns}
                                                data={this.state.columns_data}
                                            />
                                        </div>
                                    </Tabpanel>
                                    <Tabpanel tab={`预测验证`} tabKey={2}>
                                        <Table 
                                            bordered
                                            style={{height: 396}}
                                            columns={this.state.columns}
                                            data={this.state.columns_data}
                                        />
                                    </Tabpanel>
                                </Tabs>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}