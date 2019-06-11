import React from 'react';

import { Component, PropTypes, noop } from '@Libs';

export default class Tbody extends Component{
    getCellValue(row, column){
        const data = row[column.key || column.dataIndex];
        return column.render(data, column)
    }
    renderTd(data){
        return this.props.columns.map((item, index) => {
            return (
                <td 
                className={this.classNames([
                    {
                        [item.align]: item.align
                    }
                ])}
                key={index}>
                    <div className="cell">{this.getCellValue(data, item)}</div>
                </td>
            )
        })
    }
    renderRow(){
        return this.props.data.map((row, index) => {
            return (
                <tr className="tv-table-row" key={index}>
                    {this.renderTd(row)}
                </tr>
            )
        })
    }
    render(){
        return (
            <table className="tv-table-body" cellPadding="0" cellSpacing="0" style={{borderSpacing: 0, border: 0, width: this.props.bodyWidth}}>
                <colgroup>
                    {
                        this.props.columns.map((item, index) => {
                            return <col key={index} width={item.realWidth} style={{width: item.realWidth}}></col>
                        })
                    }
                </colgroup>
                <tbody>
                    {this.renderRow()}
                </tbody>
            </table>
        )
    }
}
