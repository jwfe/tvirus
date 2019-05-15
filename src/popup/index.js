import React from 'react';
import ReactDOM from 'react-dom';

import { Component, PropTypes, Portal, Animation } from '@Libs';

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
        this.triggerNode = null;
        this.popupNode = null;

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
        const triggerNode = this.triggerNode;
        const popupNode = this.popupNode;

        this.element = ReactDOM.findDOMNode(this);
        if(!triggerNode || disabled){
            return ;
        }

        if(trigger === 'click'){
            triggerNode.addEventListener('click', () => {
                this.setPopupState(!this.state.showPopup);
            });

            document.addEventListener('click', (e) => {
                if (!e.target || !this.element || this.element.contains(e.target) ||
                !triggerNode || triggerNode.contains(e.target) ||
                !popupNode || popupNode.contains(e.target)) return;
                this.setPopupState(false);
            });
        } else if (trigger === 'hover') {
            triggerNode.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
            triggerNode.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
            if(!popupNode){
                return;
            }
            popupNode.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
            popupNode.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
        } else {
            if (triggerNode.nodeName === 'INPUT' 
            || triggerNode.nodeName === 'TEXTAREA'
            || triggerNode.className.indexOf('tv-input-wraper') != -1
            ) {
                let node = triggerNode;
                if(triggerNode.className.indexOf('tv-input-wraper') != -1){
                    node = triggerNode.querySelector('input');
                }

                node.addEventListener('focus', this.handleMouseEnter.bind(this));
                node.addEventListener('blur', this.handleMouseLeave.bind(this));
                if(!popupNode){
                    return;
                }
                popupNode.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
                popupNode.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
            } else {
                triggerNode.addEventListener('mousedown', () => {
                    this.setPopupState(true);
                });
                triggerNode.addEventListener('mouseup', () => { this.setState({ showPopup: false })});
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
        const { children, childrenProps } = this.props;
        return React.Children.map(children, (child, i) => {
            return (
                <span ref={(el) => this.triggerNode = el}>
                    {
                        React.cloneElement(child, {
                            ...childrenProps
                        })
                    }
                </span>
            )
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
        const { title, content, showArrow, className } = this.props;
        const { showPopup, style } = this.state;
        const cloneChildren = this.renderCloneChildren();
        const postion = this.getPostion();

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
                    ref={el => this.popupNode = el}
                    className={this.className('tv-popup', className, {
                        'tv-popup-show': showPopup,
                        [`tv-popup-${postion.join('-')}`]: postion
                    })}>
                        { showArrow && <div className="tv-popup-arrow" /> }
                        <div className="tv-popup-inner">
                            {title && <h3 className="tv-popup-title">{title}</h3>}
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