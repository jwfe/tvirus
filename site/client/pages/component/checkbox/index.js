import React, { Component } from 'react';
import Layout from '../../../common/compLayout';

import { Row, Col } from '@grid';
import Checkbox from '@checkbox';
import './index.less'

export default class CheckboxDemo extends Component{
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
                    <Row gutter={16}>
                        <Col span={12}>
                            <Checkbox>基础</Checkbox>
                        </Col>
                        <Col span={12}>
                            <Checkbox disabled>禁用</Checkbox>
                            <Checkbox disabled checked>禁用</Checkbox>
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
                            <Checkbox.Group defaultValue={[1,2,3,4]} name="test1">
                                <Checkbox value={1}>Checkbox 1</Checkbox>
                                <Checkbox value={2}>Checkbox 2</Checkbox>
                                <Checkbox value={3}>Checkbox 3</Checkbox>
                                <Checkbox value={4}>Checkbox 4</Checkbox>
                            </Checkbox.Group>
                        </Col>
                        <Col span={12}>
                                <Checkbox.Group disabled name="test2">
                                    <Checkbox checked>Checkbox 1</Checkbox>
                                    <Checkbox>Checkbox 2</Checkbox>
                                </Checkbox.Group>
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
            className="main-checkbox-box"
            title="Checkbox"
            desc="Checkbox的说明"
            childs={childs}
        />
    }
}
            