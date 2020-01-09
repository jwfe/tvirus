import React from 'react';
import { Component, PropTypes, noop } from '@Libs';

export default class Switch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: props.checked
        }
    }
    static propTypes = {
        /** 自定义样式 */
        className: PropTypes.string,
        /** 设置大小，可选 'large', 'medium', 'small' */
        size: PropTypes.oneOf(['large', 'medium', 'small']),
        /** 默认是否打开 */
        checked: PropTypes.bool,
        /** 变化后回调 */
        onChange: PropTypes.func,
        /** 选中颜色 */
        activeColor: PropTypes.string
    };
    static defaultProps = {
        size: 'medium'
    };

    handleClick(){
        const { onChange, name } = this.props;
        const { checked } = this.state;
        this.setState({checked: !checked});
        onChange && onChange(!checked, name);
    }

    render(){
        const { size, onText, offText } = this.props;
        const { checked } = this.state;
        return (
            <button 
            onClick={this.handleClick.bind(this)}
            type="button"
            style={{background: checked ? this.props.activeColor : ''}}
            className={this.className('tv-switch', {
                'tv-switch-checked': checked,
                [`tv-switch-${size}`]: size
            })}>
                <span className="tv-switch-inner">{checked ? onText : offText}</span>
            </button>
        )
    }
}
