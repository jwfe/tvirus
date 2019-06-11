import React from 'react';

import { 
    Component, PropTypes, Portal, noop, Animation
} from 'tvirus';

export default class Tbody extends Component{
    getCellValue(row, column){
        return row[column.key || column.dataIndex]
    }
    renderTd(data){
        return this.props.columns.map((item, index) => {
            return (
                <td className="is-center is-hidden" key={index}>
                    <div className="cell">{this.getCellValue(data, item)}</div>
                </td>
            )
        })
    }
    renderRow(){
        return this.props.data.map((row, index) => {
            return (
                <tr className="tv-table2-row" key={index}>
                    {this.renderTd(row)}
                </tr>
            )
        })
    }
    render(){
        return (
            <table className="el-table__body" cellPadding="0" cellSpacing="0" style={{borderSpacing: 0, border: 0, width: this.props.bodyWidth}}>
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
