import React, { Component } from 'react';
import Layout from '../../../common/webcomponent';

import { Icon, Tabs, Tabpanel } from 'tvirus';
import './index.less'

export default class TabsDemo extends Component{
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
            title: '基本',
            children: (
                <div className="code-demo">
                    <Tabs activeKey={`选项卡1`}>
                        {
                            ['选项卡1', '选项卡2', '选项卡3'].map((item) => {
                                return (
                                    <Tabpanel key={item} tab={item} tabKey={item}>
                                        内容区：{item}
                                    </Tabpanel>
                                )
                            })
                        }
                    </Tabs>
                </div>
            )
        });


        childs.push({
            title: '禁用',
            children: (
                <div className="code-demo">
                    <Tabs activeKey={`选项卡1`}>
                        {
                            ['选项卡1', '选项卡2', '选项卡3'].map((item) => {
                                return (
                                    <Tabpanel key={item} disabled={item==='选项卡2'} tab={item} tabKey={item}>
                                        内容区：{item}
                                    </Tabpanel>
                                )
                            })
                        }
                    </Tabs>
                </div>
            )
        });

        childs.push({
            title: '带icon',
            children: (
                <div className="code-demo">
                    <Tabs activeKey={`选项卡1`}>
                        {
                            [{title: '选项卡1', icon: 'bell'}, {title: '选项卡2', icon: 'cloud'}, {title: '选项卡3', icon: 'fire'}].map((item) => {
                                const navItem = <span key={item.icon}><Icon type={item.icon} />{item.title}</span>;
                                return (
                                    <Tabpanel key={item.icon} tab={navItem} tabKey={item.title}>
                                        内容区：{item.title}
                                    </Tabpanel>
                                )
                            })
                        }
                    </Tabs>
                </div>
            )
        });

        const arr = [
            {
                key:'1',
                title:'本酒店预测有什么用？'
            },
            {
                key:'2',
                title:'如何使用“预测分析”提升收益'
            }
        ]

        childs.push({
            title: '特殊长度',
            children: (
                <div className="code-demo">
                    <Tabs activeKey={arr[0].key}>
                        {
                             arr.map((item) => {
                                return (
                                    <Tabpanel key={item.key} tab={item.title} tabKey={item.keygs}>
                                        内容区：{item.title}
                                    </Tabpanel>
                                )
                            })
                        }
                    </Tabs>
                </div>
            )
        });

        this.setState({childs})
    }

    render() {
        const {childs} = this.state;

        return <Layout {...this.props} 
            keyword="tabs"
            className="main-tabs-box"
            title="Tabs"
            desc="分隔内容上有关联但属于不同类别的数据集合。"
            childs={childs}
        />
    }
}
