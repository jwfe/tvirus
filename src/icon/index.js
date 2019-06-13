import React from 'react';
import { Component, PropTypes } from '@Libs';

// requires and returns all modules that match
const requireAll = requireContext => requireContext.keys().map(requireContext);

// import all svg
const req = require.context('./svg', true, /\.svg$/);
requireAll(req);

export default class Icon extends Component {
    static propTypes = {
        /** icon名，可以参考上面的文档 */
        type: PropTypes.string.isRequired,
        /** 是否有旋转动画 */
        spin: PropTypes.bool,
    };

    static defaultProps = {
        spin: false
    };

    constructor(props) {
        super(props);
    }

    render() {
        let { type, spin, className, ...otherProps } = this.props;

        if(type === 'loading'){
            spin = true;
        }

        return (
            <i 
            style={this.style()} 
            className={this.className('tv-icon', `tv-icon-${type}`, {
                'tv-icon-spin': spin,
            })}>
                <svg
                    className="tv-icon-item"
                    aria-hidden="true"
                    {...otherProps}>
                    <use xlinkHref={`#icon-${type}`} />
                </svg>
            </i>
        );
    }
}