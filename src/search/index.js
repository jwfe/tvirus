import React from 'react';
import { Component, PropTypes, Portal, noop } from '@Libs';
import Input from '@input';

export default class Search extends Component {
    static propTypes = {
        /** 自定义样式 */
        className: PropTypes.string,
        /** 设置是否显示下拉，可以通过该项定制自定义的下拉 */
        showDropdown: PropTypes.bool,
        /** 全量的数据源 */
        data: PropTypes.array,
        /** 检索完成的回调 */
        onSearch: PropTypes.func,
        /** 点击下拉的回调 */
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
            currentValue: undefined,
            values: []
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.value !== prevState.currentValue && nextProps.value !== prevState.prevValue){
            return {
                prevValue: nextProps.value,
                currentValue: nextProps.value
            }
        }
        return null;
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

    handleChange(value, name){
        const { data, onSearch } = this.props;
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
                        {values.map((key, index) => {
                            return <li key={index} onClick={this.handleClick.bind(this, key)}>{key}</li>
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