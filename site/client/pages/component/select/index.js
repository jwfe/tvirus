import React, { Component } from 'react';
import Layout from '../../../common/compLayout';

import { Select, Row, Col } from 'tvirus';
import './index.less'

export default class SelectDemo extends Component{
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
                            <Select>
                                <Select.Option value="113">内容1</Select.Option>
                                <Select.Option value="223">内容2</Select.Option>
                            </Select>
                        </Col>
                        <Col span={12}>
                            <Select multiple={true}>
                                <Select.Option value="113">内容1</Select.Option>
                                <Select.Option value="223">内容2</Select.Option>
                            </Select>
                        </Col>
                    </Row>
                    
                </div>
            )
        });
        childs.push({
            title: '禁用',
            children: (
                <div className="code-demo">
                    <Row>
                        <Col span={12}>
                            <Select disabled>
                                <Select.Option value="113">内容1</Select.Option>
                                <Select.Option value="223">内容2</Select.Option>
                            </Select>
                        </Col>
                        <Col span={12}>
                            <Select multiple={true}>
                                <Select.Option value="113" disabled>内容1</Select.Option>
                                <Select.Option value="223">内容2</Select.Option>
                            </Select>
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
            className="main-select-box"
            title="Select"
            desc="Select的说明"
            childs={childs}
        />
    }
}
            