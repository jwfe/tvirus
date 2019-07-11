
import React, { Component } from 'react';
import Layout from '../../../common/webcomponent';

import { Tree, Row, Col, Util } from 'tvirus';

import './index.less'

export default class TreeDemo extends Component{
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

        const x = 3;
        const y = 2;
        const z = 2;
        const gData = [];

        const expandedKeys = ['0-0', '0-0-0', '0-0-0-0']

        const generateData = (_level, _preKey, _tns) => {
            const preKey = _preKey || '0';
            const tns = _tns || gData;

            const children = [];
            for (let i = 0; i < x; i++) {
                const key = `${preKey}-${i}`;
                tns.push({ label: key, key });
                if (i < y) {
                    children.push(key);
                }
            }
            if (_level < 0) {
                return tns;
            }
            const level = _level - 1;
            children.forEach((key, index) => {
                tns[index].children = [];
                return generateData(level, key, tns[index].children);
            });
        };
        generateData(z);

        childs.push({
            title: '正常',
            children: (
                <div className="code-demo">
                    <Row>
                        <Col span={12}>
                            <Tree expandedKeys={expandedKeys} data={gData} onChange={(...arg) => {console.log(...arg)}} />
                        </Col>
                        <Col span={12}>
                            <Tree isShowSearch expandedKeys={expandedKeys} data={gData} onChange={(...arg) => {console.log(...arg)}} />
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
            keyword="tree"
            className="main-tree-box"
            title="Tree"
            desc="完整展示事物的层级关系。"
            childs={childs}
        />
    }
}
            