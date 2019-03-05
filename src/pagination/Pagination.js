import React from 'react';
import { Component, PropTypes, noop } from '../../libs';
import Icon from '@icon';

export default class Pagination extends Component {
    constructor(props) {
        super(props);
        const {
            defaultActive
        } = this.props;
        this.state = {
            count: 7,
            activeIndex: defaultActive,
            openNodes: []    
        }
    }
    static propTypes = {
        // size用来控制视觉的大小
        size: PropTypes.number,
        pageSize: PropTypes.number,
        total: PropTypes.number,
        defaultActive: PropTypes.number,
        onChange: PropTypes.func
    };
    static defaultProps = {
        defaultActive: 1,
        pageSize: 20,
        onChange: noop
    };

    componentDidUpdate(prevProps, prevState){
        const { pageTotal, activeIndex } = this.state;
        if(prevState.pageTotal === pageTotal && prevState.activeIndex === activeIndex){
            return false
        }
        this.getPageItem();
        return true;
    }

    componentWillMount(){
        this.getPageItem();
    }

    getPageItem(){
        const { total, pageSize } = this.props;
        const pageTotal = Math.ceil(total/pageSize);
        const { activeIndex, count } = this.state;

        let showPrevMore = false;
        let showNextMore = false;

        if (pageTotal > count) {
            if (activeIndex > count - 2) {
                showPrevMore = true;
            }
            if (activeIndex < pageTotal - 2) {
                showNextMore = true;
            }
        }

        const array = [];

        if (showPrevMore && !showNextMore) {
            const startPage = pageTotal - (count - 2);
            for (let i = startPage; i < pageTotal; i++) {
                array.push(i);
            }
        } else if (!showPrevMore && showNextMore) {
            for (let i = 2; i < count; i++) {
                array.push(i);
            }
        } else if (showPrevMore && showNextMore) {
            const offset = Math.floor(count / 2) - 1;
            for (let i = activeIndex - offset; i <= activeIndex + offset; i++) {
                array.push(i);
            }
        } else {
            for (let i = 2; i < pageTotal; i++) {
                array.push(i);
            }
        }

        this.setState({
            showNextMore,
            showPrevMore,
            pageTotal,
            pages: array
        })
    }
    renderItem(){
        const { pageTotal, activeIndex, pages, showNextMore, showPrevMore } = this.state;
        let itemList = [];
        // 1
        pageTotal > 0 && itemList.push(
            <li
                onClick={this.onClick.bind(this, 1)}
                key={0}
                className={this.className('tv-pagination-item',{
                    'tv-pagination-item-active': activeIndex === 1
                })}
            >1</li>
        )
        // prev more
        showPrevMore && itemList.push(
            <li
                onClick={this.onClick.bind(this, 'more', 'prev')}
                className={this.classNames(
                'tv-pagination-item-more'
                )}
            >...</li>
        )
        // 列表
        const pageList = pages.map((item, index) => {
            return (
                <li
                    onClick={this.onClick.bind(this, item)}
                    key={index}
                    className={this.className('tv-pagination-item', {
                        'tv-pagination-item-active': activeIndex === item
                    })}
                >{item}</li>
            )
        })
        itemList = itemList.concat(pageList);
        // next more
        showNextMore && itemList.push(
            <li
                onClick={this.onClick.bind(this, 'more', 'next')}
                className={this.classNames(
                'tv-pagination-item-more'
                )}
            >...</li>
        )
        // last
        pageTotal > 1 && itemList.push(
            <li
                className={this.className('tv-pagination-item', {
                    'tv-pagination-item-active': activeIndex === pageTotal
                })}
            >
              {pageTotal}
            </li>
        )

        return itemList;
    }
    onClick(activeText){
        const { activeIndex, pageTotal } = this.state;

        //todo: 处理prev next more other
        if(activeText === 'more'){
            //todo: 后期考虑增加点击more
            return;
        }
        //prev
        if(activeText === 'prev'){
            activeText = activeIndex - 1
        }

        if(activeText === 'next'){
            activeText = activeIndex + 1
        }

        activeText = Number(activeText);

        if (!isNaN(activeText)) {
            if (activeText < 1) {
                activeText = 1;
            }
            if (activeText > pageTotal) {
                activeText = pageTotal;
            }
        }

        if (activeText !== activeIndex) {
            this.props.onChange(activeText);
        }
        this.setState({
            activeIndex: activeText
        }, () => {
            console.log(this.state.activeIndex)
        })

    }
    render(){
        const { disabled } = this.state;
        return (
            <ul className={this.className('tv-pagination')}>
                <li 
                    onClick={this.onClick.bind(this, 'prev')} 
                    className={this.className('tv-pagination-prev', {
                    'tv-pagination-disabled': disabled === 'prev'
                })}>
                <Icon type="left" />
                </li>
                {this.renderItem()}
                <li 
                    onClick={this.onClick.bind(this, 'next')}
                     className={this.className('tv-pagination-next', {
                    'tv-pagination-disabled': disabled === 'next'
                })}><Icon type="right" /></li>
            </ul>    
        )
    }
}