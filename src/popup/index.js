import React from 'react';
import ReactDOM from 'react-dom';

import { Component, PropTypes, Portal, Animation } from '@Libs';

const POSITIONS = [
    'top',
    'bottom',
    'left',
    'right',
    'top left',
    'top right',
    'bottom right',
    'bottom left',
    'right center',
    'left center',
    'top center',
    'bottom center',
];

function getChildNode(node){
    if(!node){
        return null;
    }
    return node.children[0];
}

export default class Popup extends Component {
    static propTypes = {
        className: PropTypes.string,
        trigger: PropTypes.string,
        title: PropTypes.string,
        content: PropTypes.node,
        position: PropTypes.oneOf(POSITIONS),
        size: PropTypes.oneOf(['large', 'medium', 'small']),
        prefix: PropTypes.oneOf(['popup', 'tooltip']),
        visible: PropTypes.bool,
        disabled: PropTypes.bool,
        showMinWidth: PropTypes.bool,
        showArrow: PropTypes.bool,
        onChange: PropTypes.func,
    };

    static defaultProps = {
        prefix: 'popup',
        position: 'top left',
        visible: false,
        showMinWidth: false,
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
        return null
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
                <span key={i} ref={(el) => this.triggerNode = getChildNode(el)}>
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
    isElementInViewport (rect, dRect) {
        let left = rect.left === 'auto' ? false : (rect.left + dRect.width) > (window.innerWidth || document.documentElement.clientWidth);
        let right = rect.right === 'auto' ? false : rect.right > (window.innerWidth || document.documentElement.clientWidth);
        let top = rect.top === 'auto' ? false : (rect.top + dRect.height) > (window.innerHeight || document.documentElement.clientHeight);
        let bottom = rect.bottom === 'auot' ? false : (rect.bottom - dRect.height) < 0;
        

        return {
            left,
            right,
            top,
            bottom
        };
    }

    computePopup(resizePos){
        const { showMinWidth } = this.props;
        const style = {};
        const element = this.triggerNode;
        const popupNode = this.popupNode;
        const positions = resizePos || this.getPostion();
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
        const overflowViewport = this.isElementInViewport(style, popupCoords);
        if(overflowViewport.left){
            const index = positions.indexOf('left');
            positions[index] = 'right';
        }
        if(overflowViewport.right){
            const index = positions.indexOf('right');
            positions[index] = 'left';
        }
        if(overflowViewport.right || overflowViewport.left){
            return this.computePopup(positions);
        }

        // 使用最小宽度
        if(showMinWidth){
            style.minWidth = coords.width;  
        }
        
        return style
    }

    render() {
        let { title, content, showArrow, className, prefix } = this.props;
        const { showPopup, style } = this.state;
        const cloneChildren = this.renderCloneChildren();
        const postion = this.getPostion();
        prefix = `tv-${prefix}`;

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
                    className={this.className(prefix, className, {
                        [`${prefix}-show`]: showPopup,
                        [`${prefix}-${postion.join('-')}`]: postion
                    })}>
                        { showArrow && <div className={`${prefix}-arrow`} /> }
                        <div className={`${prefix}-inner`}>
                            {title && <h3 className={`${prefix}-title`}>{title}</h3>}
                            <div className={`${prefix}-content`}>
                                {content}
                            </div>
                        </div>
                    </div>
                </Animation>
            </Portal>
        ];
    }
}