
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
            desc="Search的说明"
            childs={childs}
        />
    }
}
            