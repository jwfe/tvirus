import React from 'react';
import ReactDOM from 'react-dom';
import { Component, PropTypes, noop } from '@Libs';
import Icon from '@icon';

import TablePanel from './TablePanel';
import Row from './Row';
import Cell from './Cell';

export default class Table extends Component {
    constructor(props) {
        super(props);
        this.dom = {};
        const { columns, data } = this.props;
        this.state = {
            data: this.calculateWidth(columns, data),
            width: props.width,
            bodyHeight: '100%'
        }
    }

    static propTypes = {
        bordered: PropTypes.bool,
        columns: PropTypes.array,
        data: PropTypes.array,
        /** 自定义样式 */
        className: PropTypes.string,
        onChange: PropTypes.func,

    };
    static defaultProps = {
        bordered: false
    };

    getDomNodes(nodestring, dom){
        return (dom || this.dom.wrapper).querySelector(nodestring);
    } 
    onScrollX(){
        const scrollLeft = Math.max(this.dom.bodyXWrapper.scrollLeft, 0);
        this.dom.headerTablePanel.style.transform = 'translate(' + (-1 * scrollLeft) + 'px, 0) translateZ(0)';
    }
   
    getDom(){
        if (!this.dom.wrapper) {
            return;
        }
        this.dom.bodyTable = this.getDomNodes('.tv-table-body-wrapper .tv-table-body .tv-table-panel');
        this.dom.bodyXWrapper = this.getDomNodes('.tv-table-body-wrapper .tv-table-body');
        this.dom.bodyYWrapper = this.getDomNodes('.tv-table-body-wrapper');

        this.dom.bodyLeftFixed = this.getDomNodes('.tv-table-body-fixed-left', this.dom.bodyYWrapper);
        this.dom.bodyRightFixed = this.getDomNodes('.tv-table-body-fixed-right', this.dom.bodyYWrapper);
        

        this.dom.header = this.getDomNodes('.tv-table-header-wrapper');
        this.dom.headerLeftFixed = this.getDomNodes('.tv-table-header-fixed-left', this.dom.header);
        this.dom.headerLeftFixedPanel = this.getDomNodes('.tv-table-panel', this.dom.headerLeftFixed);

        this.dom.headerRightFixed = this.getDomNodes('.tv-table-header-fixed-right', this.dom.header);
        this.dom.headerRightFixedPanel = this.getDomNodes('.tv-table-panel', this.dom.headerRightFixed);

        this.dom.headerTable = this.getDomNodes('.tv-table-header', this.dom.header);
        this.dom.headerTablePanel = this.getDomNodes('.tv-table-panel', this.dom.headerTable);

        this.dom.bodyXWrapper.addEventListener('scroll', this.onScrollX.bind(this));
    }
    
    componentDidMount(){
        this.getDom();
        const {headerLeftFixed, headerRightFixed} = this.dom;
        if(headerLeftFixed || headerRightFixed){
            this.calculateHeaderHeight();
        }

        const wraperHeight = this.dom.wrapper.offsetHeight;
        const headHeight = this.dom.header.offsetHeight;
        const bodyHeight = this.dom.bodyTable.offsetHeight;
        this.setState({
            bodyHeight,
            bodyWraperHeight: wraperHeight - headHeight
        })
    }
    calculateHeaderHeight() {
        let {headerLeftFixed, headerRightFixed, headerTable} = this.dom;

        if(!headerLeftFixed){
            headerLeftFixed = headerRightFixed || headerTable;
        }

        if(!headerRightFixed){
            headerRightFixed = headerLeftFixed || headerTable;
        }

        let headerLeftRows = headerLeftFixed.querySelectorAll('.tv-table-row');
        let headerRightRows = headerRightFixed.querySelectorAll('.tv-table-row');
        let headerTableRows = headerTable.querySelectorAll('.tv-table-row');


        headerLeftRows.forEach((item, index) => {
            const leftRow = headerLeftRows[index];
            const rightRow = headerRightRows[index];
            const middleRow = headerTableRows[index];

            const leftHeight = leftRow.offsetHeight;
            const rightHeight = rightRow.offsetHeight;
            const middleHeight = middleRow.offsetHeight;

            const height = Math.max(leftHeight, rightHeight, middleHeight);
            if(!isNaN(height)) {
                leftRow.style.height = middleRow.style.height = rightRow.style.height = `${height}px`;
            };
        });

        // group
        const leftGroup = headerLeftFixed.querySelectorAll('.tv-table-row > .tv-table-cell-group-wraper > .tv-table-cell-group');
        const middleGroup = headerTable.querySelectorAll('.tv-table-row > .tv-table-cell-group-wraper > .tv-table-cell-group');
        const rightGroup = headerRightFixed.querySelectorAll('.tv-table-row > .tv-table-cell-group-wraper > .tv-table-cell-group');

        const leftMaxGroup = [];
        leftGroup.forEach((group) => {
            const height = group.offsetHeight;
            leftMaxGroup.push(height);
        });
        const leftGroupHeight = Math.max(...leftMaxGroup);
        leftGroup.forEach((group) => {
            group.style.height = `${leftGroupHeight}px`;
        });


        const middleMaxGroup = [];
        middleGroup.forEach((group) => {
            const height = group.offsetHeight;
            middleMaxGroup.push(height);
        });
        const middleGroupHeight = Math.max(...middleMaxGroup);
        middleGroup.forEach((group) => {
            group.style.height = `${middleGroupHeight}px`;
        });

        const rightMaxGroup = [];
        rightGroup.forEach((group) => {
            const height = group.offsetHeight;
            rightMaxGroup.push(height);
        });
        const rightGroupHeight = Math.max(...rightMaxGroup);
        rightGroup.forEach((group) => {
            group.style.height = `${rightGroupHeight}px`;
        });

    }

