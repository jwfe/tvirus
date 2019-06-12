import React from 'react';
import { Component, PropTypes, noop } from '@Libs';

export default class Tfooter extends Component{
    state = {
        sortState: false
    }
    static defaultProps = {}
    getTotal(){
        const { onSum, firstText, columns, data } = this.props;
        return onSum ? onSum(columns, data) : columns.map((column, index) => {
            if(index === 0 && firstText){
                return firstText;
            }
            const result = data.reduce((pre, data) => {
                return pre + parseFloat(data[column.key]);
            }, 0);
            return isNaN(result) ? '' : result; 
        });
    }
    render(){
        const totals = this.getTotal();
        return (
            <table className="tv-table-footer" cellPadding="0" cellSpacing="0" style={{borderSpacing: 0, border: 0, width: this.props.bodyWidth}}>
                <colgroup>
                    {
                        this.props.columns.map((item, index) => {
                            return <col key={index} width={item.realWidth} style={{width: item.realWidth}}></col>
                        })
                    }
                    <col key="gutter" width={this.props.gutter || 0} style={{width: this.props.gutter || 0}}></col>
                </colgroup>
                <tbody>
                    {
                        <tr>
                        {
                            this.props.columns.map((cell, index) => {
                                return (
                                    <td 
                                        key={cell.columnKey}
                                        colSpan={cell.colSpan} 
                                        rowSpan={cell.rowSpan} 
                                        className={this.classNames([
                                            {
                                                [cell.headerAlign]: cell.headerAlign
                                            }
                                        ])}
                                    >
                                        <div className="cell" key={cell.columnKey}>
                                            {totals[index]}
                                        </div>
                                    </td>
                                )
                            })
                        }
                    </tr>
                    }
                </tbody>
            </table>   
        )
    }
}
