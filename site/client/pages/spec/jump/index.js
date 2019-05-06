import React, { Component } from 'react';
import Layout from '../../../common/design';

import './index.less'

export default class JumpDemo extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return <Layout {...this.props} 
            className="main-jump-box"
            title="减少跳转"
            desc="能在这个页面解决的问题，就不要去其它页面解决，因为任何页面刷新和跳转都会引起变化盲视（Change Blindness），导致用户心流（Flow）被打断。频繁的页面刷新和跳转，就像在看戏时，演员说完一行台词就安排一次谢幕一样。"
        >
            <blockquote>
                变化盲视（Change Blindness） ：指视觉场景中的某些变化并未被观察者注意到的心理现象。产生这种现象的原因包括场景中的障碍物，眼球运动、地点的变化，或者是缺乏注意力等。——摘自《维基百科》
            </blockquote>
            <blockquote>
                心流（Flow） ：也有别名以化境 (Zone) 表示，亦有人翻译为神驰状态，定义是一种将个人精神力完全投注在某种活动上的感觉；心流产生时同时会有高度的兴奋及充实感。——摘自《维基百科》
            </blockquote>

            <h3>弹层</h3>
            <p>二次确认覆盖层：避免滥用 二次确认，应该勇敢的让用户去尝试，给用户机会『撤销』即可。</p>
            <strong>推荐示例</strong>
            <div className="jump1"></div>
            <strong>不推荐示例</strong>
            <div className="jump2"></div>
            <p>一般在列表中，通过用户『悬停』/『点击』某个区块，在当前页加载该条列表项的更多详情信息。<cite>注：使用『悬停』激活时，当鼠标移入时，需要设置 0.5 秒左右的延迟触发；当鼠标移出时，立刻关闭覆盖层</cite></p>
            <div className="jump3"></div>
            <strong>点击输入弹层</strong>
            <p>在覆盖层上，让用户直接进行少量字段的输入。</p>
            <div className="jump4"></div>

            <h3>嵌入层</h3>
            <p>列表嵌入层：在列表中，显示某条列表项的详情信息，保持上下文不中断。</p>
            <div className="jump5"></div>
            <p>标签页：将多个平级的信息进行整理和分类了，一次只显示一组信息。</p>
            <div className="jump6"></div>
        </Layout>
    }
}
