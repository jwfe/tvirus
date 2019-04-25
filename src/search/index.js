import React from 'react';
import { Component, PropTypes, Portal, noop } from '@Libs';
import Input from '@input';

export default class Search extends Component {
    static propTypes = {
        className: PropTypes.string,
        showDropdown: PropTypes.bool,
        data: PropTypes.object,
        onSearch: PropTypes.func,
        onClick: PropTypes.func,
    };

    static defaultProps = {
        showDropdown: false,
        onSearch: noop,
        onClick: noop
    };

    constructor(props) {
        super(props);
        this.state = {
            currentValue: '',
            values: []
        }
    }
    handleClick(key){
        const { onClick } = this.props;
        this.setState({
            values: [],
            currentValue: key
        }, ()=> {
            onClick(key);
        })
    }

    handleChange(evt){
        const { data, onSearch } = this.props;
        const { value } = evt.target;
        const values = data.filter((val) => {
            return val.indexOf(value) !== -1
        });

        this.setState({ values, currentValue: value }, ()=>{
            onSearch(values);
        })
    }

    render() {
        const { showDropdown } = this.props;
        const { values, currentValue } = this.state;
        let listNode = null;

        if(values.length){
            listNode = (
                <div className="tv-search-dropdown">
                    <ul>
                        {values.map((key) => {
                            return <li onClick={this.handleClick.bind(this, key)}>{key}</li>
                        })}
                    </ul>
                </div>
            )
        }

        return (
            <div className={this.className('tv-search')}>
                <Input
                    name={name}
                    type="text"
                    value={currentValue}
                    onChange={this.handleChange.bind(this)}
                />
                {showDropdown && listNode}
            </div>
        );
    }
}