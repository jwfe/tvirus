import React from 'react';
import { Component, PropTypes, noop } from '@Libs';
import Icon from '@icon';
import Popup from '@popup';
import Button from '@button';

const icons = {
    'loading': 'loading',
    'success': 'success', 
    'danger': 'close-circle', 
    'warning': 'info-circle'
}

export default class PopConfirm extends Component {
    static propTypes = {
        /** 自定义样式 */
        className: PropTypes.string,
        /** 标题 */
        title: PropTypes.string, 
        /** 按钮文字 */
        okText: PropTypes.string, 
        /** 取消按钮文字 */
        cancelText: PropTypes.string, 
        /** 确定按钮类型，请参考Button组件类型 */
        okType: PropTypes.string, 
        /** 取消按钮类型，请参考Button组件类型 */
        cancelType: PropTypes.string, 
        /** icon，请参考Icon组件 */
        icon: PropTypes.string, 
        /** 是否显示底部按钮，默认true */
        footer: PropTypes.bool,
        /** 确定的回调 */
        onOk: PropTypes.func,
        /** 取消后的回调 */
        onCancel: PropTypes.func
    };

    static defaultProps = {
        icon: 'warning',
        okText: '确定',
        cancelText: '取消',
        okType: 'primary',
        cancelType: "default",
        trigger: "click",
        position: "top",
        footer: true,
        onOk: noop,
        onCancel: noop
    };
    state = {
        visible: false,
    }
    constructor(props) {
        super(props);
    }

    handleOk = () => {
        this.onClose(this.props.onOk);
    }
    handleCancel = () => {
        this.onClose(this.props.onCancel);
    }
    onClose(callback){
        this.setState({
            visible: false
        }, () => {
            callback && callback();
        })
    }

    renderContent(){
        const { title, okText, cancelText, okType, cancelType, icon, footer } = this.props;
        return (
            <div className={this.className('tv-pop-message', {
                [`tv-pop-message-${icon}`]: icon
            })}>
                <div className="tv-pop-content">
                    <div className="tv-pop-confirm-body">
                        <Icon type={icons[icon]} />
                        <span className="tv-pop-confirm-title">{title}</span>
                    </div>
                    {footer && <div className="tv-pop-footer">
                        {cancelText && <Button size="small" type={cancelType} onClick={this.handleCancel}>{cancelText}</Button>}
                        {okText && <Button size="small" type={okType} onClick={this.handleOk}>{okText}</Button>}
                    </div>}
                </div>
            </div>
        )
    }

    handlePopupChange = (showPopup) => {
        const { disabled } = this.props;

        if(disabled){
            this.setState({visible: false});
            return;
        }

        if(disabled){
            showPopup = false
        }
        this.setState({visible: showPopup});
    }
    handleClick = () => {
        this.handlePopupChange(!this.state.visible)
    }
    render() {
        const { disabled, position, children, trigger } = this.props;
        const { visible } = this.state;
        const content = this.renderContent();

        return (
            <Popup 
                className={this.classNames(["tv-popconfirm-wraper"])}
                disabled={disabled}
                showMinWidth={true} 
                visible={visible} 
                trigger={trigger} 
                position={position} 
                content={content}
                onChange={this.handlePopupChange}
            >
                <div className="tv-popconfirm-trigger" onClick={this.handleClick}>
                    { children }
                </div>
            </Popup>
        );
    }
}