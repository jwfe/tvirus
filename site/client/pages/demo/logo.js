import React, { Component } from 'react';
const requireAll = requireContext => requireContext.keys().map(requireContext);

// import all svg
const req = require.context('./img', true, /\.svg$/);
requireAll(req);

export default class BwLogo extends Component{
    render(){
        const { ...otherProps } = this.props;
        return (
            <i className="bwlogo">
                <svg
                    style={{
                        width: '1em',
                        height: '1em',
                        verticalAlign: '-.15em',
                        fill: 'currentColor',
                        fillRule: 'evenodd',
                        overflow: 'hidden'
                    }}
                    className="bwlogo-svg"
                    aria-hidden="true"
                {...otherProps}>
                    <use xlinkHref={`#icon-bwlogo`} />
                </svg>
            </i>
        )
    }
}