    getColumnsStyle(key, data){
        function getKey(item){
            return item.key || item.dataIndex;
        }
    
        if(Array.isArray(data)){
            for (var i = 0; i < data.length; i++) {
                const d = data[i];
                if(getKey(d) === key){
                    return {
                        width: d.width,
                        align: d.align
                    };
                }
                if(d.children){
                    let childrenData = this.getColumnsStyle(key, d.children);
                    if(childrenData){
                        return {
                            width: childrenData.width,
                            align: childrenData.align
                        }
                    }
                }
            };
        }
    
    }
    calculateWidth(columns, data, fixedType){
        const fixed = {};
        
        columns.forEach((col, index) => {
            const fixedKey = fixedType || col.fixed || 'middle';
            fixed[fixedKey] = fixed[fixedKey] || {};
            fixed[fixedKey].keys = fixed[fixedKey].keys || [];
            fixed[fixedKey].head = fixed[fixedKey].head || [];
            fixed[fixedKey].body = fixed[fixedKey].body || [];
            if(col.dataIndex || col.key){
                fixed[fixedKey].keys.push( col.key || col.dataIndex );
            }
            fixed[fixedKey].head.push(col);

            if(col.children){
                const childFixed = this.calculateWidth(col.children, data, fixedKey);
                fixed[fixedKey].keys = fixed[fixedKey].keys.concat(childFixed[fixedKey].keys);
            }
        });

        !fixedType && data.forEach((item) => {
            for(let key in fixed){
                const context = []
                const fixedItem = fixed[key];
                const keys = fixedItem.keys;
                if(keys){
                    const head = fixedItem.head;
                    keys.map((key2, index) => {
                        const value = item[key2] || '';
                        const headItem = head[index] || {};
                        const render = headItem.render;
                        const style = this.getColumnsStyle(key2, head);
                        context.push({
                            value: render ? render(value, item) : value,
                            ...style
                        });
                    })
                    context.length && fixed[key].body.push(context);
                }
                
            }
        })
        console.log('[TABLE]', 'calculateWidth', fixed)
        return fixed;
    }
    handleOnSort(columnsItem) {
        const { columns, data } = this.props;
        const sortdata = data.sort((a, b) => {
            const item = columnsItem.sort(a[columnsItem.key], b[columnsItem.key]);
            return !this.state.sortState ? item : (0-item);
        });

        const newdata = this.calculateWidth(columns, sortdata);

        this.setState({
            sortState: !this.state.sortState,
            data: newdata
        })
    }
    renderGroupCell(groupData, index){
        const groupNodes = [];

        if(groupData.title){
            const hasSort = groupData.sort;
            groupNodes.push(<Cell 
                    key={index}
                    onClick={this.handleOnSort.bind(this, groupData)}
                    style={{width: groupData.width, justifyContent: groupData.align}} 
                    className={hasSort ? 'has-sort' : ''} 
                    key={groupData.key}>
                <span className="tv-table-column-title">{groupData.title}</span>
                {groupData.sort && <span className="tv-table-column-sorter">
                    <Icon type="caret-up" className={this.state.sortState ? 'on' : 'off'} />
                    <Icon type="caret-down" className={!this.state.sortState ? 'on' : 'off'}  />
                </span>}
            </Cell>)
        }

        if(groupData.children){
            const array = groupData.children.map((child, index) => {
                return this.renderGroupCell(child, index);
            });
            groupNodes.push(<div key={index} className="tv-table-cell-group">{array}</div>);
        }

        return groupNodes.length === 1 ? groupNodes : <div key={index} className="tv-table-cell-group-wraper">{groupNodes}</div>
    }

