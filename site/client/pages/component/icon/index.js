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
                list: [ 'add',
                'bar-chart',
                'bars',
                'bell',
                'calendar',
                'caret-down',
                'caret-left',
                'caret-right',
                'caret-up',
                'check-circle',
                'close-circle',
                'close',
                'cloud',
                'credit-card',
                'delete',
                'dislike',
                'dot-chart',
                'download',
                'edit',
                'email',
                'environment',
                'exception',
                'exclamation-circl',
                'export',
                'file-search',
                'file-text',
                'filter',
                'fire',
                'folder',
                'form',
                'frown',
                'fullscreem-exit',
                'fullscreem',
                'gift',
                'heart',
                'help',
                'history',
                'home',
                'info-circle',
                'jpg',
                'key',
                'left',
                'less',
                'like',
                'line-chart',
                'loading',
                'lock',
                'logout',
                'meh',
                'menu-fold',
                'menu-unfold',
                'money',
                'paper-clip',
                'phone',
                'pie-chart-solid',
                'pie-chart',
                'printer',
                'question',
                'refresh',
                'right',
                'save',
                'search',
                'setting',
                'share-alt',
                'smile',
                'success-green',
                'success-solid',
                'swap',
                'team',
                'unlock',
                'user',
                'warning-yellow',
                'warning',
                'work',
                'wrong-red',
                'wrong-solid' ]
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