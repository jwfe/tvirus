
import React, { Component } from 'react';
import Layout from '../../../common/compLayout';

import Select from '@select';
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
                    <Select></Select>
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
            