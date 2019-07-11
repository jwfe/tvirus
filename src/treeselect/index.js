import React from 'react';
import { Component, PropTypes, noop } from '@Libs';

import Popup from '@popup';
import Tree from '@tree';
import Tag from '@tag';
import Icon from '@icon';

export default class TreeSelect extends Component{
    state = {
        visible: false,
        selected: []
    }
    static propTypes = {
        /** 自定义样式 */
        className: PropTypes.string,
        /** 展开的数据列表, [{key:'0', label:'0-label', children: [{key:'0-1', label:'1-label'}]}] */
        data: PropTypes.array,
        /** 显示搜索 */
        isShowSearch: PropTypes.bool,
        /** 展开的key列表 */
        expandedKeys: PropTypes.array,
        /** 禁用那些key的函数 */
        expandDisabled: PropTypes.func,
        /** 关闭以后的回调 */
        onChange: PropTypes.func,

    };
    static defaultProps = {
        isShowSearch: false,
        placeholder: '请选择',
        position: 'bottom left',
        trigger: 'click',
        onChange: noop
    };

    constructor(props){
        super(props);
    }

    onHandleTagChange(index){
        const { name } = this.props;
        let { selected, visible } = this.state;
        // 取消
        if(!index){
            selected.shift(0);
        } else if((selected.length - 1) === index){
            selected.pop();
        } else {
            selected.splice(index, index);
        }
        this.setState({
            visible,
            selected
        }, () => {
            this.props.onChange(selected, name);
        })
    }

    handlePopupChange = (showPopup) => {
        const { disabled, multiple } = this.props;

        if(disabled){
            this.setState({visible: false});
            return;
        }

        if(multiple){
            return;
        }

        if(disabled){
            showPopup = false
        }
        this.setState({visible: showPopup});
    }
    handleTree = (node, expanded) => {
        let { selected } = this.state;
        const { multiple, name } = this.props;
        if(multiple){
            let flag = false;
            selected = selected.filter((select) => {
                if(select.key === node.key){
                    flag = true;
                    return false;
                }
                return true
            });

            if(!flag){
                selected.push(node);
            }
        } else {
            selected = [node];
        }
        
        this.setState({
            visible: false,
            selected,
        }, () => {
            this.props.onChange(selected, name);
        })
    }
    renderBtn(){
        const { autoButton, placeholder, multiple } = this.props;
        const { selected } = this.state;

        const isShowMultiple = selected.length && multiple ? true : false;
        const label = selected[0] && selected[0].label;

        let defaultContent = autoButton || (
            <div className={this.classNames(['tv-select-label', {
                'tv-select-label-default': true,
                'tv-select-placeholder': !label
            }])}>
                <span>{ label || placeholder }</span> 
                <Icon type="down" /> 
            </div>
        );

        if(isShowMultiple){
            defaultContent = (
                <div className={this.classNames([
                    'tv-select-tags',
                    {
                        'tv-select-placeholder': !selected.length
                    }
                ])}>
                    {
                        selected.length ? 
                            selected.map((select, index) => <Tag closable onChange={this.onHandleTagChange.bind(this, index)} key={index}>{select.label}</Tag>)
                        : placeholder
                    }
                </div>
            )
        }
        return defaultContent;
    }
    renderPop(){
        const { data, multiple, isShowSearch } = this.props;
        return (
            <div className="tv-select-tree-dropdown">
                <Tree isShowSearch={isShowSearch} multiple={multiple} data={data} onChange={this.handleTree} />
            </div>
        )
    }
    render(){
        const { data, trigger, position, disabled, multiple } = this.props;
        const { visible } = this.state;

        return (
            <div className={this.className('tv-select', {
                'tv-select-focused': visible,
                'tv-select-disabled': disabled
            })}>

                <Popup 
                    className="tv-select-tree-popup"
                    disabled={disabled}
                    showArrow={false} 
                    showMinWidth={true} 
                    visible={visible} 
                    trigger={trigger} 
                    position={position} 
                    content={this.renderPop()}
                    onChange={this.handlePopupChange}
                >
                    <div className="tv-select-trigger">
                        {this.renderBtn()}
                    </div>
                </Popup>
            </div>
        );
    }
}


