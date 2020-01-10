import React, { Component } from 'react';
import Layout from '../../../common/webcomponent';

import { Datepicker, Row, Col, Util } from 'tvirus';
console.log(Util);
const { parse } = Util.date;

import './index.less';

export default class DatepickerDemo extends Component{
    constructor(props){
        super(props);
        this.state = {
            childs: []
        }
    }

    componentWillMount(){
        this.childs();
    }
    disabledDate(date){
        if(date > parse('2019-05-05') && date < parse('2019-06-21')){
            return false;
        }
        return true;
    }
    childs(){
        const childs = [];
        childs.push({
            title: '正常',
            children: (
                <div className="code-demo">
                    <Row>
                        <Col span={12}>
                            <Datepicker />
                        </Col>
                        <Col span={12}>
                            <Datepicker mode="week" showWeekNumber />
                        </Col>
                    </Row>
                </div>
            )
        });


        childs.push({
            title: '单日历特殊',
            children: (
                <div className="code-demo">
                    <Row>
                        <Col span={12}>
                            <Datepicker footer expand={[
                                {
                                    selected: true,
                                    text: '按日',
                                    onClick: function(index){
                                        this.update({mode: 'day'}, index)
                                    }
                                },
                                {
                                    text: '按月',
                                    onClick: function(index){
                                        this.update({mode: 'month'}, index)
                                    }
                                },
                                {
                                    text: '按周',
                                    onClick: function(index){
                                        this.update({mode: 'week'}, index)
                                    }
                                },
                                {
                                    text: '按季度',
                                    onClick: function(index){
                                        this.update({mode: 'season'}, index)
                                    }
                                },

                                {
                                    text: '按半年',
                                    onClick: function(index){
                                        this.update({mode: 'halfofyear'}, index)
                                    }
                                },
                                {
                                    text: '按年',
                                    onClick: function(index){
                                        this.update({mode: 'year'}, index)
                                    }
                                }
                            ]} />
                        </Col>
                        <Col span={12}>
                            {/* <Datepicker mode="week" showWeekNumber /> */}
                        </Col>
                    </Row>
                </div>
            )
        });


        childs.push({
            title: '范围选择',
            children: (
                <div className="code-demo">
                    <Row>
                        <Col span={12}>
                            <Datepicker.Range minDate='2019-05-08' maxDate='2019-05-12' />
                        </Col>
                        <Col span={12}>
                            <Datepicker.Range minDate='2019-05-08' maxDate='2019-05-12' disabledDate={this.disabledDate.bind(this)} />
                        </Col>
                    </Row>
                </div>
            )
        });

        childs.push({
            title: '特殊范围选择',
            children: (
                <div className="code-demo">
                    <Row>
                        <Col span={12}>
                            <Datepicker.Range baseline="prev" minDate='2019-05-08' maxDate='2019-05-12' mode="week" expand={[
                                {
                                    text: '按日',
                                    onClick: function(index){
                                        this.update({mode: 'day'}, index)
                                    }
                                },
                                {
                                    text: '按月',
                                    onClick: function(index){
                                        this.update({mode: 'month'}, index)
                                    }
                                },
                                {
                                    selected: true,
                                    text: '按周',
                                    onClick: function(index){
                                        this.update({mode: 'week'}, index)
                                    }
                                },
                                {
                                    text: '按年',
                                    onClick: function(index){
                                        this.update({mode: 'year'}, index)
                                    }
                                }
                            ]}
                            disabled={false}
                            />
                        </Col>

                        <Col span={12}>
                            <Datepicker.Range minDate='2019-05-08' maxDate='2019-05-12' mode="month" />
                        </Col>
                    </Row>
                </div>
            )
        });

        this.setState({childs})
    }

    render() {
        const {childs} = this.state;

        return <Layout {...this.props} 
			keyword="datepicker"
            className="main-datepicker-box"
            title="Datepicker"
            desc="日期选择器为用户提供了一种可视化的方式去浏览和选择一个日期或者日期范围。"
            childs={childs}
        />
    }
}
            