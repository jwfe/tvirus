import React from 'react';
import { Component, PropTypes, Portal } from '@Libs';
import Input from '@input';
import Search from '@search';
import Popup from '@popup';

export default class Select extends Component {
    static propTypes = {
        className: PropTypes.string,
        value: PropTypes.string,
        name: PropTypes.string,
        popupContainer: PropTypes.element,
        onChange: PropTypes.func,
    };

    static defaultProps = {
        readonly: true
    };

    constructor(props) {
        super(props);
        this.renderOptions();
    }

    handleChange(evt){
        const checked = evt.target.checked;
        if(checked){
            const { onChange, value } = this.props;
            onChange && onChange(evt, value)
        }
        this.setState({stateChecked:checked})
    }

    handleBlur(){}
    handleFocus(){
        
    }

    renderOptions(searchVals){
        const data = [];
        const childrens = React.Children.filter(children, (child, i) => {
            const value = child.props.value;
            if(!searchVals || searchVals.indexOf(value) !== -1){
                data.push(value);
                return React.cloneElement(child)
            }
            return false;
        });
        this.setState({
            childrens,
            data
        }) 
    }

    handleSearch(values){
        this.renderOptions(values);
    }

    render() {
        const { popupContainer, disabled, name, readonly } = this.props;
        const { childrens, data } = this.state;
        return (
            <div className={this.className('tv-select', {
                'tv-select-disabled': disabled
            })}>
                <Input
                    name={name}
                    type="text"
                    disabled={disabled}
                    readonly={readonly}
                    onBlur={this.handleBlur.bind(this)}
                    onFocus={this.handleFocus.bind(this)}
                    onChange={this.handleChange.bind(this)}
                />
                
                <Portal container={popupContainer}>
                    <Search data={data} onSearch={this.handleSearch.bind(this)}>搜索</Search>
                    {childrens}
                </Portal>
            </div>
        );
    }
}