import React from 'react';
import { Link } from 'react-router-dom'

import { 
    Component, PropTypes, Portal, noop, Animation,
    Dialog,
    Icon,  Button,
    Input, Checkbox, Form
} from 'tvirus';

import Thead from './table/Thead';
import Tbody from './table/Tbody';


import './css/table.less';



let columnIDSeed = 1;
let tableIDSeed = 1;

class Table extends Component{
    state = {
        tableData: [],
        columns: [],
        columnRows: []
    }
    constructor(props){
        super(props);
        const { columns, data } = props;
        const columnData = this.updateColumns(columns);
        const tableData = this.filterData(data, columnData.columns);
        this.state = Object.assign(this.state, {...columnData}, {tableData: tableData});
    }
    componentDidMount(){
        this.caculateWidth();
        this.getHeight();
    }
    getHeight(){
        const { height } = this.props;
        const { headerWrapper, bodyWrapper } = this;
        const heightClient = headerWrapper.getBoundingClientRect();
        const bodyHeight = height - heightClient.height;
        this.setState({
            bodyTop: heightClient.height,
            bodyHeight
        })
    }
    convertToRows(columns){
        let maxLevel = 1;

        function traverse(column, parent) {
            if (parent) {
                column.level = parent.level + 1;
                if (maxLevel < column.level) {
                    maxLevel = column.level;
                }
            } else {
                column.level = 1;
            }

            if (column.children) {
                let colSpan = 0;
                column.children.forEach((subColumn) => {
                    traverse(subColumn, column);
                    colSpan += subColumn.colSpan;
                });
                column.colSpan = colSpan;
            } else {
                column.colSpan = 1;
            }
        }

        columns.forEach((column) => {
            traverse(column);
        });

        const rows = [];
        for (let i = 0; i < maxLevel; i++) {
            rows.push([]);
        }

        const allColumns = [];
        const queue = columns.slice();
        for (let i = 0; queue[i]; i++) {
            allColumns.push(queue[i]);
            if (queue[i].children) queue.push(...queue[i].children);
        }

        allColumns.forEach((column) => {
            if (!column.children) {
                column.rowSpan = maxLevel - column.level + 1;
            } else {
                column.rowSpan = 1;
            }
            rows[column.level - 1].push(column);
        });
        return rows;
    }
    caculateWidth() {
        const { columns, fixedColumns, rightFixedColumns, fit } = this.state;
        const { gutterWidth } = this.state;
        const bodyMinWidth = columns.reduce((pre, col) => pre + (col.width || col.minWidth), 0);
    
        let bodyWidth = this.table.clientWidth;
        let scrollX;
        let fixedWidth;
        let rightFixedWidth;
    
        // mutate props (TableStore's state[columns])
        const flexColumns = columns.filter(column => typeof column.width !== 'number');
        if (flexColumns.length && fit) {
          if (bodyMinWidth < bodyWidth - gutterWidth) { // no scroll bar
            scrollX = false;
    
            const totalFlexWidth = bodyWidth - gutterWidth - bodyMinWidth;
            if (flexColumns.length === 1) {
              flexColumns[0].realWidth = flexColumns[0].minWidth + totalFlexWidth;
            } else {
              const allColumnsWidth = flexColumns.reduce((pre, col) => pre + col.minWidth, 0);
              const flexWidthPerPixel = totalFlexWidth / allColumnsWidth;
    
              let widthWithoutFirst = 0;
    
              flexColumns.forEach((column, index) => {
                if (index === 0) return;
                const flexWidth = Math.floor(column.minWidth * flexWidthPerPixel);
                widthWithoutFirst += flexWidth;
                column.realWidth = column.minWidth + flexWidth;
              });
    
              flexColumns[0].realWidth = flexColumns[0].minWidth + totalFlexWidth - widthWithoutFirst;
            }
          } else { // have horizontal scroll bar
            scrollX = true;
            flexColumns.forEach((column) => {
              column.realWidth = column.minWidth;
            });
          }
    
          bodyWidth = Math.max(bodyMinWidth, bodyWidth);
        } else {
          scrollX = bodyMinWidth > bodyWidth;
          bodyWidth = bodyMinWidth;
        }
    
        if (fixedColumns.length) {
          fixedWidth = fixedColumns.reduce((pre, col) => pre + col.realWidth, 0);
        }
    
        if (rightFixedColumns.length) {
          rightFixedWidth = rightFixedColumns.reduce((pre, col) => pre + col.realWidth, 0);
        }
    
        this.setState({
            scrollX,
            bodyWidth,
            fixedWidth,
            rightFixedWidth
          });
    }
    filterData(data, columns) {
        return columns.reduce((preData, column) => {
            const { filterable, filterMultiple, filteredValue, filterMethod } = column;
            if (filterable) {
                if (filterMultiple && Array.isArray(filteredValue) && filteredValue.length) {
                    return preData.filter(_data => filteredValue.some(value => filterMethod(value, _data)))
                } else if (filteredValue) {
                    return preData.filter(_data => filterMethod(filteredValue, _data));
                }
            }
            return preData;
        }, data);
    }
    normalizeColumns(columns, tableIDSeed) {
        return columns.map((column) => {
            let _column;
            if (column.children) {
            // renderHeader
            _column = Object.assign({}, column);
            _column.children = this.normalizeColumns(column.children, tableIDSeed);
            } else {
            let { width, minWidth } = column;
        
            if (width !== undefined) {
                width = parseInt(width, 10);
                if (isNaN(width)) {
                width = null;
                }
            }
        
            if (minWidth !== undefined) {
                minWidth = parseInt(minWidth, 10);
                if (isNaN(minWidth)) {
                minWidth = 80;
                }
            } else {
                minWidth = 80;
            }
        
            const id = `tvTable${tableIDSeed}Column${columnIDSeed++}`;
        
            _column = Object.assign({
                id,
                sortable: false,
                resizable: true,
                showOverflowTooltip: false,
                align: 'left',
                filterMultiple: true
            }, column, {
                columnKey: column.columnKey || id,
                width,
                minWidth,
                realWidth: width || minWidth,
                property: column.prop || column.property,
                render: column.render,
                align: column.align ? 'is-' + column.align : null,
                headerAlign: column.headerAlign ? 'is-' + column.headerAlign : column.align ? 'is-' + column.align : null,
                filterable: column.filters && column.filterMethod,
                filterOpened: false,
                filteredValue: column.filteredValue || null,
                filterPlacement: column.filterPlacement || 'bottom',
            });
            }
        
            return _column;
        })
    }
    getLeafColumns(columns) {
        const result = [];
        columns.forEach((column) => {
            if (column.children) {
            result.push(...this.getLeafColumns(column.children));
            } else {
            result.push(column);
            }
        });
        return result;
    }
      
