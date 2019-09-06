import React from 'react';
import { Component, PropTypes } from '@Libs';

export default class Progress extends Component {
    static propTypes = {
        /** 自定义样式 */
        className: PropTypes.string,
        /** 进度条可选项 'default', 'info', 'primary', 'success', 'danger', 'warning'，展示不同的颜色 */
        status: PropTypes.oneOf(['default', 'info', 'primary', 'success', 'danger', 'warning']),
        /** 类型，类型为color时，通过 value的length 来控制进度显示 */
        type: PropTypes.string,
        /** 进度条的当前进度，注：type为color时，通过value来控制每一个色卡的颜色。 */
        value: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.number
        ]),
        /** 是否要圆角 */
        circular:PropTypes.bool
    };
    
    static defaultProps = {
        status: 'success'
    }

    render(){
        const { type, status, value, circular } = this.props;
        if(type === 'color'){
            const percentage = 100/value.length;
            return (
                <div className="tv-progress">
                    {
                        value.map((item, index) => {
                            return <div key={index} className="tv-progress-inner" style={{width: `${percentage}%`, backgroundColor: item.color}}></div>
                        })
                    }
                </div>
            )
        }
        return (
            <div className="tv-progress">
                <div className={this.className("tv-progress-inner", {
                    [`tv-progress-inner-${status}`]: status
                })} style={{width: `${value}%`,'border-radius':`${circular?'0 3px 3px 0':'0'}`}}></div>
            </div>
        )
    }
}
