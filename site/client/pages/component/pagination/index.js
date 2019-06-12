
import React, { Component } from 'react';
import Layout from '../../../common/webcomponent';

import { Pagination } from 'tvirus';
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
            keyword="pagination"
            className="main-pagination-box"
            title="分页"
            desc="当有大量内容需要展现时进行分页加载处理，分页器可以让用户清楚的知道自己所要浏览的内容有多少、已经浏览了多少、还剩余多少。"
            childs={childs}
        />
    }
}
            