    updateColumns(columns) {
        let _columns = this.normalizeColumns(columns, tableIDSeed++);
    
        const fixedColumns = _columns.filter(column => column.fixed === true || column.fixed === 'left');
        const rightFixedColumns = _columns.filter(column => column.fixed === 'right');
    
        let selectable;
        if (_columns[0] && _columns[0].type === 'selection') {
            selectable = _columns[0].selectable;
            if (fixedColumns.length && !_columns[0].fixed) {
                _columns[0].fixed = true;
                fixedColumns.unshift(_columns[0]);
            }
        }
    
        _columns = [].concat(fixedColumns, _columns.filter(column => !column.fixed), rightFixedColumns);
    
        return Object.assign(this.state || {}, {
            fixedColumns,
            rightFixedColumns,
            columnRows: this.convertToRows(_columns),
            columns: this.getLeafColumns(_columns),
            isComplex: fixedColumns.length > 0 || rightFixedColumns.length > 0,
            selectable
        });
    }
    onScroll = () => {
        const { headerWrapper, fixedBodyWrapper, rightFixedBodyWrapper, bodyWrapper } = this;
        if (headerWrapper) {
            headerWrapper.scrollLeft = bodyWrapper.scrollLeft;
        }
        if (fixedBodyWrapper) {
            fixedBodyWrapper.scrollTop = bodyWrapper.scrollTop;
        }
        if (rightFixedBodyWrapper) {
            rightFixedBodyWrapper.scrollTop = bodyWrapper.scrollTop;
        }
    }
    render(){
        const { height } = this.props;
        const { tableData, columns, columnRows, fixedWidth, rightFixedWidth, bodyWidth, bodyHeight, bodyTop } = this.state
        console.log('render', tableData)
        return (
            <div 
                className="el-table el-table--fit el-table--border el-table--enable-row-transition" 
                style={{height: height, width: '100%'}}
                ref={(el) => this.table = el}
            >
                <div className="el-table__header-wrapper" ref={(el) => this.headerWrapper = el}>
                    <Thead data={tableData} columns={columns} columnRows={columnRows} bodyWidth={bodyWidth} />
                </div>
                <div className="el-table__body-wrapper" 
                    onScroll={this.onScroll}
                    style={{ height: bodyHeight}}
                    ref={(el) => {this.bodyWrapper = el}}
                >
                    <Tbody data={tableData} columns={columns} bodyWidth={bodyWidth} />
                </div>
                <div className="el-table__fixed" style={{bottom: -1, width: fixedWidth}}>
                    <div className="el-table__fixed-header-wrapper">
                        <Thead data={tableData} columns={columns} columnRows={columnRows} bodyWidth={bodyWidth} />
                    </div>
                    <div 
                        className="el-table__fixed-body-wrapper" 
                        ref={(el) => {this.fixedBodyWrapper = el}}
                        style={{ top: bodyTop, height: bodyHeight}}
                    >
                        <Tbody data={tableData} columns={columns} bodyWidth={bodyWidth} />
                    </div>
                </div>
                <div className="el-table__fixed-right" style={{bottom: -1, width: rightFixedWidth}}>
                    <div className="el-table__fixed-header-wrapper">
                        <Thead data={tableData} columns={columns} columnRows={columnRows} bodyWidth={bodyWidth} />
                    </div>
                    <div 
                        className="el-table__fixed-body-wrapper" 
                        ref={(el) => {this.rightFixedBodyWrapper = el}}
                        style={{ top: bodyTop, height: bodyHeight}}
                    >
                        <Tbody data={tableData} columns={columns} bodyWidth={bodyWidth} />
                    </div>
                </div>
            </div>
        )
    }
}

