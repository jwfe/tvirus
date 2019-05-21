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
        className: PropTypes.string,
        size: PropTypes.oneOf(['large', 'medium', 'small']),
        checked: PropTypes.bool,
        onChange: PropTypes.func,
    };
    static defaultProps = {
    };

    handleClick(){
        const { onChange } = this.props;
        const { checked } = this.state;
        this.setState({checked: !checked});
        onChange && onChange(!checked);
    }

    render(){
        const { size, onText, offText } = this.props;
        const { checked } = this.state;
        return (
            <button 
            onClick={this.handleClick.bind(this)}
            type="button" 
            className={this.className('tv-switch', {
                'tv-switch-checked': checked,
                [`tv-switch-${size}`]: size
            })}>
                <span className="tv-switch-inner">{checked ? onText : offText}</span>
            </button>
        )
    }
}
