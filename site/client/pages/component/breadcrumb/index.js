import React, { Component } from 'react';
import Layout from '../../../common/compLayout';
import { Link } from 'react-router-dom';

import Breadcrumb from '@breadcrumb';
import './index.less'

export default class BreadcrumbDemo extends Component{
    constructor(props){
        super(props);
        this.state = {
            childs: []
        }
    }

    componentWillMount(){
        this.childs([
            {
                title: '方向性图标',
                list: [
                    'search'
                ]
            }
        ]);
    }

    childs(){
        const childs = [];
        childs.push({
            title: '正常',
            children: (
                <div className="code-demo">
                    <Breadcrumb separator="/">
                        <Breadcrumb.Item>1</Breadcrumb.Item>
                        <Breadcrumb.Item>2</Breadcrumb.Item>
                        <Breadcrumb.Item>3</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            )
        });


        childs.push({
            title: '结合React-router@4',
            children: (
                <div className="code-demo">
                    <Breadcrumb separator="/">
                        <Breadcrumb.Item><Link to='/'>1</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>2</Breadcrumb.Item>
                        <Breadcrumb.Item>3</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            ),
            jsx: `
<div className="code-demo">
    <Breadcrumb separator="/">
        <Breadcrumb.Item><Link to='/'>1</Link></Breadcrumb.Item>
        <Breadcrumb.Item>2</Breadcrumb.Item>
        <Breadcrumb.Item>3</Breadcrumb.Item>
    </Breadcrumb>
</div>
            `
        });

        this.setState({childs})
    }

    render() {
        const {childs} = this.state;

        return <Layout {...this.props} 
            className="main-breadcrumb-box"
            title="面包屑"
            desc="显示当前页面在系统层级结构中的位置，并能向上返回。"
            childs={childs}
        />
    }
}