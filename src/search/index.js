import React from 'react';
import { Component, PropTypes, Portal } from '@Libs';
import Input from '@input';

export default class Search extends Component {
    static propTypes = {
        className: PropTypes.string,
        data: PropTypes.object,
        onSearch: PropTypes.func,
    };

    static defaultProps = {
    };

    constructor(props) {
        super(props);
    }

    handleChange(evt){
        const { data, onSearch } = this.props;
        const { value } = evt.target;
        const values = data.filter((val) => {
            return val.indexOf(value) !== -1
        });

        onSearch(values);
    }

    render() {
        return (
            <div className={this.className('tv-search')}>
                <Input
                    name={name}
                    type="text"
                    onChange={this.handleChange.bind(this)}
                />
            </div>
        );
    }
}