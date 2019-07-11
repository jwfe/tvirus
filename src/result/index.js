import React from 'react';
import { Component, PropTypes } from '@Libs';

// requires and returns all modules that match
const requireAll = requireContext => requireContext.keys().map(requireContext);

// import all svg
const req = require.context('./svg', true, /\.svg$/);
requireAll(req);

export default class Icon extends Component {
    static propTypes = {
        /** 图标名，"badnetwork", "dev", "done", "loadfail", "nobuy", "nodata", "notbuy", "notfound", "notnotice", "taskfail"，默认为 notfound*/
        type: PropTypes.oneOf(["badnetwork", "dev", "done", "loadfail", "nobuy", "nodata", "notbuy", "notfound", "notnotice", "taskfail"]),
        /** 主标题 */
        title: PropTypes.string,
        /** 二级标题 */
        subtitle: PropTypes.string,
    };

    static defaultProps = {
        spin: false
    };

    constructor(props) {
        super(props);
    }

    render() {
        let { type, title, subtitle, children, className, ...otherProps } = this.props;

        return (
            <div 
            style={this.style()} 
            className={this.className('tv-result', `tv-result-${type}`)}>
                <div className="tv-result-image">
                    <i 
                    style={this.style()} 
                    className={this.className('tv-icon', `tv-icon-${type}`)}>
                        <svg
                            className="tv-icon-item"
                            aria-hidden="true"
                            {...otherProps}>
                            <use xlinkHref={`#icon-${type}`} />
                        </svg>
                    </i>
                </div>
                {title && <div className="tv-result-title">{title}</div>}
                {subtitle && <div className="tv-result-subtitle">{subtitle}</div>}
                {children && <div className="tv-result-children">{children}</div>}
            </div>
            
        );
    }
}