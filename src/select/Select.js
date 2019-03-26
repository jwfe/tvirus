import React from 'react';
import { Component, PropTypes } from '@Libs';
import Tag from '@tag';
import Button from '@button';
import Search from '@search';
import Popup from '@popup';

export default class Select extends Component {
    static propTypes = {
        className: PropTypes.string,
        value: PropTypes.string,
        name: PropTypes.string,
        position: PropTypes.string,
        multiple: PropTypes.bool,
        placeholder: PropTypes.string,
        onChange: PropTypes.func,
    };

    static defaultProps = {
        multiple: false,
        placeholder: '请选择',
        position: "bottom left"
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
    }

    componentDidMount(){
        this.renderOptionsData();
    }

    handleOptionClick(value, title){
        let { selectedVals, selectedTitle } = this.state;
        const { multiple } = this.props;
        if(multiple){
            if(selectedVals.indexOf(value) === -1){
                selectedVals.push(value);
                selectedTitle.push(title);
            }
        } else {
            selectedVals = [value];
            selectedTitle = [title];
        }
        
        this.renderOptionsData(selectedVals);

        this.setState({
            visible: false,
            selectedVals,
            selectedTitle
        })
    }

    renderOptionsData(optionVals){
        const data = [];
        const { children } = this.props;
        let { selectedValue, searchVals } = this.state;
        if(!children){
            return null;
        }

        if(optionVals){
            selectedValue = optionVals;
        }

        const childrens = React.Children.map(children, (child) => {
            const value = child.props.value;
            if(!searchVals.length || searchVals.indexOf(value) !== -1){
                data.push(value);
                return React.cloneElement(child, {
                    onClick: this.handleOptionClick.bind(this),
                    selected: selectedValue ? selectedValue.indexOf(value) !== -1 : child.props.selected
                })
            }
            return false;
        });
        this.setState({
            childrens,
            data
        }) 
    }

    handleSearch(values){
        this.setState({
            searchVals: values
        }, () => {
            this.renderOptionsData();
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
        const { placeholder, disabled, multiple, position } = this.props;
        const { childrens, data, visible, selectedTitle } = this.state;

        if(!childrens){
            return null;
        }

        const renderOptions = (<div>
            <Search data={data} onSearch={this.handleSearch.bind(this)}>搜索</Search>
            <ul>
                {childrens}
            </ul>
        </div>)

        const isShowMultiple = selectedTitle && selectedTitle.length && multiple ? true : false

        return (
            <div className={this.className('tv-select', {
                'tv-select-disabled': disabled
            })}>

                <Popup 
                disabled={disabled}
                showArrow={false} 
                visible={visible} 
                trigger="click" 
                position={position} 
                content={renderOptions}
                onChange={this.handlePopupChange.bind(this)}
                >
                    <div className="tv-select-trigger">
                        {isShowMultiple && (
                            <div className="tv-tags">
                                {
                                    selectedTitle.map((title) => <Tag>{title}</Tag>)
                                }
                            </div>
                        )}
                        <Button style={{display: isShowMultiple ? 'none' : 'block'}}>{selectedTitle[0] || placeholder}</Button>
                    </div>
                </Popup>
            </div>
        );
    }
}