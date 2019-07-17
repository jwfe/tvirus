import React from 'react';
import { Component, PropTypes, Portal, noop, Animation } from '@Libs';
import Button from '@button';
import Icon from '@icon';

export default class Dialog extends Component {
    static propTypes = {
        /** 设置蒙层是否显示 */
        mask: PropTypes.bool,
        /** 自主控制显示隐藏，不受组件内部干扰。 */
        visible: PropTypes.bool,
        /** 设置宽度 */
        width: PropTypes.number,
        /** 设置标题 */
        title: PropTypes.string,

        /** 自定义样式 */
        className: PropTypes.string,
        /** 设置是否为组件内部特殊定制的组件，目前支持alert */
        type: PropTypes.oneOf(['alert']),
        /** 设置内容的类型，不同类型显示不一致。可选 'info', 'success', 'danger', 'warning'，可不设。不设为info */
        contentType: PropTypes.oneOf(['info', 'success', 'danger', 'warning']),
        /** 设置style */
        style: PropTypes.object,
        /** 设置是否限制x按钮 */
        close: PropTypes.bool, 
        /** 设置是否限制确认按钮 */
        ok: PropTypes.bool, 
        /** 设置是否限制取消按钮 */
        cancel: PropTypes.bool,
        /** 接管onClose方法 */
        onClose: PropTypes.func,
        /** 接管取消方法 */
        onCancel: PropTypes.func,
        /** 接管点击确定按钮的方法 */
        onOk: PropTypes.func
    };

    static defaultProps = {
        mask: true,
        close: true, cancel: true,
        ok: true, cancel: true,
        contentType: 'info',
        width: 520,
        okText: '确定',
        cancelText: '取消',
        onClose: noop,
        onOk: noop,
        onCancel: noop,
    };

    constructor(props) {
        super(props);
        this.state = {
            visible: props.visible
        }
    }
    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.visible !== prevState.visible){
            return {
                visible: nextProps.visible
            };
        }
        return null;
    }

    handleClose = () => {
        const { onClose } = this.props;
        this.setState({
            visible: false
        }, () => {
            onClose();
        })
    }
    handleOk = () => {
        const { onOk } = this.props;
        this.setState({
            visible: false
        }, () => {
            onOk();
        })
    }
    handleCancel = () => {
        const { onCancel } = this.props;
        this.handleClose();
        onCancel();
    }

    renderModal(){
        const { title, footer, children, close, ok, cancel, okText, cancelText, width } = this.props;
        return (
            <div className={this.className('tv-dialog')}>
                <div className="tv-dialog-content" style={this.style({
                    width
                })}>
                    {close && <Button className="tv-dialog-close" icon="add" onClick={this.handleClose} />}
                    {title && <div className="tv-dialog-header"><div className="tv-dialog-title">{title}</div></div>}
                    <div className="tv-dialog-body">
                        {children}
                    </div>
                    {footer && <div className="tv-dialog-footer">
                        {cancel && <Button onClick={this.handleCancel}>{cancelText}</Button>}
                        {ok && <Button type="primary" onClick={this.handleOk}>{okText}</Button>}
                    </div>}
                </div>
            </div>
        )
    }

    renderAlertModal(){
        const { title, footer, children, ok, cancel, okText, cancelText, icon, contentType, width } = this.props;
        return (
            <div className={this.className('tv-dialog', {
                'tv-dialog-confirm': true,
                [`tv-dialog-confirm-${contentType}`]: contentType
            })}>
                <div className="tv-dialog-content" style={this.style({
                    width
                })}>
                    <div className="tv-dialog-confirm-body">
                        <Icon type={icon} />
                        <span className="tv-dialog-confirm-title">{title}</span>
                        <div className="tv-dialog-confirm-content">
                            {children}
                        </div>
                    </div>
                    {footer && <div className="tv-dialog-footer">
                        {cancel && <Button onClick={this.handleCancel.bind(this)}>{cancelText}</Button>}
                        {ok && <Button type="primary" onClick={this.handleOk.bind(this)}>{okText}</Button>}
                    </div>}
                </div>
            </div>
        )
    }

    renderItem(){
        const { type } = this.props;
        if(!type){
            return this.renderModal();
        }
        if(type === 'alert'){
            return this.renderAlertModal();
        }
        return null;
    }

    render(){
        const { mask } = this.props;
        const { visible } = this.state;
        return (
            <Portal>
                {
                    mask && <div className={this.className('tv-dialog-mask', {
                        'tv-dialog-mask-hidden': !visible
                    })}></div>
                }
                <Animation duration={0.5} animatedIn="fadeInDown" animatedOut="fadeOutUp" inProp={visible}>
                    { this.renderItem() }
                </Animation>
            </Portal>
        )
    }
    
}