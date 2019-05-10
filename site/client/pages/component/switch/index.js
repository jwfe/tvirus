
import React, { Component } from 'react';
import Layout from '../../../common/compLayout';

import { Switch, Icon, Row, Col } from 'tvirus';
import './index.less'

export default class SwitchDemo extends Component{
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
                            <Switch />
                        </Col>                        
                        <Col span={12}>
                            <Switch onText="on" offText="off" />
                        </Col>
                    </Row>
                </div>
            )
        });

        childs.push({
            title: '图表/大小',
            children: (
                <div className="code-demo">
                    <Row>
                        <Col span={12}>
                            <Switch onText={<Icon type="smile" />} offText={<Icon type="meh" />} />
                        </Col>                        
                        <Col span={12}>
                            <Switch size="small" />
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
            className="main-switch-box"
            title="Switch"
            desc="Switch的说明"
            childs={childs}
        />
    }
}
            