import React from 'react';

import { Component, PropTypes, noop } from '@Libs';
import Checkbox from '@checkbox';


export default class Tbody extends Component{
    static defaultProps = {
        colgroup: []
    }
    getCellValue(row, column, index){
        const data = row[column.key || column.dataIndex];
        return column.render(data, column, index)
    }
    renderTd(data){
        let { selectedRows, toggleRowSelection } = this.props;
        selectedRows = selectedRows || []
        return this.props.columns.map((item, index) => {
            const { children, className, props } = this.getCellValue(data, item, index);
            const checked = selectedRows.includes(data);

            return (
                <td 
                    className={this.classNames(className, [
                        {
                            [item.align]: item.align
                        }
                    ])}
                    key={index}
                    {...props}
                >
                    <div className="cell" key={index}>
                        {!item.type && children}
                        {
                            item.type === 'rowSelection' && <Checkbox key={index} checked={checked} onChange={toggleRowSelection.bind(this, data)} />
                        }
                    </div>
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
        const colgroup = this.props.colgroup.length ? this.props.colgroup : this.props.columns;
        return (
            <table className="tv-table-body" cellPadding="0" cellSpacing="0" style={{borderSpacing: 0, border: 0, width: this.props.bodyWidth}}>
                <colgroup>
                    {
                        colgroup.map((item, index) => {
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