export default class DemoLogin extends Component{
    constructor(props) {
        super(props);

        const columns = [
            {
                width: 150,
                title: '日期', key: 'date', fixed: 'left', align: 'center', sort: (a, b)=>{
                    return Util.date.parse(a) - Util.date.parse(b);
                }
            },
            {title: '星期', width: 120, dataIndex: 'week', key: 'week', fixed: 'left', align: 'center'},
            {title: '预测', dataIndex: 'fc', key: 'fc', width: 200, align: 'center'},
            {title: '去年同星期', dataIndex: 'last_year', width: 200, align: 'center'},
            {title: '已有/实际', dataIndex: 'otb', key: 'otb', width: 200, align: 'center'},
            {
                title: 'vs 去年同星期实际', align: 'center',
                
                children: [
                    {
                        title: '差值',
                        dataIndex: 'dv', 
                        width: 200, align: 'center'
                    },
                    {
                        title: '差异率',
                        dataIndex: 'd_rate', 
                        width: 200, align: 'center'
                    }
                ]
            },
            {
                title: 'vs 已有/实际', align: 'center',
                children: [
                    {
                        title: '差值',
                        dataIndex: 'otb_dv', 
                        width: 200, align: 'center'
                    },
                    {
                        title: '差异率',
                        dataIndex: 'otb_d_rate', 
                        width: 200, align: 'center'
                    }
                ]
            },
            {
                title: 'vs 预算', 
                align: 'center',
                children: [
                    {
                        title: '差值',
                        dataIndex: 'budget_dv', 
                        width: 200, align: 'center'
                    },
                    {
                        title: '差异率',
                        dataIndex: 'budget_d_rate', 
                        width: 200, align: 'center'
                    }
                ]
            }
        ];
        
        const data = [];
        for (let i = 0; i < 31; i++) {
            const index = i + 1;
            const _date = `2019-05-${index > 9 ? i : ('0' + index)}`;
            data.push({
                date: _date,
                week: '星期1',
                fc: parseInt(Math.random() * 100),
                last_year: parseInt(Math.random() * 100),
                otb: '--',
                dv: parseInt(Math.random() * 100),
                d_rate: parseInt(Math.random() * 100),
                otb_dv: parseInt(Math.random() * 100),
                otb_d_rate: parseInt(Math.random() * 100),
                budget_dv: parseInt(Math.random() * 100),
                budget_d_rate: parseInt(Math.random() * 100)
            });
        }
        this.state = {
          columns,
          data
        }
      }
      
    render() {
        return (
            <div style={{width: 800}}>
                <Table
                    style={{width: '100%'}}
                    columns={this.state.columns}
                    data={this.state.data}
                    border={true}
                    height={250}
                />
            </div>
        )
    }
}