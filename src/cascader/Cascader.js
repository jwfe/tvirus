import React from 'react';
import { Component, PropTypes } from '@Libs';
import Popup from '@popup';
import CascaderMenu from './Menu';

export default class Cascader extends Component {
    static propTypes = {
        className: PropTypes.string,
        options: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.string
        })).isRequired,
        name: PropTypes.string,
        position: PropTypes.string,
        changeOnSelect: PropTypes.bool,
        placeholder: PropTypes.string,
        onChange: PropTypes.func,
    };

    static defaultProps = {
        placeholder: '请选择',
        position: "bottom left"
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedVals: [],
            labels: [],
            visible: false,
        }
    }

    handlePopupChange(showPopup){
        const { disabled } = this.props;

        if(disabled){
            this.setState({visible: false});
            return;
        }

        if(disabled){
            showPopup = false
        }
        this.setState({visible: showPopup});
    }

    onMenuChange(values, labels, isLast){
        const { onChange } = this.props;
        onChange && onChange({
            visible: !isLast,
            selectedVals: values,
            labels
        });
        this.setState({
            visible: !isLast,
            selectedVals: values,
            labels
        })
    }

    renderChildren(){
        const { options, changeOnSelect } = this.props;
        return <CascaderMenu options={options} onChange={this.onMenuChange.bind(this)} changeOnSelect={changeOnSelect} />
    }

    render() {
        const { children, placeholder, disabled, position } = this.props;
        const { visible, labels } = this.state;

        return (
            <div className={this.className('tv-cascader', {
                'tv-cascader-disabled': disabled
            })}>

                <Popup 
                disabled={disabled}
                showArrow={false} 
                visible={visible} 
                trigger="click" 
                position={position} 
                content={this.renderChildren()}
                onChange={this.handlePopupChange.bind(this)}
                >
                    <div className="tv-cascader-trigger">
                        <div className="tv-cascader-label">
                            {
                                children ? children : labels.length ? <span>{labels.join('/')}</span> : <span>{placeholder}</span>
                            }
                        </div>
                    </div>
                </Popup>
            </div>
        );
    }
}