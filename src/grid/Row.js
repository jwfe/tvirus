import React from 'react';
import { Component, PropTypes } from '@Libs';
import { GridContext } from './GridContext';

export default class Row extends Component{
    static propTypes = {
        className: PropTypes.string,
        tag: PropTypes.string,
        gutter: PropTypes.number
    };

    static defaultProps = {
        tag: 'div',
        gutter: 0
    };
    render(){
        const { className, tag, children, gutter, ...others } = this.props;
        //todo: 看下需要插入什么样式
        return (
            <GridContext.Provider value={{
                gutter
            }}>
            {
                React.createElement(tag, {
                    className: this.className('tv-row', className),
                    style: this.style(),
                    ...others
                  }, children)
            }
            </GridContext.Provider>
        )
            
    }
}