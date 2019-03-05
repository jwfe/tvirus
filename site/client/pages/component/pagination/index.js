
import React, { Component } from 'react';
import Layout from '../../../common/compLayout';

import Pagination from '@pagination';
import './index.less'

export default class PaginationDemo extends Component{
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
                    <Pagination total={500}  />
                </div>
            )
        });

        this.setState({childs})
    }

    render() {
        const {childs} = this.state;

        return <Layout {...this.props} 
            className="main-pagination-box"
            title="分页"
            desc="在数据量较多时，采用分页的形式分隔长列表，每次只加载一个页面。"
            childs={childs}
        />
    }
}
            