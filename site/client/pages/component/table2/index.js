
import React, { Component } from 'react';
import Layout from '../../../common/webcomponent';

import {Table2} from 'tvirus';
import './index.less'

export default class Table2Demo extends Component{
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
                    <Table2></Table2>
                </div>
            )
        });

        this.setState({childs})
    }

    render() {
        const {childs} = this.state;

        return <Layout {...this.props} 
            keyword="table2"
            className="main-table2-box"
            title="Table2"
            desc="Table2的说明"
            childs={childs}
        />
    }
}
            