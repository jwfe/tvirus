import React, { Component } from 'react';
import Layout from '../../../common/webcomponent';

import { Icon } from 'tvirus';
import './index.less'

const iconMaps = {
    '线框风格': [
        {
            title: '操作类',
            list: [
            'add',
            'caret-right',
            'edit',
            'folder',
            'home',
            'loading',
            'paper-clip',
            'save',
            'user',
            
            'bars',
            'caret-up',
            'export',
            'form',
            'jpg',
            'lock',
            'phone',
            'share-alt',

            'eye-open',
            'eye-close',
            
            'calendar',
            'cloud',
            'search',
            'file-search',
            'fullscreem-exit',
            'key',
            'logout',
            'printer',
            'swap',
            
            'caret-down',
            'credit-card',
            'file-text',
            'fullscreem',
            'left',
            'menu-fold',
            'refresh',
            'team',
            
            'caret-left',
            'download',
            'filter',
            'help',
            'less',
            'menu-unfold',
            'right',
            'unlock',
            'unlock',
            'file-add',
            'ai_model',
            'guide_manual',
            'robot',
            ]
        },

        {
            title: '情感类',
            list: ["dislike", "frown", "like", "meh", "smile"]
        },

        {
            title: '提示类',
            list:  [
                "email", 
                "bell", 
                "close-circle", "exception", "exclamation-circl", "history", "info-circle", "question", "success", "warning"
            ]
        },
        {
            title: '图表类',
            list: ["bar-chart", "dot-chart", "line-chart", "pie-chart"]
        },
        {
            title: '装饰类',
            list: ["environment", "fire", "gift", "heart", "money", 'ai']
        }
    ],
    '实底风格': [
        {
            title: '面性图标',
            list: [
            'setup',    
            "bi", "module_management", "personal_center", "questionnaire", "opportunity", "price", "live_in", "overview", "quality_inspection", "review", "prediction", "user_group"]
        }
    ]
    
};


export default class IconDemo extends Component{
    constructor(props){
        super(props);
        this.state = {
            childs: []
        }
    }

    componentWillMount(){
        this.childs();
    }

    switch(type){
        const iconData = iconMaps[type];
        return (
            <div>
                {
                    iconData.map((data, index) => {
                        return (
                            <div className="icon-wrapper" key={index}>
                                <h3>{data.title}</h3>
                                <ul>
                                    {
                                        data.list.map((icon) => {
                                            return <li key={icon}><Icon key={icon} type={icon} />{icon}</li>
                                        })
                                    }
                                </ul>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    childs(){
        const childs = [];
        childs.push({
            title: '正常状态',
            children: ['线框风格', '实底风格'],
            func: this.switch.bind(this)
        });
        this.setState({childs})
    }

    render() {
        const {childs} = this.state;

        return <Layout {...this.props} 
            keyword="icon"
            className="main-icon-box"
            title="图标"
            desc="汇总了常用的图标集合。"
            childs={childs}
        />
    }
}