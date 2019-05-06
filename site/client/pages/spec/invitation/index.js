import React, { Component } from 'react';
import Layout from '../../../common/design';

import './index.less'

export default class InvitationDemo extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return <Layout {...this.props} 
            className="main-invitation-box"
            title="提供邀请"
            desc="邀请就是引导用户进入下一个交互层次的提醒和暗示，通常包括意符（eg：实时的提示信息）和可供性，以表明在下一个界面可以做什么。当可供性中可感知的部分（Perceived Affordance）表现为意符时，人机交互的过程往往更加自然、顺畅。"
        >
            <blockquote>
                意符（Signifiers） ：一种额外的提示，告诉用户可以采取什么行为，以及应该怎么操作；必须是可感知（eg：视觉、听觉、触觉等）。<br />——摘自《设计心理学 1 》
            </blockquote>
            <blockquote>可供性（Affordance） ：也被翻译成『示能』，由 James J. Gibson 提出，定义为物品的特性与决定物品用途的主体能力之间的关系；其中部分可感知（此部分定义为 Perceived Affordance），部分不可感知。——摘自《设计心理学 1 》</blockquote>

            <h3>静态邀请</h3>
            <p>引导操作邀请：一般以静态说明形式出现在页面上，在视觉上也可以表现出多种不同样式。 常见类型：『文本邀请』『未完成邀请』。</p>
            <div className="invitation1"></div>

            <h3>动态邀请</h3>
            <p>操作引导：是向用户介绍新功能的好方法，尤其是对于那些设计优良的界面。但是它不是『创口贴』，仅通过它不能解决界面交互的真正问题。<cite>注：保持漫游过程简单，让用户容易退出和重新启动；保持内容简明扼要，与功能密切相关。</cite></p>
            <div className="invitation2"></div>
            <p>悬停邀请：在鼠标悬停期间提供邀请。</p>
            <div className="invitation3"></div>
            <p>推论邀请：用于交互期间，合理推断用户可能产生的需求。</p>
            <div className="invitation4"></div>
        </Layout>
    }
}
