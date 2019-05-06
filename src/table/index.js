import React from 'react';
import { Component, PropTypes, noop } from '@Libs';

import TablePanel from './TablePanel';
import Row from './Row';
import Cell from './Cell';



export default class Table extends Component {
    constructor(props) {
        super(props);
        this.dom = {};
        const { columns, data } = this.props;
        this.renderData = this.calculateWidth(columns, data);
    }

    static propTypes = {
        columns: PropTypes.array,
        data: PropTypes.array,
        className: PropTypes.string,
        onChange: PropTypes.func,

    };
    static defaultProps = {
        border: false
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
        this.dom.headerRightFixed = this.getDomNodes('.tv-table-header-fixed-right', this.dom.header);
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
    }

    calculateHeaderHeight() {
        const {headerLeftFixed, headerRightFixed, headerTable} = this.dom;
        const headerLeftRows = headerLeftFixed.querySelectorAll('.tv-table-row');
        const headerRightRows = headerRightFixed.querySelectorAll('.tv-table-row');
        const headerTableRows = headerTable.querySelectorAll('.tv-table-row');

        headerLeftRows.forEach((leftRow, index) => {
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

    calculateWidth(columns, data, fixedType){
        const fixed = {};
        
        columns.forEach((col, index) => {
            const fixedKey = fixedType || col.fixed || 'middle';
            fixed[fixedKey] = fixed[fixedKey] || {};
            fixed[fixedKey].keys = fixed[fixedKey].keys || [];
            fixed[fixedKey].head = fixed[fixedKey].head || [];
            fixed[fixedKey].body = fixed[fixedKey].body || [];
            if(col.dataIndex || col.key){
                fixed[fixedKey].keys.push(col.dataIndex || col.key);
            }
            fixed[fixedKey].head.push(col);

            if(col.children){
                const childFixed = this.calculateWidth(col.children, data, fixedKey);
                fixed[fixedKey].keys = fixed[fixedKey].keys.concat(childFixed[fixedKey].keys);
            }
        });

        function getWidth(key, data){
            if(Array.isArray(data) && (!data || !data.length)){
                return ''
            }
            
            if(Array.isArray(data)){
                let width;
                const length = data.length;
                for(let i=0; i<length; i++){
                    const item = data[i];
                    if(item.children){
                        width = getWidth(key, item.children);
                        if(width || i >= length) break;
                    }
                    if(key === item.key){
                        width = item.width;
                        break;
                    }
                }

                return width;
            }

            const _key = data['key'] || data['dataIndex'];
            if(data.width && _key === key){
                return data['width'];
            }

            return getWidth(key, data.children);
        }

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
                        const width = getWidth(key2, head);
                        context.push({
                            width,
                            value: render ? render(value, item) : value
                        });
                    })
                    context.length && fixed[key].body.push(context);
                }
                
            }
        })
        console.log('[TABLE]', 'calculateWidth', fixed)
        return fixed;
    }

    renderGroupCell(groupData){
        const groupNodes = [];

        if(groupData.title){
            groupNodes.push(<Cell style={{width: groupData.width}} key={groupData.key}>{groupData.title}</Cell>)
        }

        if(groupData.children){
            const array = groupData.children.map((child) => {
                return this.renderGroupCell(child);
            });
            groupNodes.push(<div className="tv-table-cell-group">{array}</div>);
        }

        return groupNodes.length === 1 ? groupNodes : <div className="tv-table-cell-group-wraper">{groupNodes}</div>
    }

    renderHead(data){
        return (
            <TablePanel>
                <Row>
                {
                        data.map((item, index) => {
                            return this.renderGroupCell(item)
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
                                <Row>
                                    {
                                        item.map((item2) => {
                                            return (<Cell style={{width: item2.width}}>{item2.value}</Cell>)
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
                        data.body.map((item) => {
                            return (
                                <Row>
                                    {
                                        item.map((item2) => {
                                            return (<Cell style={{width: item2.width}}>{item2.value}</Cell>)
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
        const { multiple, border } = this.props;
        const { left, right, middle } = this.renderData;

        const setWrapperElement = element => {
            if(element) this.dom.wrapper = element;
        }

        return (
            <div style={this.style()} className={this.className('tv-table', {
                'tv-table-border': border,
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

                <div className="tv-table-body-wrapper">
                    { this.renderLeftBody(left) }
                    <div className={this.className('tv-table-body')}>
                        <TablePanel>
                            {
                                middle.body.map((item, i) => {
                                    return (
                                        <Row>
                                            {
                                                item.map((item2) => {
                                                    return (<Cell style={{width: item2.width}}>{item2.value}</Cell>)
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

