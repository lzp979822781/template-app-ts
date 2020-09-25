import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import classnames from 'classnames';
import { FlatList } from 'react-native';
import {
    JDDevice,
} from '@jdreact/jdreact-core-lib';
import DateItem from '../DateItem';

import { seriesNumberArray, fillId, getCurrentDateArr } from '@/utils/utils';

import './index.scss';



type PageOwnProps = {
    data: string
};

type PageOwnState = {
    value: any,
    selectedYearIndex: number,
    selectedMonthIndex: number,
    selectedDayIndex: number,

    currentScrollType: string,

    yearData: Array<any>,
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
const currentDate = getCurrentDateArr();
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

            currentScrollType: '',

            yearData: [],
            monthData: [],
            dayData: [],
        }
    }

    componentDidMount() {
        this.initData();
        this.initVal();
    }

    initData = () => {
        const [year, month, day ] = currentDate;
        const yearData = seriesNumberArray(year + 1, initYear);
        const monthData = seriesNumberArray(12, 1);
        const dayData = seriesNumberArray(this.getDays(year, month), 1);
        this.setState({
            yearData: fillId(yearData),
            monthData: fillId(monthData),
            dayData: fillId(dayData)
        })
    }

    initVal = () => {
        
    }

    /**
     * 根据已选中的值做初始化
     * @example 2020.09.01
     */
    scrollToFixPos = () => {
        const { data } = this.props;
        if(!data) return;
        const [year, month, day] = data.split('.');
        
    }

    

    yearRef = null;

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
        this.setState({ currentScrollType: '' })
        scrollHasEnded = true;
        setTimeout(() => {
            if(scrollHasEnded) {
                skipThisScrollListen = true;
                setTimeout(() => {
                    skipThisScrollListen = false;
                }, 350);
            }
            this.scrollToIndex(type);
        }, e ? 350: 0);
    }

    scrollToIndex = type => {
        const currentList = this[typeRef[type]];
        const { [typeRef[type]]: index } = this.state;
        if(currentList) {
            currentList.scrollToIndex({
                index: index - 1,
                animated: false
            })
        }

        this.updateDayData(type);
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
        if(type !== 'month') return;
        const { selectedYearIndex, selectedMonthIndex, selectedDayIndex} = this.state;
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
        length: normalItemHeight, offset: normalItemHeight * index, index
    })

    setYearRef = el => {
        this.yearRef = el
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

    renderSelLine = () => {
        return LineArr.map(item => {
            const cls = classnames(`${prefix}-line-com`, `${prefix}-line-${item}`);
            return (
                <View className={cls} key={item} pointerEvents='none'>
                    
                </View>
            );
        })
    }

    renderMonthList = () => {

    }

    renderDayList = () => {

    }

    render() {

        return (
            <View>
                <View className={prefix}>
                    { this.renderYearList()}
                    { this.renderSelLine()}
                </View>
                <Text>{this.state.selectedYearIndex}</Text>
            </View>
        );
    }
}

export default TaroDatePicker;