    renderHead(data){
        return (
            <TablePanel>
                <Row>
                {
                        data.map((item, index) => {
                            return this.renderGroupCell(item, index)
                        })
                    }
                </Row>
            </TablePanel>
        )
    }

    renderLeftHead(data = {}){
        const isFixed = data.head && !!data.head.length;
        if(!isFixed){
            return null;
        }
    
        return (
            <div className={this.className('tv-table-header-fixed-left', 'tv-table-header-fixed', {
                'tv-table-hidden': isFixed
            })}>
                {
                    this.renderHead(data.head)
                }
            </div>
        )
    }

    renderRightHead(data = {}){
        const isFixed = data.head && !!data.head.length;
        if(!isFixed){
            return null;
        }
    
        return (
            <div className={this.className('tv-table-header-fixed-right', 'tv-table-header-fixed', {
                'tv-table-hidden': isFixed
            })}>
                {
                    this.renderHead(data.head)
                }
            </div>
        )
    }

    renderLeftBody(data = {}){
        const isFixed = data.head && !!data.head.length;
        if(!isFixed || !data.body.length){
            return null;
        }
    
        return (
            <div className={this.className('tv-table-body-fixed', 'tv-table-body-fixed-left')}>
                <TablePanel>
                    {
                        data.body.map((item, i) => {
                            return (
                                <Row key={i}>
                                    {
                                        item.map((item2, index2) => {
                                            return (<Cell key={index2} style={{ width: item2.width, justifyContent: item2.align }}>{item2.value}</Cell>)
                                        })
                                    }
                                </Row>
                            )
                        })
                    }
                </TablePanel>
            </div>
        )
    }

    renderRightBody(data = {}){
        const isFixed = data.head && !!data.head.length;
        if(!isFixed || !data.body.length){
            return null;
        }
    
        return (
            <div className={this.className('tv-table-body-fixed', 'tv-table-body-fixed-right')}>
                <TablePanel>
                    {
                        data.body.map((item, index) => {
                            return (
                                <Row key={index}>
                                    {
                                        item.map((item2, index2) => {
                                            return (<Cell key={index2} style={{ width: item2.width, justifyContent: item2.align }}>{item2.value}</Cell>)
                                        })
                                    }
                                </Row>
                            )
                        })
                    }
                </TablePanel>
            </div>
        )
    }

    render(){
        const { multiple, bordered} = this.props;
        const { bodyWraperHeight, bodyHeight, width, data } = this.state;
        const { left, right, middle } = data;

        const setWrapperElement = element => {
            if(element) this.dom.wrapper = element;
        }

        return (
            <div style={this.style({
                width
            })} className={this.className('tv-table', {
                'tv-table-border': bordered,
                'tv-table-multiple': multiple
            })} ref={setWrapperElement}>
                <div className='tv-table-x-scrollbar'><div></div></div>
                <div className='tv-table-y-scrollbar'><div></div></div>
                <div className="tv-table-header-wrapper">
                    { this.renderLeftHead(left) }
                    <div className={this.className('tv-table-header')}>
                        {
                            this.renderHead(middle.head)
                        }
                    </div>
                    { this.renderRightHead(right) }
                </div>

                <div className="tv-table-body-wrapper" style={{height: bodyWraperHeight}}>
                    { this.renderLeftBody(left) }
                    <div className={this.className('tv-table-body')} style={{height: bodyHeight}}>
                        <TablePanel>
                            {
                                middle.body.map((item, i) => {
                                    return (
                                        <Row key={i}>
                                            {
                                                item.map((item2, index2) => {
                                                    return (<Cell key={index2} style={{ width: item2.width, justifyContent: item2.align }}>{item2.value}</Cell>)
                                                })
                                            }
                                        </Row>
                                    )
                                })
                            }
                        </TablePanel>
                    </div>

                    { this.renderRightBody(right) }
                </div>
            </div>
        )
    }
}

