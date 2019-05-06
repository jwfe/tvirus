import React, { Component } from 'react';
import Layout from '../../../common/design';

import './index.less'

export default class DirectDemo extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return <Layout {...this.props} 
            className="main-input-box"
            title="直接了当"
            desc="正如 Alan Cooper 所言：『需要在哪里输出，就要允许在哪里输入』。这就是直接操作的原理。eg：不要为了编辑内容而打开另一个页面，应该直接在上下文中实现编辑。"
        >
            <h3>页内编辑</h3>
            <p>单字段行内编辑<br />当『易读性』远比『易编辑性』重要时，可以使用『单击编辑』。</p>
            <div className="direct1"></div>
            <p>当『易读性』为主，同时又要突出操作行的『易编辑性』时，<br />可使用『文字链/图标编辑』。</p>
            <div className="direct2"></div>
        </Layout>
    }
}
