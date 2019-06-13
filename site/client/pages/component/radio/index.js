import React, { Component } from 'react';
import Layout from '../../../common/webcomponent';

import { Radio, Row, Col } from 'tvirus';
import './index.less'

export default class RadioDemo extends Component{
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
            title: '基础',
            children: (
                <div className="code-demo">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Radio>基础</Radio>
                        </Col>
                        <Col span={12}>
                            <Radio disabled>禁用</Radio>
                            <Radio disabled checked>禁用</Radio>
                        </Col>
                    </Row>
                </div>
            )
        });


        childs.push({
            title: '组合',
            children: (
                <div className="code-demo">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Radio.Group defaultValue="1" name="test1">
                                <Radio value="1">分组1</Radio>
                                <Radio value="2">分组2</Radio>
                            </Radio.Group>
                        </Col>
                        <Col span={12}>
                                <Radio.Group disabled name="test2">
                                    <Radio>分组1</Radio>
                                    <Radio>分组1</Radio>
                                </Radio.Group>
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
            keyword="radio"
            className="main-radio-box"
            title="Radio"
            desc="单选按钮允许用户从多个选项中选择一个选项。Radio 所有选项默认可见，方便用户在比较中选择，因此选项不宜过多。"
            childs={childs}
        />
    }
}
            