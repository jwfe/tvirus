import React from 'react';

import { 
    Component, PropTypes, Portal, noop, Animation
} from 'tvirus';

export default class Thead extends Component{
    render(){
        return (
            <table className="el-table__header" cellPadding="0" cellSpacing="0" style={{borderSpacing: 0, border: 0, width: this.props.bodyWidth}}>
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
                                <tr key={index}>
                                    {
                                        row.map((cell, index2) => {
                                            return (
                                                <th 
                                                    key={index2}
                                                    colSpan={cell.colSpan} 
                                                    rowSpan={cell.rowSpan} 
                                                    className="is-center el-table_7_column_22 is-leaf"
                                                >
                                                    <div className="cell">{cell.title}</div>
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
