import Taro, { Component } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import classnames from 'classnames';
import { FlatList } from 'react-native';
import {
    JDDevice,
} from '@jdreact/jdreact-core-lib';
import { seriesNumberArray, fillId, formatSplitArray, formatNormal } from '@/utils/utils';
import DateItem from '../DateItem';

import './index.scss';



type PageOwnProps = {
    initDate: string
};

type PageOwnState = {
    value: any,

    // 选中的索引
    selectedYearIndex: number,
    selectedMonthIndex: number,
    selectedDayIndex: number,

    currentScrollType: string,

    yearData: Array<any>,
    monthData: Array<any>,
    dayData: Array<any>,

    // 当前选中的日期
    selectedDate: string
}

const prefix = 'detail-date';

const typeObj = {
    'year': 'selectedYearIndex',
    'month': 'selectedMonthIndex',
    'day': 'selectedDayIndex'
};

const typeRef = {
    'year': 'yearRef',
    'month': 'monthRef',
    'day': 'dayRef'
}

const LineArr = [ 'year', 'month', 'day'];
const currentDate = formatSplitArray(new Date());
const normalItemHeight = JDDevice.getRpx(100);
// 是否滚动已结束
let scrollHasEnded = false;
// 跳过此次滚动监听
let skipThisScrollListen = false;
// 初始年份
const initYear = 1990;

class TaroDatePicker extends Component<PageOwnProps, PageOwnState> {
    constructor(props) {
        super(props);
        this.state = {

            selectedYearIndex: 1,
            selectedMonthIndex: 1,
            selectedDayIndex: 1,

            yearData: [],
            monthData: [],
            dayData: [],

            selectedDate: null,
        }
    }

    componentDidMount() {
        this.initData();
        this.initPos();
    }

    initData = () => {
        const [year, month, ] = currentDate;
        const yearData = seriesNumberArray(year + 1, initYear);
        const monthData = seriesNumberArray(12, 1);
        const dayData = seriesNumberArray(this.getDays(year, month), 1);
        this.setState({
            yearData: fillId(yearData),
            monthData: fillId(monthData),
            dayData: fillId(dayData)
        })
    }

    /**
     * 打开活动页的时候初始化选中日期并跳转到指定位置
     * @selectedDate 标准Date类型数据
     */
    initPos = () => {
        const { initDate } = this.props;
        const selectedDate = formatNormal(initDate);
        this.initVal(selectedDate);
    } 

    initVal = (selectedDate) => {
        const [year, month, day] = formatSplitArray(selectedDate);
        this.setState({
            selectedDate,
            selectedYearIndex: (year - initYear + 1) > 1 ? (year - initYear + 1) : 1,
            selectedMonthIndex: month > 1 ? month : 1,
            selectedDayIndex: day > 1 ? day : 1,
        }, () => {
            this.onScrollEndDrag('day')();
        })
    }

    /**
     * 根据已选中的值做初始化
     * @example 2020.09.01
     */
    /* scrollToFixPos = () => {
        
    } */

    

    yearRef = null;
    monthRef = null;
    dayRef = null;

    onScroll = type => e => {

        if (skipThisScrollListen) return;
        const { nativeEvent: { contentOffset: {y: offestY} }  } = e;
        const index = Math.round(offestY / normalItemHeight) + 1;
        this.setState({
            [typeObj[type]]: index,
            currentScrollType: type
        });
        scrollHasEnded = false;
    }

    onScrollEndDrag = type => (e?: any) => {
        // 停止拖动时设置选中值
        if (skipThisScrollListen) return;
        scrollHasEnded = true;
        setTimeout(() => {
            if(scrollHasEnded) {
                skipThisScrollListen = true;
                setTimeout(() => {
                    skipThisScrollListen = false;
                }, 350);
            }
            this.scrollFixPos();
            this.updateDayData(type);
        }, e ? 350: 0);
    }

    scrollFixPos = () => {
        LineArr.forEach( type => {
            this.scrollToIndex(type);
        })
    }

    scrollToIndex = type => {
        const currentList = this[typeRef[type]];
        const { [typeObj[type]]: index } = this.state;
        if(currentList) {
            currentList.scrollToIndex({
                index: index - 1,
                animated: true
            })
        }
    }

