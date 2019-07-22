import React from 'react';
import {Component, PropTypes, noop} from '@Libs';

/**
 * 页面/模块loading
 */

export default class Loading extends Component {
    static propTypes = {
        className: PropTypes.string,
        /** 控制显隐 */
        show: PropTypes.bool,
        /** 个性化设置高度 */
        height: PropTypes.number
    };

    static defaultProps = {
        show: true,
        height: -1
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps.show !== this.props.show) {
            return true;
        }

        if (nextProps.height !== this.props.height) {
            return true;
        }

        return false;
    }

    renderLoading = () => {
        const {show, height} = this.props;
        if (show) {
            return (<div className="tv-loading-wrapper" style={height < 0 ? {height: 'auto'} : {height: height + 'px'}}>
                        <span className={this.className('tv-loading')}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </div>);
        }
        return null;
    }

    render() {
        return (
            <>
                {this.renderLoading()}
            </>
        );
    }
}
