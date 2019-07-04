import React from 'react';
import { Component, PropTypes, noop } from '@Libs';

import Icon from '@icon';
import Checkbox from '@checkbox';

export default class Thead extends Component{
    state = {
        sortState: {}
    }
    
    static defaultProps = {
        colgroup: [],
        onSort: noop
    }

    renderSort(cell){
        if(!cell.sort){
            return null;
        }
        const key = cell.key || cell.dataIndex;
        const sortState = this.props.sortState[key];
        let classMap = {}

        if(typeof sortState != 'undefined'){
            classMap = {
                down: sortState ? 'on' : 'off',
                up: !sortState ? 'on' : 'off'
            }
        }

        console.log('[sort]', sortState, cell.key, cell.dataIndex, classMap);

        return (
            <span className="tv-table-column-sorter" key={cell.columnKey}>
                <Icon type="caret-up" className={classMap.up} />
                <Icon type="caret-down" className={classMap.down}  />
            </span>
        )
    }
    renderHead(cell){
        const { selectedRows, toggleAllSelection, data } = this.props;
        if(cell.type === 'rowSelection'){
            const checked = (selectedRows || []).includes(data);
            return (
                <div className="cell" key={cell.columnKey}>
                    <Checkbox checked={checked} onChange={toggleAllSelection} />
                </div>
            )
        }

        return (
            <div className="cell" key={cell.columnKey}>
                {cell.title}
                {
                    this.renderSort(cell)
                }
            </div>
        )
    }
    render(){
        const colgroup = this.props.colgroup.length ? this.props.colgroup : this.props.columns;
        return (
            <table className="tv-table-header" cellPadding="0" cellSpacing="0" style={{borderSpacing: 0, border: 0, width: this.props.bodyWidth}}>
                <colgroup>
                    {
                        colgroup.map((item, index) => {
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
                                                    onClick={this.props.onHanleSort.bind(this, cell)}
                                                >
                                                    { this.renderHead(cell) }
                                                    
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
