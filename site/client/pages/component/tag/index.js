
import React, { Component } from 'react';
import Layout from '../../../common/compLayout';

import Tag from '@tag';
import './index.less'

export default class TagDemo extends Component{
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
                    <Tag></Tag>
                </div>
            )
        });

        this.setState({childs})
    }

    render() {
        const {childs} = this.state;

        return <Layout {...this.props} 
            className="main-tag-box"
            title="Tag"
            desc="Tag的说明"
            childs={childs}
        />
    }
}
            