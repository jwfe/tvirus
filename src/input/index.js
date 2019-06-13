import React from 'react';
import { Component, PropTypes, noop } from '@Libs';
import Icon from '@icon';

export default class Input extends Component {
    static propTypes = {
        /** 设置目前支持的节点类型，可选 'text', 'textarea', 'password', 'number', 'radio', 'checkbox' */
        type: PropTypes.oneOf(['text', 'textarea', 'password', 'number', 'radio', 'checkbox']),
        /** 带前缀icon的input */
        prefix: PropTypes.string,
        /** 带后缀icon的input */
        suffix: PropTypes.string,
        /** 自定义样式 */
        className: PropTypes.string,
        /** 是否自动填充 */
        autoComplete: PropTypes.oneOf(['on', 'off']),
        /** 默认显示 */
        placeholder: PropTypes.string,
        /** 设置input大小，可选'large', 'medium', 'small' */
        size: PropTypes.oneOf(['large', 'medium', 'small']),
        /** 设置默认值 */
        value: PropTypes.string,
        /** 内容变化时的回调 */
        onChange: PropTypes.func,
        /** 聚焦时的回调 */
        onFocus: PropTypes.func,
        /** 失焦时的回调 */
        onBlur: PropTypes.func,
        /** onKeyPress时的回调 */
        onPressEnter: PropTypes.func,
    };

    static defaultProps = {
        type: 'text',
        autoComplete: 'off',
        size: 'medium',
        onChange: noop,
        onFocus: noop,
        onBlur: noop,
    };

    constructor(props) {
        super(props);
        this.state = {
            textareaHeight: 0,
            passwdToggle: true
        }
    }
    handleChange(evt){
        const { onChange, name, type, multiple } = this.props;
        const { value, files } = evt.target;
        if(type === 'file'){
            let count = multiple ? files.length : 1;
            for (let i = 0; i < count; i++) {
                files[i].thumb = URL.createObjectURL(files[i])
            }
            const uploadfiles = Array.prototype.slice.call(files, 0);
            onChange(uploadfiles, name, evt);
            return;
        }
        onChange(value, name, evt);
    }
    handleFocus(evt){
        const { onFocus, name } = this.props;
        const { value } = evt.target
        onFocus(value, name, evt);
    }
    handleBlur(evt){
        const { onBlur, name } = this.props;
        const { value } = evt.target
        onBlur(value, name, evt);
    }
    handlePressEnter(evt){
        const { autosize, onPressEnter, name } = this.props;
        if(autosize){
            const { target } = evt;
            const height = target.scrollHeight;
            this.setState({
                textareaHeight: height
            })
        }

        const { value } = evt.target
        onPressEnter && onPressEnter(value, name, evt);
    }
    addPasswdVisible(){
        const { type, showToggle } = this.props;
        const { passwdToggle } = this.state;
        if(type === 'password' && showToggle){
            return (
                <span className="tv-input-suffix" onClick={() => {this.setState({
                    passwdToggle: !passwdToggle
                })}}>
                    <Icon type={passwdToggle ? 'eye-open' : 'eye-close'} />
                </span>
            )
        }
    }
    render() {
        let { 
            prefix, suffix, type, size, autoComplete, value, placeholder, name, onChange, onFocus, onBlur, 
            showToggle,
            ...otherProps } = this.props;
        const { textareaHeight } = this.state;
        const { passwdToggle } = this.state;

        if(type === 'password'){
            type = passwdToggle ? 'password' : 'text'
        }

        if(type === 'textarea'){
            return (
                <span className={this.className('tv-input-wraper')}>
                    <textarea 
                        style={this.style({
                            height: textareaHeight || 'auto'
                        })}
                        className={this.className('tv-input', {
                            [`tv-input-size-${size}`]: size,
                        })} 
                        onChange={this.handleChange.bind(this)}
                        onFocus={this.handleFocus.bind(this)}
                        onBlur={this.handleBlur.bind(this)}
                        onKeyPress={this.handlePressEnter.bind(this)}
                        {...otherProps}
                    >{value || ''}</textarea>
                </span>
            )
        }

        return (
            <span className={this.className('tv-input-wraper', {
                'tv-input-wraper-prefix': prefix
            })}>
                {prefix && <span className="tv-input-prefix"><Icon type={prefix} /></span>}
                {this.addPasswdVisible()}
                {
                    suffix && <span className="tv-input-suffix">
                        <Icon type={suffix} />
                    </span>
                }
                <input
                    className={this.className('tv-input', {
                        [`tv-input-size-${size}`]: size,
                        [`tv-input-${type}`]: type
                    })} 
                    name={name}
                    type={type}
                    value={value}
                    autoComplete={autoComplete}
                    placeholder={placeholder}
                    // onInput={this.handleChange.bind(this)}
                    onChange={this.handleChange.bind(this)}
                    onFocus={this.handleFocus.bind(this)}
                    onBlur={this.handleBlur.bind(this)}
                    onKeyPress={this.handlePressEnter.bind(this)}
                    {...otherProps}

                />
            </span>
        );
    }
}