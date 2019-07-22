import React from 'react';
import { Component, PropTypes, noop } from '@Libs';

/**
 * 页面/模块loading
 */

export default class Loading extends Component {
    static propTypes = {
        className: PropTypes.string,
        /** 控制显隐 */
        show: PropTypes.bool
    };

    static defaultProps = {
        show: true
    };

    constructor(props) {
        super(props);
        this.state = {
            show: props.show
        };
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps.show !== this.props.show) {
            return true;
        }
        return false;
    }

    renderLoading = () => {
        const {show} = this.props;
        console.log(show);
        if (show) {
            return (<div className="tv-loading-wrapper">
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
