import React from 'react';

import { Component, PropTypes, noop } from '@Libs';
import Loading from '@loading';

import Thead from './Thead';
import Tbody from './Tbody';
import Tfooter from './Tfooter';

let columnIDSeed = 1;
let tableIDSeed = 1;

export default class Table extends Component{
    static propTypes = {
        /** 是否展示外边框和列边框 */
        bordered: PropTypes.bool,
        /** 是否启用尾部内容 */
        footer: PropTypes.bool,
        /** 容器高度，默认auto */
        height: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ]),
        /** 表格列的配置描述, 设置配置minWidth时，该项会平分剩余宽度,自动适配页面宽度: 例：[{key: 'date', title: '日期', width: 150, fixed: 'left', sort: function(){//排序方法}, align: 'center'}] */
        columns: PropTypes.array,
        /** 数据源 */
        data: PropTypes.array,
        /** 自定义样式 */
        className: PropTypes.string,
        /** 求和项的第一列展示的内容，例：总计 */
        sumFirstText: PropTypes.string,
        /** 自定义求和的规则，默认只对数值求和 */
        onSum: PropTypes.func,
    };
    static defaultProps = {
        bordered: false,
        footer: false,
        height: 'auto'
    };

    state = {
        gutterWidth: 0,
        tableData: [],
        columns: [],
        columnRows: []
    }
    constructor(props){
        super(props);
        const { columns, data } = props;
        const columnData = this.updateColumns(columns);
        const tableData = this.filterData(data, columnData.columns);
        this.state = Object.assign(this.state, {fit: true, ...columnData}, {tableData: tableData});
    }
    componentDidMount(){
        this.caculateWidth(() => {
            this.getHeight();
        });
    }
    getHeight(){
        const { height } = this.props;
        const { headerWrapper, footerWrapper, bodyWrapper } = this;
        let heightClient = headerWrapper ? headerWrapper.getBoundingClientRect() : {height: 0};
        let footerClient = footerWrapper ? footerWrapper.getBoundingClientRect() : {height: 0};
        const bodyHeight = height - heightClient.height - footerClient.height;
        this.setState({
            bodyTop: heightClient.height,
            bodyHeight: height === 'auto' ? 'auto' : bodyHeight
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
    caculateWidth(callback) {
        const { columns, fixedColumns, rightFixedColumns, fit } = this.state;
        const { gutterWidth } = this.state;
        const bodyMinWidth = columns.reduce((pre, col) => pre + (col.width || col.minWidth), 0);
    
        let bodyWidth = this.table.clientWidth;
        let scrollX;
        let fixedWidth;
        let rightFixedWidth;
    
        const flexColumns = columns.filter(column => typeof column.width !== 'number');
        if (flexColumns.length && fit) {
          if (bodyMinWidth < bodyWidth - gutterWidth) {
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
        }, () => {
            callback && callback()
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
                render: column.render || function(data){
                    return {
                        children: data
                    }
                },
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
        const { headerWrapper, fixedBodyWrapper, rightFixedBodyWrapper, bodyWrapper, footerWrapper } = this;
        if (headerWrapper) {
            headerWrapper.scrollLeft = bodyWrapper.scrollLeft;
        }
        if (footerWrapper) {
            footerWrapper.scrollLeft = bodyWrapper.scrollLeft;
        }
        if (fixedBodyWrapper) {
            fixedBodyWrapper.scrollTop = bodyWrapper.scrollTop;
        }
        if (rightFixedBodyWrapper) {
            rightFixedBodyWrapper.scrollTop = bodyWrapper.scrollTop;
        }
    }
    onSort = (key, cell, sortState) => {
        const sortdata = this.state.tableData.sort((a, b) => {
            const item = cell.sort(a[key], b[key]);
            return !this.state.sortState ? item : (0-item);
        });
        this.setState({
            sortState,
            tableData: sortdata
        })
    }
    render(){
        const { footer, sumFirstText, height, bordered, loading, onSum } = this.props;
        const { fit, 
            tableData, columns, columnRows, fixedWidth, rightFixedWidth, bodyWidth, bodyHeight, bodyTop 
        } = this.state
        return (
            <div 
                className={this.className('tv-table', {
                    'tv-table-fit': fit,
                     'tv-table-border': bordered
                })} 
                style={{height: height, width: '100%'}}
                ref={(el) => this.table = el}
            >
                <div className="tv-table-header-wrapper" ref={(el) => this.headerWrapper = el}>
                    <Thead onSort={this.onSort} data={tableData} columns={columns} columnRows={columnRows} bodyWidth={bodyWidth} />
                </div>
                <div className="tv-table-body-wrapper" 
                    onScroll={this.onScroll}
                    style={{ height: bodyHeight}}
                    ref={(el) => {this.bodyWrapper = el}}
                >
                    <Tbody data={tableData} columns={columns} bodyWidth={bodyWidth} />
                </div>

                { 
                    footer && <div className="tv-table-footer-wrapper"
                        ref={(el) => this.footerWrapper = el}
                    >
                        <Tfooter firstText={sumFirstText} onSum={onSum} data={tableData} columns={columns} bodyWidth={bodyWidth} />
                    </div>
                }

                <div className="tv-table-fixed" style={{bottom: -1, width: fixedWidth}}>
                    <div className="tv-table-fixed-header-wrapper">
                        <Thead onSort={this.onSort} data={tableData} columns={columns} columnRows={columnRows} bodyWidth={bodyWidth} />
                    </div>
                    <div 
                        className="tv-table-fixed-body-wrapper" 
                        ref={(el) => {this.fixedBodyWrapper = el}}
                        style={{ top: bodyTop, height: bodyHeight}}
                    >
                        <Tbody data={tableData} columns={columns} bodyWidth={bodyWidth} />
                    </div>
                </div>
                <div className="tv-table-fixed-right" style={{bottom: -1, width: rightFixedWidth}}>
                    <div className="tv-table-fixed-header-wrapper">
                        <Thead onSort={this.onSort} data={tableData} columns={columns} columnRows={columnRows} bodyWidth={bodyWidth} />
                    </div>
                    <div 
                        className="tv-table-fixed-body-wrapper" 
                        ref={(el) => {this.rightFixedBodyWrapper = el}}
                        style={{ top: bodyTop, height: bodyHeight}}
                    >
                        <Tbody data={tableData} columns={columns} bodyWidth={bodyWidth} />
                    </div>
                </div>
                {loading && <Loading />}
            </div>
        )
    }
}