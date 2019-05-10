
import React, { Component } from 'react';
import Layout from '../../../common/compLayout';

import { Datepicker, Row, Col } from 'tvirus';
import './index.less'

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
                            <Datepicker.Range />
                        </Col>
                        <Col span={12}>
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
            