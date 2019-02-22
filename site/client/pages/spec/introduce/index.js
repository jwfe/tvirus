import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class Index extends Component{
    render() {
        return (
            <div>
                <div>
                    <Link to="/spec/introduce">设计语言</Link>
                </div>
                <div>
                    <Link to="/component/introduce">组件</Link>
                </div>
            </div>
        )
    }
}