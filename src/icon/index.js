import React from 'react';
import { Component, PropTypes } from '@Libs';

// requires and returns all modules that match
const requireAll = requireContext => requireContext.keys().map(requireContext);

// import all svg
const req = require.context('./svg', true, /\.svg$/);
requireAll(req);

export default class Icon extends Component {
    static propTypes = {
        type: PropTypes.string.isRequired,
        spin: PropTypes.bool,
    };

    static defaultProps = {
        spin: false
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { type, spin, className, ...otherProps } = this.props;

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