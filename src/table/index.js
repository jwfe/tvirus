import React from 'react';
import { Component, PropTypes, noop } from '../../libs';

import TablePanel from './TablePanel';
import Row from './Row';
import Cell from './Cell';



export default class Table extends Component {
    constructor(props) {
        super(props);
        this.dom = {};
        const { columns, data } = this.props;
        this.renderData = this.dataGroup(columns, data);
    }

    static propTypes = {
        columns: PropTypes.array,
        data: PropTypes.array,
        className: PropTypes.string,
        onChange: PropTypes.func,

    };
    static defaultProps = {
    };

    getDomNodes(nodestring, dom){
        return (dom || this.dom.wrapper).querySelector(nodestring);
    } 
    onScrollX(){
        console.log(this.dom.bodyXWrapper)
        const scrollLeft = Math.max(this.dom.bodyXWrapper.scrollLeft, 0);
        this.dom.headerTable.style.transform = 'translate(' + (-1 * scrollLeft) + 'px, 0) translateZ(0)';
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
        

        this.dom.header = this.getDomNodes('.tv-table-header');
        this.dom.headerLeftFixed = this.getDomNodes('.tv-table-header-fixed-left', this.dom.header);
        this.dom.headerRightFixed = this.getDomNodes('.tv-table-header-fixed-right', this.dom.header);
        this.dom.headerTable = this.getDomNodes('.tv-table-panel', this.dom.header);
    }
    
    componentDidMount(){
        this.getDom();
    }

    dataGroup(columns, data, fixedType){
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
                const childFixed = this.dataGroup(col.children, data, fixedKey);
                fixed[fixedKey].keys = fixed[fixedKey].keys.concat(childFixed[fixedKey].keys);
            }
        })

        !fixedType && data.forEach((item) => {
            for(let key in fixed){
                const context = []
                const fixedItem = fixed[key];
                const keys = fixedItem.keys;
                const head = fixedItem.head;
                keys.map((key2, index) => {
                    const value = item[key2] || '';
                    const headItem = head[index] || {};
                    const render = headItem.render;
                    context.push({
                        width: headItem.width,
                        value: render ? render(value, item) : value
                    });
                })
                context.length && fixed[key].body.push(context);
            }
        })

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

    render(){
        const { left, right, middle } = this.renderData;
        const isLeftFixed = !!left.head.length;
        const isRightFixed = !!right.head.length;

        const setWrapperElement = element => {
            if(element) this.dom.wrapper = element;
        }

        console.log(this.renderHead(left.head), this.renderHead(middle.head), this.renderHead(right.head))
        return (
            <div style={this.style()} className={this.className('tv-table')} ref={setWrapperElement}>
                <div className='tv-table-x-scrollbar'><div></div></div>
                <div className='tv-table-y-scrollbar'><div></div></div>
                <div className="tv-table-header-wrapper">
                    <div className={this.className('tv-table-header-fixed-left', 'tv-table-header-fixed', {
                        'tv-table-hidden': isLeftFixed
                    })}>
                        {
                            this.renderHead(left.head)
                        }
                    </div>
                    <div className={this.className('tv-table-header')}>
                        {
                            this.renderHead(middle.head)
                        }
                    </div>
                    <div className={this.className('tv-table-header-fixed-right', 'tv-table-header-fixed', {
                        'tv-table-hidden': isRightFixed
                    })}>
                        {
                            this.renderHead(right.head)
                        }
                    </div>
                </div>

                <div className="tv-table-body-wrapper">
                    <div className={this.className('tv-table-body-fixed', 'tv-table-body-fixed-left')}>
                        {left.body.length && <TablePanel>
                            {
                                left.body.map((item, i) => {
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
                        </TablePanel>}
                    </div>
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

                    <div className={this.className('tv-table-body-fixed', 'tv-table-body-fixed-right')}>
                        {right.body.length && <TablePanel>
                            {
                                right.body.map((item) => {
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
                        </TablePanel>}
                    </div>
                </div>
            </div>
        )
    }
}

