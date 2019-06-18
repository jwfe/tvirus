import React from 'react';
import { Component, PropTypes, noop } from '@Libs';
import Icon from '@icon';

export default class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 7,
            activeIndex: props.defaultActive,
            openNodes: []    
        }
    }
    static propTypes = {
        /** 设置分页大小，可选值 'large', 'medium', small' 或不设 */
        size: PropTypes.oneOf(['large', 'medium', 'small']),
        /** 每页的数量 */
        pageSize: PropTypes.number,
        /** 总条数 */
        total: PropTypes.number,
        /** 默认选中页 */
        defaultActive: PropTypes.number,
        /** 切换后的回调 */
        onChange: PropTypes.func
    };
    static defaultProps = {
        size: 'medium',
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
                className={this.className('tv-pagination-item', {
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
                    key={`${index}_item`}
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
                onClick={this.onClick.bind(this, pageTotal)}
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
        
        this.setState({
            activeIndex: activeText
        }, () => {
            if (activeText !== activeIndex) {
                this.props.onChange(activeText);
            }
        })

    }
    render(){
        const { size } = this.props;
        const { pageTotal, activeIndex } = this.state;
        return (
            <ul className={this.className('tv-pagination', {
                [`tv-pagination-size-${size}`]: size
            })}>
                <li 
                    onClick={this.onClick.bind(this, 'prev')} 
                    className={this.className('tv-pagination-prev', {
                    'tv-pagination-disabled': activeIndex === 1
                })}>
                <Icon type="left" />
                </li>
                {this.renderItem()}
                <li 
                    onClick={this.onClick.bind(this, 'next')}
                     className={this.className('tv-pagination-next', {
                    'tv-pagination-disabled': activeIndex === pageTotal
                })}><Icon type="right" /></li>
            </ul>    
        )
    }
}