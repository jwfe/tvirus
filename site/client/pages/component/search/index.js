
import React, { Component } from 'react';
import Layout from '../../../common/compLayout';

import { Search } from 'tvirus';
import './index.less'

export default class SearchDemo extends Component{
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
                    <Search data={['charles', 'may', 'amy', 'ming']} showDropdown={true} />
                </div>
            )
        });

        this.setState({childs})
    }

    render() {
        const {childs} = this.state;

        return <Layout {...this.props} 
            className="main-search-box"
            title="Search"
            desc="搜索可以让用户在巨大的信息池中缩小目标范围，并快速获取需要的信息。"
            childs={childs}
        />
    }
}
            