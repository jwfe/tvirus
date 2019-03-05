import React, { Component } from 'react';
import Layout from '../../../common/compLayout';

import Icon from '@icon';
import './index.less'

export default class IconDemo extends Component{
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

    childs(icons){
        const childs = icons.map((item)=>{

            return {
                title: '方向性图标',
                children: (
                    <div className="code-demo">
                        <ul>
                            {
                                item.list.map((icon) => {
                                    return <li><Icon type={icon} />{icon}</li>
                                })
                            }
                        </ul>
                    </div>
                )
            }
        })
        this.setState({childs})
    }

    render() {
        const {childs} = this.state;

        return <Layout {...this.props} 
            className="main-icon-box"
            title="图标"
            desc="汇总了常用的图标集合。"
            childs={childs}
        />
    }
}