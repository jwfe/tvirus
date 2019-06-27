import React from 'react';
import { Component, PropTypes, noop } from '@Libs';
/**
 * 可以通过该模块包裹其他模块，达到loading效果
 */
export default class Spin extends Component {
    static propTypes = {
        /** 可以自主更改样式 */
        className: PropTypes.string,
        /** 是否加载中状态 */
        loading: PropTypes.bool
    };

    static defaultProps = {
        loading: false
    };

    constructor(props) {
        super(props);
    }
    renderLoading(){
        const { loading } = this.props;
        
        if(!loading){
            return null;
        }

        return (
            <div className="tv-spin-loading">
                <span className={this.className('tv-loading')}>
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
            </div>
        )
    }
    render() {
        const { children, loading } = this.props;

        if(!children){
            return this.renderLoading()
        }

        return (
            <div className="tv-spin-box">
                {
                    this.renderLoading()
                }
                <div className={this.classNames(['tv-spin-children', {
                    'tv-spin-load': loading
                }])}>
                    {children}
                </div>
            </div>
        );
    }
}