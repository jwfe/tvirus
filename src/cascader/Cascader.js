import React from 'react';
import { Component, PropTypes } from '@Libs';
import Icon from '@icon';
import Popup from '@popup';
import CascaderMenu from './Menu';

export default class Cascader extends Component {
    static propTypes = {
        /** 自定义样式 */
        className: PropTypes.string,
        /** 数据源 */ 
        options: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.string
        })).isRequired,
        /** 默认下拉出现的位置，请参考popup组件  */
        position: PropTypes.string,
        /** 点击每一个选项值都会变  */
        changeOnSelect: PropTypes.bool,
        /** 占位符  */
        placeholder: PropTypes.string,
        /** 变化的回调  */
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

        const defaultContent = (
            <div className="tv-cascader-label-default">
                {labels.length ? <span>{labels.join('/')}</span> : <span>{placeholder}</span>}    
                <Icon type="down" />
            </div>
        )

        return (
            <div className={this.className('tv-cascader', {
                'tv-cascader-focused': visible,
                'tv-cascader-disabled': disabled
            })}>

                <Popup 
                className="tv-cascader-wraper"
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
                                children ? children : defaultContent
                            }
                        </div>
                    </div>
                </Popup>
            </div>
        );
    }
}