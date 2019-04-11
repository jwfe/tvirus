import React from 'react';
import ReactDOM from 'react-dom';

import { Component, PropTypes, Portal, Animation } from '@Libs';
import Icon from '@icon';

const POSITIONS = [
    'top left',
    'top right',
    'bottom right',
    'bottom left',
    'right center',
    'left center',
    'top center',
    'bottom center',
  ]

export default class Popup extends Component {
    static propTypes = {
        className: PropTypes.string,
        trigger: PropTypes.string,
        title: PropTypes.string,
        content: PropTypes.string,
        position: PropTypes.oneOf(POSITIONS),
        size: PropTypes.oneOf(['large', 'medium', 'small']),
        visible: PropTypes.bool,
        disabled: PropTypes.bool,
        showArrow: PropTypes.bool,
        onChange: PropTypes.func,
    };

    static defaultProps = {
        position: 'top left',
        visible: false,
        showArrow: true
    };

    constructor(props) {
        super(props);
        this.state = {
            visible: props.visible,
            showPopup: false
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.visible !== prevState.visible){
            return {
                visible: nextProps.visible,
                showPopup: nextProps.visible
            };
        }
    }
    
    componentDidMount(){
        const { trigger, disabled } = this.props;
        const { triggerNode, popupNode } = this.refs;

        this.element = ReactDOM.findDOMNode(this);
        this.triggerNode = ReactDOM.findDOMNode(triggerNode);
        this.popupNode = ReactDOM.findDOMNode(popupNode);
        if(!this.triggerNode || disabled){
            return ;
        }

        if(trigger === 'click'){
            this.triggerNode.addEventListener('click', () => {
                this.setPopupState(!this.state.showPopup);
            });

            document.addEventListener('click', (e) => {
                if (!this.element || this.element.contains(e.target) ||
                !this.triggerNode || this.triggerNode.contains(e.target) ||
                !popupNode || popupNode.contains(e.target)) return;
                this.setPopupState(false);
            });
        } else if (trigger === 'hover') {
            this.triggerNode.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
            this.triggerNode.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
            if(!popupNode){
                return;
            }
            popupNode.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
            popupNode.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
        } else {
            if (this.triggerNode.nodeName === 'INPUT' 
            || this.triggerNode.nodeName === 'TEXTAREA'
            || this.triggerNode.className.indexOf('tv-input-wraper') != -1
            ) {
                let node = this.triggerNode;
                if(this.triggerNode.className.indexOf('tv-input-wraper') != -1){
                    node = this.triggerNode.querySelector('input');
                }

                node.addEventListener('focus', this.handleMouseEnter.bind(this));
                node.addEventListener('blur', this.handleMouseLeave.bind(this));
                if(!popupNode){
                    return;
                }
                popupNode.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
                popupNode.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
            } else {
                this.triggerNode.addEventListener('mousedown', () => {
                    this.setPopupState(true);
                });
                this.triggerNode.addEventListener('mouseup', () => { this.setState({ showPopup: false })});
            }
        }

    }

    setPopupState(showPopup){
        const { onChange } = this.props;
        this.setState({
            showPopup
        }, () => {
            onChange && onChange(showPopup);
            this.setState({style: this.computePopup()})
        });
    }
    handleMouseEnter(){
        clearTimeout(this.timer);

        this.setPopupState(true);
    }

    handleMouseLeave(){
        this.timer = setTimeout(() => {
            this.setPopupState(false);
        }, 200);
    }

    includes(values, val){
        return values.indexOf(val) !== -1
    }

    getPostion(){
        const { position } = this.props;
        return position.split(' ');
    }

    renderCloneChildren(){
        const { children } = this.props;
        return React.Children.map(children, (child, i) => {
            return React.cloneElement(child, {ref: 'triggerNode'})
        });
    }

    getArrowPostion(postion){
        const config = {
            top: 'down',
            bottom: 'top',
            left: 'right',
            right: 'left'
        }

        return config[postion]
    }

    computePopup(){
        const style = {};
        const element = this.element;
        const popupNode = this.popupNode;
        const positions = this.getPostion();
        const positionsString = positions.join('');
        const coords = element.getBoundingClientRect();
        const popupCoords = popupNode.getBoundingClientRect();
        const { pageYOffset, pageXOffset } = window;
        const { clientWidth, clientHeight } = document.documentElement;

        if(this.includes(positions, 'right')){
            style.right = Math.round(clientWidth - (coords.right + pageXOffset))
            style.left = 'auto'
        } else if(this.includes(positions, 'left')){
            style.left = Math.round(coords.left + pageXOffset)
            style.right = 'auto'
        } else {
            const xOffset = (coords.width - popupCoords.width) / 2
            style.left = Math.round(coords.left + xOffset + pageXOffset)
            style.right = 'auto'
        }

        if (this.includes(positions, 'top')) {
            style.bottom = Math.round(clientHeight - (coords.top + pageYOffset))
            style.top = 'auto'
        } else if (this.includes(positions, 'bottom')) {
            style.top = Math.round(coords.bottom + pageYOffset)
            style.bottom = 'auto'
        } else {
            const yOffset = (coords.height + popupCoords.height) / 2
            style.top = Math.round(coords.bottom + pageYOffset - yOffset)
            style.bottom = 'auto'
        }

        // 把差量X掉
        if(positionsString === 'right' 
        ||positionsString === 'righttop' 
        || positionsString === 'rightbottom'
        || positionsString === 'left'
        ||positionsString === 'lefttop' 
        || positionsString === 'leftbottom'
        ){
            const xNOffset = popupCoords.width + 8;
            if (this.includes(positions, 'right')) {
                style.right -= xNOffset
            } else {
                style.left -= xNOffset
            }

            if(this.includes(positions, 'top')){
                style.bottom -= popupCoords.height
            }

            if(this.includes(positions, 'bottom')){
                style.top -= popupCoords.height
            }

        }
        
        return style
    }

    render() {
        const { title, content, showArrow } = this.props;
        const { showPopup, style } = this.state;
        const cloneChildren = this.renderCloneChildren();
        const postion = this.getPostion();
        const positionClassName = `tv-popup-${postion.join('-')}`;

        return [
            cloneChildren,
            <Portal>
                <Animation
                    animatedIn="fadeIn" 
                    animatedOut="fadeOut" 
                    inProp={showPopup}
                    unmountOnExit={false}
                >
                    <div 
                    style={this.style(style)}
                    ref="popupNode"
                    className={this.className('tv-popup', positionClassName, {
                        'tv-popup-show': showPopup
                    })}>
                        { showArrow && <div className="tv-popup-arrow" /> }
                        <div className="tv-popup-inner">
                            <h3 className="tv-popup-title">{title}</h3>
                            <div className="tv-popup-content">
                                {content}
                            </div>
                        </div>
                    </div>
                </Animation>
            </Portal>
        ];
    }
}