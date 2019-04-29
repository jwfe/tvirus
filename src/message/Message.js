import React from 'react';
import { Component, PropTypes, Animation } from '@Libs';
import Icon from '@icon';

const iconMaps = {
    info: 'info-circle',
    success: 'check-circle',
    danger: 'close-circle',
    warning: 'exclamation-circle',
}

export default class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        }
    }
    static propTypes = {
        className: PropTypes.string,
        contentType: PropTypes.oneOf(['info', 'success', 'danger', 'warning']),
    };
    static defaultProps = {
        contentType: 'info',
        duration: 2000
    };
    componentDidMount () {
        this.closeTimer = setTimeout(() => {
            this.close();
        }, this.props.duration - 300);
    }
    componentWillUnmount () {
        this.clearCloseTimer();
    }

    clearCloseTimer () {
        if (this.closeTimer) {
            clearTimeout(this.closeTimer);
            this.closeTimer = null;
        }
    }
    close () {
        this.clearCloseTimer();
        this.setState({shouldClose: true});
        this.timer = setTimeout(()=>{
            if(this.props.onClose){
                this.props.onClose();
            }
            clearTimeout(this.timer);
        }, 300);
    }

    render(){
        const { content, contentType } = this.props;
        const { visible } = this.state;
        const icon = iconMaps[contentType];
        return (
            <Animation duration={0.5} animatedIn="move-up-enter" animatedOut="move-up-leave" inProp={visible}>
                <div className={this.className('tv-message-notice', {
                    [`tv-message-${contentType}`]: contentType
                })}>
                    <div className="tv-message-notice-content">
                        <div className="tv-message-custom-content">
                            <Icon type={icon} />
                            <span>{content}</span>
                        </div>
                    </div>
                </div>
            </Animation>
        )
    }
}