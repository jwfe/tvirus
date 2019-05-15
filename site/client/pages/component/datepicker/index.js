import React, { Component } from 'react';
import Layout from '../../../common/compLayout';

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
                            <Datepicker model="week" />
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

        this.setState({childs})
    }

    render() {
        const {childs} = this.state;

        return <Layout {...this.props} 
            className="main-datepicker-box"
            title="Datepicker"
            desc="日期选择器为用户提供了一种可视化的方式去浏览和选择一个日期或者日期范围。"
            childs={childs}
        />
    }
}
            