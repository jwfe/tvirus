import React from 'react';
import { Component, PropTypes, noop } from '@Libs';

import Icon from '@icon';

export default class Thead extends Component{
    state = {
        sortState: false
    }
    static defaultProps = {
        onSort: noop
    }
    onHanleSort(cell) {
        if(!cell.sort){
            return null;
        }
        const { onSort } = this.props;

        this.setState({ sortState: !this.state.sortState }, () => {
            onSort(cell.key, cell, this.state.sortState)
        })
    }
    renderSort(cell){
        if(!cell.sort){
            return null;
        }
        return (
            <span className="tv-table-column-sorter" key={cell.columnKey}>
                <Icon type="caret-up" className={this.state.sortState ? 'on' : 'off'} />
                <Icon type="caret-down" className={!this.state.sortState ? 'on' : 'off'}  />
            </span>
        )
    }
    render(){
        return (
            <table className="tv-table-header" cellPadding="0" cellSpacing="0" style={{borderSpacing: 0, border: 0, width: this.props.bodyWidth}}>
                <colgroup>
                    {
                        this.props.columns.map((item, index) => {
                            return <col key={index} width={item.realWidth} style={{width: item.realWidth}}></col>
                        })
                    }
                    <col key="gutter" width={this.props.gutter || 0} style={{width: this.props.gutter || 0}}></col>
                </colgroup>
                <thead>
                    {
                        this.props.columnRows.map((row, index) => {
                            return (
                                <tr key={`${row[0].columnKey}_${index}`}>
                                    {
                                        row.map((cell) => {
                                            return (
                                                <th 
                                                    key={cell.columnKey}
                                                    colSpan={cell.colSpan} 
                                                    rowSpan={cell.rowSpan} 
                                                    className={this.classNames([
                                                        {
                                                            'has-sort': cell.sort,
                                                            [cell.headerAlign]: cell.headerAlign
                                                        }
                                                    ])}
                                                    onClick={this.onHanleSort.bind(this, cell)}
                                                >
                                                    <div className="cell" key={cell.columnKey}>
                                                        {cell.title}
                                                        {
                                                            this.renderSort(cell)
                                                        }
                                                    </div>
                                                </th>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </thead>
            </table>   
        )
    }
}
