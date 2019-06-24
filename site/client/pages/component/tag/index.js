
import React, { Component } from 'react';
import Layout from '../../../common/webcomponent';

import { Tag } from 'tvirus';
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
                    <Tag>标签1</Tag>
                    <Tag>标签2</Tag>
                    <Tag closable={true} onChange={(e) => {console.log(e)}}>标签3</Tag>
                    <Tag>标签4</Tag>
                </div>
            )
        });

        this.setState({childs})
    }

    render() {
        const {childs} = this.state;

        return <Layout {...this.props} 
            keyword="tag"
            className="main-tag-box"
            title="Tag"
            desc="用来标记和分类"
            childs={childs}
        />
    }
}
            