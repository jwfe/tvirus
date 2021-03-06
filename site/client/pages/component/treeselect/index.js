
import React, { Component } from 'react';
import Layout from '../../../common/webcomponent';

import { TreeSelect, Row, Col } from 'tvirus';

import './index.less'

export default class TreeselectDemo extends Component{
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
                        <Col span={12}><TreeSelect data={gData}></TreeSelect></Col>
                        <Col span={12}><TreeSelect isShowSearch data={gData} multiple></TreeSelect></Col>
                    </Row>
                </div>
            )
        });

        this.setState({childs})
    }

    render() {
        const {childs} = this.state;

        return <Layout {...this.props} 
            keyword="treeselect"
            className="main-treeselect-box"
            title="Treeselect"
            desc="可选择的结构是个树形结构时，可使用。如：酒店树"
            childs={childs}
        />
    }
}
            