    /**
     * 根据指定的年份、月份得到月份天数
     * @param {*} year
     * @param {*} month
     * @returns
     */
    getDays = (year, month) => {
        return new Date(year, month, 0).getDate();
    }

    updateDayData = type => {
        const { selectedYearIndex, selectedMonthIndex, selectedDayIndex} = this.state;
        if(type === 'day' || (type === 'year' && selectedDayIndex !== 2)) return;
        
        const year = initYear + selectedYearIndex - 1;
        const days = this.getDays(year, selectedMonthIndex);
        // const finalDays = fillDay(days).map(item => ({ id: UUID(), text: item}));
        this.setState({ dayData: fillId(seriesNumberArray(days, 1))})
        if(days < selectedDayIndex) {
            this.setState({ 
                selectedDayIndex: days
            }, () => {
                setTimeout( () => {
                    this.onScrollEndDrag('year')();
                },300)
            })
        }
    }


    onItemClick = (index, type) => () => {
        // 点击时滚动到指定的位置

    }

    formatItem = (param, type) => {
        if(!param || type === 'year') return param;
        return param.toString().padStart(2, '0');
    }

    renderItem = (item, index, type)  => {
        const { [typeObj[type]]: selectedIndex} = this.state;
        
        return (
            <DateItem 
                data={item}
                selected={selectedIndex === index}
                onClick={this.onItemClick(index, type)}
            />
        )
    }

    getItemLayout = (data, index) => ({
        length: normalItemHeight, 
        offset: normalItemHeight * index, 
        index
    })

    setYearRef = el => {
        this.yearRef = el
    }

    setMonthRef = el => {
        this.monthRef = el
    }

    setDayRef = el => {
        this.dayRef = el;
    }

    renderYearList = () => {
        const { yearData } = this.state;
        return (
            <View className={`${prefix}-list`}>
                <FlatList 
                    ref={this.setYearRef}
                    data={yearData}
                    renderItem={({ item, index }) => this.renderItem( item, index, 'year')}
                    initialNumToRender={50}
                    contentInsetAdjustmentBehavior='never'
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    onScroll={this.onScroll('year')}
                    onScrollEndDrag={this.onScrollEndDrag('year')}
                    onMomentumScrollEnd={this.onScrollEndDrag('year')}
                    getItemLayout={this.getItemLayout}
                    maxToRenderPerBatch={5}
                />
            </View>
        );
    }

    renderMonthList = () => {
        const { monthData } = this.state;
        return (
            <View className={`${prefix}-list`}>
                <FlatList 
                    ref={this.setMonthRef}
                    data={monthData}
                    renderItem={({ item, index }) => this.renderItem( item, index, 'month')}
                    initialNumToRender={50}
                    contentInsetAdjustmentBehavior='never'
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    onScroll={this.onScroll('month')}
                    onScrollEndDrag={this.onScrollEndDrag('month')}
                    onMomentumScrollEnd={this.onScrollEndDrag('month')}
                    getItemLayout={this.getItemLayout}
                    maxToRenderPerBatch={5}
                />
            </View>
        );
    }

    renderDayList = () => {
        const { dayData } = this.state;
        return (
            <View className={`${prefix}-list`}>
                <FlatList 
                    ref={this.setDayRef}
                    data={dayData}
                    renderItem={({ item, index }) => this.renderItem( item, index, 'day')}
                    initialNumToRender={50}
                    contentInsetAdjustmentBehavior='never'
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    onScroll={this.onScroll('day')}
                    onScrollEndDrag={this.onScrollEndDrag('day')}
                    onMomentumScrollEnd={this.onScrollEndDrag('day')}
                    getItemLayout={this.getItemLayout}
                    maxToRenderPerBatch={5}
                />
            </View>
        );
    }

    renderSelLine = () => {
        return LineArr.map(item => {
            const cls = classnames(`${prefix}-line-com`, `${prefix}-line-${item}`);
            return (
                <View className={cls} key={item} pointerEvents='none'>
                    
                </View>
            );
        })
    }

    onInitScroll = () => {
        this.initVal(new Date());
    }

    render() {

        return (
            <View>
                <View className={prefix}>
                    { this.renderYearList()}
                    { this.renderMonthList()}
                    { this.renderDayList()}
                    { this.renderSelLine()}
                </View>
            </View>
        );
    }
}

export default TaroDatePicker;