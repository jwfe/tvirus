import React, { Component } from 'react';
import Layout from '../../../common/design';

import './index.less'

export default class DatainDemo extends Component{
    constructor(props){
        super(props);
    }
    render() {
        return <Layout {...this.props} 
            className="main-datain-box"
            title="数据录入"
            desc={
                <div>
                    数据录入应当注意这几点：<br />
                    1.当需要用户提供敏感信息时，通过『暗提示』来说明系统为什么要这么做，例如：需要获取身份证号码、手机号码时；<br />
                    2.让用户能在上下文中获取信息，帮助他完成输入。使用『良好的默认值』、『结构化的格式』、『暗提示』、『输入提醒』等方式，避免让用户在空白中猜测输入。
                </div>
            }
        >
            
            <h3>文本录入</h3>
            <p>输入框为用户提供了编辑文本的控件，是录入数据最基础和常见的方式。</p>
            <h4>文本框</h4>
            <p>输入较少的字符总数，使用单行的输入形式。<br /> <cite>注：可以对一些文本（如数字和网址）运用特别的样式。</cite></p>
            <div className="datain1"></div>

            <h4>文本域</h4>
            <p>录入长篇幅的单一的文本使用多行的文本区域。</p>
            <div className="datain2"></div>

            <h4>提示与录入</h4>
            <p>为提升数据录入效率，通常可以在输入框内增加暗提示以帮助提醒用户<br /><cite>注：输入框通常与标签（label）搭配使用，标签（label）默认放于输入区域的左侧，当文案过长或英文环境下放于下方。</cite></p>
            <div className="datain3"></div>

            <h4>搜索</h4>
            <p>搜索可以让用户在巨大的信息池中缩小目标范围，并快速获取需要的信息。</p>
            <div className="datain4"></div>

            <h3>选择录入</h3>
            <p>让用户在一个预定的范围中进行选择。</p>

            <h4>单选框</h4>
            <p>单选按钮允许用户从多个选项中选择一个选项。Radio 所有选项默认可见，方便用户在比较中选择，因此选项不宜过多。<br /><cite>注：单选框（Radio Button）一定多于 2 个，一般少于 5 个。</cite></p>
            <div className="datain5"></div>

            <h4>多选框</h4>
            <p>多选框用于在一组可选项中进行多项选择时。<br /><cite>注： 1. 复选框（Checkbox）一般用于状态标记，需要和提交操作配合； 2. 单个复选框可以表示两种状态之间的切换。</cite></p>
            <div className="datain6"></div>

            <h4>开关</h4>
            <p>用于切换单个选项的状态。『开关』的内联标签应该显示清楚，例如：禁用/启用，不允许/允许等。<br /><cite>注：当用户切换『开关』按钮将直接触发状态改变。</cite></p>
            <div className="datain7"></div>

            <h4>选择列表</h4>
            <p>选择列表（通常称为下拉菜单）允许用户从列表中选择一个选项或多个选项，为用户在选项的数量上提供了更多的灵活性。</p>
            <div className="datain8"></div>

            <h4>滑块选择</h4>
            <p>滑块选择可以在连续或间断的区间内，通过滑动锚点来选择一个合适的数值。<br /> <cite>注：在不要求精准数值的场景下用户使用『连续滑块』可得到更灵活便捷的操作；在用户需要精确数值时，可与『数字输入框』搭配使用。</cite></p>
            <div className="datain9"></div>

            <h3>文件上传</h3>
            <p>上传是将本地的相应信息(包含本地和云储存)通过网页或者上传工具发布到远程服务器上的过程。</p>

            <h4>点击上传</h4>
            <p>一般用于单个上传且不需要预览效果的文件上传，点击按钮弹出文件选择框。</p>
            <div className="datain10"></div>

            <h4>缩略图上传</h4>
            <p>一般用于图片文件上传，用户可以上传图片并在列表中显示缩略图。当上传照片数到达限制后，上传按钮消失。</p>
            <div className="datain11"></div>

            <h4>拖拽上传</h4>
            <p>把文件拖入指定区域，完成上传，同样支持点击上传。<br /><cite>注：文件上传需要提供明确的文件大小和文件格式，例如：请选择大小不超过 5M 的文本文件（支持 PDF.ZIP.EXL），上传时需要有明确的进度提示。</cite></p>
            <div className="datain12"></div>
        </Layout>
    }
}
