import React from 'react';
import {Component, PropTypes, noop} from '@Libs';
import Tag from '@tag';
import Icon from '@icon';
import Search from '@search';
import Popup from '@popup';

function getDiffArray(val, val2) {
    if (val.length !== val2.length) {
        return true;
    }

    const arr = [];
    val.forEach(item => {
        if (val2.indexOf(item) === -1) {
            arr.push(item);
        }
    });
    return arr.length;
}

function getInitValue(props) {
    const map = {selectedTitle: [], searchVals: [], data: []};
    React.Children.map(props.children, child => {
        const {children, value} = child.props;
        if (props.value.indexOf(value) !== -1) {
            map.selectedTitle.push(children);
        }
        map.searchVals.push(value);
        map.data.push(value);
    });
    return map;
}

export default class Select extends Component {
    static propTypes = {
        /** 自定义样式 */
        className: PropTypes.string,
        /** 自定义子节点样式 */
        childrenClassName: PropTypes.string,
        /** 设置select的值 */
        value: PropTypes.array,
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
        /**最小可选择的个数 */
        minLength: PropTypes.number
    };

    static defaultProps = {
        value: [],
        showSearch: false,
        multiple: false,
        placeholder: '请选择',
        position: 'bottom left',
        trigger: 'click',
        onChange: noop,
        minLength: 0
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedVals: props.value,
            visible: false,
            childrens: null,
            ...getInitValue(props)
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (getDiffArray(nextProps.value, prevState.selectedVals)) {
            return {
                childrens: null,
                selectedVals: nextProps.value,
                ...getInitValue(nextProps)
            };
        }
        return null;
    }

    handleOptionClick(value, title) {
        let {selectedVals, selectedTitle} = this.state;
        const {multiple, name} = this.props;

        console.log(selectedVals,'--------1111111')
        if (multiple) {
            const selectedIndex = selectedVals.indexOf(value);
            if (selectedIndex === -1) {
                selectedVals.push(value);
                selectedTitle.push(title);
            } else {
                // 取消
                if (selectedVals.length === 1 || !selectedIndex) {
                    selectedVals.shift(0);
                    selectedTitle.shift(0);
                } else if (selectedVals.length - 1 === selectedIndex) {
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

        this.setState(
            {
                visible: false,
                selectedVals,
                selectedTitle
            },
            () => {
                this.props.onChange(selectedVals, name);
            }
        );
    }

    renderOptionsData() {
        const { children } = this.props;
        const { selectedVals, searchVals } = this.state;
        let values = selectedVals;
        if (!children) {
            return null;
        }

        return React.Children.map(children, (child, index) => {
            const value = child.props.value;
            if (searchVals.indexOf(value) !== -1) {
                return React.cloneElement(child, {
                    autoCtrol: true,
                    key: index,
                    onClick: this.handleOptionClick.bind(this),
                    selected: values.indexOf(value) !== -1
                });
            }
            return null;
        });
    }

    handleSearch(values) {
        this.setState({
            searchVals: values
        });
    }

    onHandleTagChange = index => {
        let {selectedVals, selectedTitle, visible} = this.state;
        // 取消
        if (!index) {
            
            selectedVals.shift(0);
            selectedTitle.shift(0);
        } else if (selectedVals.length - 1 === index) {
            selectedVals.pop();
            selectedTitle.pop();
        } else {
            selectedVals.splice(index, index);
            selectedTitle.splice(index, index);
        }
        this.setState(
            {
                visible,
                selectedVals,
                selectedTitle
            },
            () => {
                this.props.onChange(selectedVals, name);
            }
        );
    }

    handlePopupChange = showPopup => {
        const {disabled, multiple} = this.props;

        if (disabled) {
            this.setState({visible: false});
            return;
        }

        if (multiple) {
            return;
        }

        if (disabled) {
            showPopup = false;
        }
        this.setState({visible: showPopup});
    }

    render() {
        const {
            placeholder,
            disabled,
            multiple,
            position,
            showSearch,
            extra,
            autoButton,
            childrenClassName,
            trigger
        } = this.props;
        const {data, visible, selectedTitle, selectedVals} = this.state;
        const childrens = this.renderOptionsData();
        const isShowMultiple =
            selectedTitle && selectedTitle.length && multiple ? true : false;
        const isShowSearch = showSearch && !isShowMultiple;

        let defaultContent = autoButton || (
            <div
                className={this.classNames([
                    'tv-select-label',
                    {
                        'tv-select-label-default': !isShowSearch,
                        'tv-select-placeholder': !selectedTitle[0]
                    }
                ])}
            >
                {isShowSearch && (
                    <Search
                        data={data}
                        value={selectedTitle[0]}
                        onSearch={this.handleSearch.bind(this)}
                    >
                        搜索
          </Search>
                )}
                {!isShowSearch && <span>{selectedTitle[0] || placeholder}</span>}
                {!isShowSearch && <Icon type='down' />}
            </div>
        );

        if (!childrens) {
            return null;
        }

        const renderOptions = (
            <div>
                <ul>{childrens}</ul>
                {extra && <div className='tv-select-extra'>{extra}</div>}
            </div>
        );

        if (isShowMultiple) {
            defaultContent = (
                <div
                    className={this.classNames([
                        'tv-select-tags',
                        {
                            'tv-select-placeholder': !selectedTitle.length
                        }
                    ])}
                >
                    {selectedTitle.length
                        ? selectedTitle.map((title, index) => (
                            <Tag
                                closable = {selectedVals.length == this.props.minLength?false:true}
                                onChange={this.onHandleTagChange}
                                key={index}
                            >
                                {title}
                            </Tag>
                        ))
                        : placeholder}
                </div>
            );
        }

        return (
            <div
                className={this.className('tv-select', {
                    'tv-select-focused': visible,
                    'tv-select-disabled': disabled
                })}
            >
                <Popup
                    className={this.classNames([
                        'tv-select-options-wraper',
                        childrenClassName
                    ])}
                    disabled={disabled}
                    showArrow={false}
                    showMinWidth={true}
                    visible={visible}
                    trigger={trigger}
                    position={position}
                    content={renderOptions}
                    onChange={this.handlePopupChange}
                >
                    <div className='tv-select-trigger'>{defaultContent}</div>
                </Popup>
            </div>
        );
    }
}
