import React from 'react';
import { Component, PropTypes, noop } from '@Libs';
import Tag from '@tag';
import Button from '@button';
import Search from '@search';
import Popup from '@popup';

export default class Select extends Component {
    static propTypes = {
        /** 自定义样式 */
        className: PropTypes.string,
        /** 自定义子节点样式 */
        childrenClassName: PropTypes.string,
        /** 设置select的值 */
        value: PropTypes.string,
        /** 展示下拉用到的事件 */
        trigger: PropTypes.string,
        /** select name */
        name: PropTypes.string,
        /** 设置自定义的可操作项 */
        autoButton: PropTypes.element,
        /** 下拉的位置, 参照popup */
        position: PropTypes.string,
        /** 是否启用模糊搜索 */
        showSearch: PropTypes.bool,
        /** 是否支持多选 */
        multiple: PropTypes.bool,
        /** 默认展示 */
        placeholder: PropTypes.string,
        /** 数据变化后的回调 */
        onChange: PropTypes.func,
    };

    static defaultProps = {
        showSearch: false,
        multiple: false,
        placeholder: '请选择',
        position: "bottom left",
        trigger: 'click',
        onChange: noop
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedVals: [],
            searchVals: [],
            selectedTitle: [],
            visible: false,
            childrens: null,
            data: []
        }

        React.Children.map(props.children, (child) => {
            const { selected, children, value } = child.props;
            if(selected){
                this.state.selectedTitle.push(children);
                this.state.selectedVals.push(value);
            }
            this.state.searchVals.push(value);
            this.state.data.push(value);
        });
    }

    componentDidMount(){
        this.renderOptionsData();
    }

    handleOptionClick(value, title){
        let { selectedVals, selectedTitle } = this.state;
        const { multiple, name } = this.props;
        if(multiple){
            const selectedIndex = selectedVals.indexOf(value);
            if( selectedIndex === -1){
                selectedVals.push(value);
                selectedTitle.push(title);
            } else {
                // 取消
                if(selectedVals.length === 1 || !selectedIndex){
                    selectedVals.splice(0);
                    selectedTitle.splice(0);
                } else if((selectedVals.length - 1) === selectedIndex){
                    selectedVals.pop();
                    selectedTitle.pop();
                } else {
                    selectedVals.splice(selectedIndex, selectedIndex);
                    selectedTitle.splice(selectedIndex, selectedIndex);
                }
            }
        } else {
            selectedVals = [value];
            selectedTitle = [title];
        }

        this.setState({
            visible: false,
            selectedVals,
            selectedTitle
        }, () => {
            this.renderOptionsData(selectedVals);
            this.props.onChange(selectedVals, name);
        })
    }

    renderOptionsData(optionVals){
        const { children } = this.props;
        let { selectedValue, searchVals } = this.state;
        if(!children){
            return null;
        }

        if(optionVals){
            selectedValue = optionVals;
        }

        const childrens = React.Children.map(children, (child, index) => {
            const value = child.props.value;
            if(searchVals.indexOf(value) !== -1){
                return React.cloneElement(child, {
                    autoCtrol: true,
                    key: index,
                    onClick: this.handleOptionClick.bind(this),
                    selected: selectedValue ? selectedValue.indexOf(value) !== -1 : child.props.selected
                })
            }
            return null;
        });
        this.setState({
            childrens
        }) 
    }

    handleSearch(values){
        this.setState({
            searchVals: values
        }, () => {
            this.renderOptionsData(values);
        }) 
    }

    handlePopupChange(showPopup){
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
    render() {
        const { placeholder, disabled, multiple, position, showSearch, extra, autoButton, childrenClassName, trigger } = this.props;
        const { childrens, data, visible, selectedTitle } = this.state;

        const isShowMultiple = selectedTitle && selectedTitle.length && multiple ? true : false;
        const isShowSearch = showSearch && !isShowMultiple;

        let childNode = (
            <span>
                { isShowSearch && <Search data={data} value={selectedTitle[0]} onSearch={this.handleSearch.bind(this)}>搜索</Search> }
                { !isShowSearch && <Button style={{display: isShowMultiple ? 'none' : 'block'}}>{selectedTitle[0] || placeholder}</Button> }
            </span>
        );

        if(autoButton){
            childNode = autoButton;
        }

        if(!childrens){
            return null;
        }

        const renderOptions = (
            <div>
                <ul>
                    {childrens}
                </ul>
                {extra && <div className="tv-select-extra">{extra}</div>}
            </div>
        )

        return (
            <div className={this.className('tv-select', {
                'tv-select-disabled': disabled
            })}>

                <Popup 
                    className={this.classNames(["tv-select-options-wraper", childrenClassName])}
                    disabled={disabled}
                    showArrow={false} 
                    showMinWidth={true} 
                    visible={visible} 
                    trigger={trigger} 
                    position={position} 
                    content={renderOptions}
                    onChange={this.handlePopupChange.bind(this)}
                >
                    <div className="tv-select-trigger">
                        {isShowMultiple && (
                            <div className="tv-tags">
                                {
                                    selectedTitle.map((title, index) => <Tag key={index}>{title}</Tag>)
                                }
                            </div>
                        )}
                        {childNode}
                    </div>
                </Popup>
            </div>
        );
    }
}