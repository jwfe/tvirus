import React, { Component } from 'react';
import Layout from '../../../common/design';

import './index.less'

export default class AnimationDemo extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return <Layout {...this.props} 
            className="main-animation-box"
            title="微动效"
            desc={
                <div>
                    在中台产品设计中，使用动效和前台类产品有很大的不同，助力交互行为和信息认知的有效性会显得尤为重要，而界面动效能加强
                    用户认知且增加活力，<br />
                    1.增加体验舒适度： 让用户认知过程更为自然。<br />
                    2.增加界面活力： 第一时间吸引注意力，突出重点。<br />
                    3.描述层级关系： 体现元素之间的层级与空间关系。<br />
                    4.提供反馈、明确意向： 助力交互体验。<br />
                    <cite>注：做用户需要的动效，不要为了动效而动效。</cite>
                </div>
            }
        >
            
            <h3>标准</h3>
            <p>1.存在是否合理：是否带有明确的目的性，助力交互体验，没有多余的动效。<br />2.动效与性能：不能出现大幅度波动丢帧或者卡顿现象, 动效的体验须是流畅的，并且不影响产品的性能。</p>

            <h3>原则</h3>
            <p>为了适用不同尺寸的屏幕，在横向采用栅格布局来排布组件，从而保证布局的灵活性。</p>
            <div className="animation1"></div>
        </Layout>
    }
}
