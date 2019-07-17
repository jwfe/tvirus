import React, { Component } from 'react';
import Layout from '../../../common/webcomponent';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Icon, Message } from 'tvirus';
import './index.less'

const iconMaps = {
    '线框风格': [
        {
            title: '操作类',
            list: [
            'add',
            'less',

            'delete',
            'edit',
            'save',

            'caret-right',
            'caret-up',
            'caret-down',
            'caret-left',

            'right',
            'left',

            'folder',
            'help',
            'calendar',
            'logout',
            'credit-card',
            'guide_manual',

            'home',
            'paper-clip',

            'user',
            'team',

            'bars',
            'export',
            'form',
            'jpg',
            'phone',
            'share-alt',

            'eye-open',
            'eye-close',
            
            'cloud',
            'search',

            'file-search',
            'file-add',
            'file-text',
            
            'fullscreem-exit',
            'fullscreem',

            'swap',
            
            'loading',
            'refresh',
            
            'download',
            'filter',
            'printer',

            'menu-fold',
            'menu-unfold',

            'key',
            'lock',
            'unlock'
            ]
        },

        {
            title: '情感类',
            list: ["dislike", "like", "frown", "meh", "smile"]
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
            list: ["environment", "fire", "gift", "heart", "money", 'ai', 'robot', 'ai_model']
        }
    ],
    '实底风格': [
        {
            title: '导航图标',
            list: [  
            "bi", "module_management", "questionnaire", "opportunity", "price", "live_in", "overview", "quality_inspection", "review", "prediction", "personal_center", "user_group",
            'setup'
            ]
        },
        {
            title: '操作类',
            list: [
            'info_solid',
            'success_solid',
            'warn_solid',
            'question_solid',
            'error_solid'
            ]
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
                                            return <li key={icon}>
                                                <CopyToClipboard text={`<Icon type="${icon}" />`}
                                                onCopy={() => {
                                                    Message.info(`复制${icon}成功`)
                                                }}>
                                                <span><Icon key={icon} type={icon} />{icon}</span>
                                                </CopyToClipboard>
                                                
                                            </li>
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