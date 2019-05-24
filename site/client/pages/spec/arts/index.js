import React, { Component } from 'react';
import Layout from '../../../common/design';

import './index.less'

export default class ArtsDemo extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return <Layout {...this.props} 
            className="main-arts-box"
            title="人文体验"
            desc="当用户在使用一个产品时，如果他能很顺畅的进行操作获得想要的信息的时候，他是不会关注到交互和体验的，反而当他不能顺畅使用以及获取信息时，才会关注到产品的交互体验。"
        >
            <blockquote>
                “好的体验是满足甚至超出用户的期望，减少阻碍，“牵着用户的手”，让他感觉不到是在“使用”我们的产品——《腾讯网UED体验设计之旅》
            </blockquote>
            <p>设计不只是关乎好看，更关乎好用。产品体验的提升能够助力产品业绩的增长，让产品体验 可度 、可优化、可监控。</p>
            <blockquote>“If you cannot measure it, you cannot improve it.” Lord Kelvin</blockquote>
            <div className="values"></div>
            <h3>一致</h3>
            <ul>
                <li>1.好的体验是润物细无声的，产品的设计与现实生活的规律保持一致，设计者应该多分析用户行为，并运用到当下的设计工作中。</li>
                <li>2.整体页面的元素和机构保持一致</li>
            </ul>
            <h3>便捷</h3>
            <ul>
                <li>1.借助行为分析、人工智能、大数据等一系列方式，辅助用户有效决策、减少用户额外操作，从而节省用户脑力和体力，让人机交互行为更便捷。</li>
                <li>2.尽可能让操作流程简洁直观，界面清晰可读，直观的传递给用户信息，减少用户学习成本。</li>
            </ul>
            <h3>简约</h3>
            <ul>
                <li>1.保持克制： 用尽可能少的设计元素产品的当前功能，减少研发团队的成本，提高研发效率。正如 Antoine de St.Exupery 所说：完美不在于无以复加，而在于无可删减，万事莫不如此。</li>
                <li>2.复用规范模版： 运用现有的组件/模板或者自行抽象可复用的组件/模板，节约无谓的设计且保持系统一致性，把创造力专注在最需要的地方。</li>
                <li>3.保持核心功能：不断的向软件增加功能是不可持续的，增加的共功能越多，就越难发现真正对用户有价值的新功能，这样盲目添加的新功能早晚会成为垃圾功能，同时增加复杂性意味这遗留代码越来越沉重，导致产品维护成本越来越高，而且也越来越难以灵活应对市场变化——《简约至上》 Giles Colborne</li>
            </ul>
            <h3>情感</h3>
            <p>推荐《情感化设计》——Donald A.Norman</p>
            <p>情感化设计需要设计师能够有意识的去思考每一个设计带给用户的心里感受，以及能不能“暖”到用户。浅层次的锻炼可以从文案、视觉表现和场景出发，而更深层次的情感化则需要从产品的整体体验的角度出发，去思考产品能够带给用户的价值和感受。</p>
        </Layout>
    }
}
