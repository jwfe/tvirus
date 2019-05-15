import React, { Component } from 'react';
import Layout from '../../../common/design';

import './index.less'

export default class DatavisDemo extends Component{
    constructor(props){
        super(props);
    }
    render() {
        return <Layout {...this.props} 
            className="main-datavis-box"
            title="数据显示"
            desc={
                <div>
                    合适的数据展示方式可以帮助用户快速地定位和浏览数据，以及更高效得协同工作。在设计时有以下几点需要注意：<br />
                    1.依据信息的重要等级、操作频率和关联程度来编排展示的顺序。<br />
                    2.注意极端情况下的引导，如数据信息过长，内容为空的初始化状态等。
                </div>
            }
        >
            
            <h3>表格</h3>
            <p>常和排序、搜索、筛选、分页等其他界面元素一起协同，适用于信息的收集和展示、数据的分析和归纳整理、以及操作结构化数据。<br /><cite>注： 1. 表格中的时间、状态、操作栏需保持词语完整不过行。 2. 当数据为空时，可使用『- -』来表示暂无数据。</cite></p>
            <div className="datavis1"></div>
            
            <h3>折叠面板</h3>
            <p>折叠面板通过对信息的分组和收纳，指引用户递进式的获取信息，使界面保持整洁的同时增加空间的有效利用率。</p>
            <div className="datavis2"></div>

            <h3>卡片</h3>
            <p>卡片是一种承载信息的容器，通常以网格或矩阵的方式排列，传达相互之间的层级关系。适合较为轻量级和个性化较强的信息区块展示。</p>
            <div className="datavis3"></div>

            <h3>树形控件</h3>
            <p>『树形控件』通过逐级大纲的形式来展现信息的层级关系，高效且具有极佳的视觉可视性，使得整体信息框架一目了然。用户可同时浏览与处理多个树状层级的内容。适用于任何需要通过层级组织的信息场景，如集团架构、国家地区等等。</p>
            <div className="datavis4"></div>
        </Layout>
    }
}
