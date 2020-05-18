import Taro, { Component, Config } from '@tarojs/taro'
import { View, Block, Button, Text, Image, Form, Input, ScrollView, Swiper, SwiperItem } from '@tarojs/components'
import DataList from '@/components/DataList/index';
import SwipeAction from '@/components/SwipeAction/index';
import Tabs from './Tabs/index';

import './index.scss';

const currentEnv = Taro.getEnv(); // 获取当前环境平台

interface option {
    text: string;
    style?: object;
    code: number;
}


export default class PagePicker extends Component<any, any> {
    constructor(props) {
        super(props)
        this.state = {
            refreshing: false,
            current: 0
        }
        this.onRefresh = this.onRefresh.bind(this)
        this.onEndReached = this.onEndReached.bind(this)
        this.onChangeTabs = this.onChangeTabs.bind(this)
    }

    config: Config = {
        navigationBarTitleText: '列表',
        disableScroll: true, //currentEnv === "RN"   //使用列表滚动事件，先把外壳默认滚动禁止，防止事件覆盖。
    }

    componentDidShow() {
        // this.setState({
        //     refreshing: true,
        // })
        this.loadList();
    }

    loadList() {
        setTimeout(() => {
            this.setState({
                refreshing: false,
            })
        }, 3000)
    }


    onRefresh() {
        this.setState({
            refreshing: true,
        })
        this.loadList();
    }

    onEndReached() {
        Taro.showToast({
            title: '底部',
            icon: "none",
            duration: 500
        })
            .then(res => console.log(res))
    }

    renderItems() {
        const dataSource = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        const options: option[] = [{
            code: 1,
            text: "编辑",
            style: { backgroundColor: 'orange', color: 'white' }
        }, {
            code: 2,
            text: "删除",
            style: { backgroundColor: 'red', color: 'white' }
        }]

        const Shadow = {
            shadowColor: "#242424",
            shadowOffset: { w: 10, h: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 2
        }

        return dataSource.map((item, index) => {
            let className = index === 0 ? "list-item-box top-gap" : "list-item-box";
            return <View key={item} style={currentEnv === "RN" ? Shadow : {}} className={className} >
                <SwipeAction options={options} onClick={this.onClickSwipeAction.bind(this, index)}>
                    <View className="list-item" >
                        <View>
                            <Image
                                className="item-image"
                                src='http://img20.360buyimg.com/ling/jfs/t1/20876/36/12835/3043/5c9c2929Ed18cfb11/15b1c03ec830ab8e.png'
                            />
                        </View>
                        <View>
                            <View className="item-title-box">
                                <Text className="item-title">
                                    测试商品日用百货-{item}
                                </Text>
                            </View>
                            <View>
                                <Text className="item-dec">
                                    有效期：2019-09-24
                            </Text>
                            </View>
                        </View>
                    </View>
                </SwipeAction>
            </View>
        });
    }

    onClickSwipeAction = (index, item) => {
        Taro.showToast({
            title: `第 ${index} 条 | 点击: ${item.text}`,
            icon: "none",
            duration: 2000
        })
            .then(res => console.log(res))
    }

    onChangeTabs(value) {
        console.log(value);
        this.setState({
            current: value.index
        })
    }

    render() {
        const tabList = [
            { title: '第一项', index: 0 },
            { title: '第二项', index: 1 },
            { title: '第三项', index: 2 }
        ]

        return (
            <View className='list'>
                <Tabs
                    height={150}
                    tabList={tabList}
                    onChange={this.onChangeTabs}
                />
                <DataList
                    minusHeight={190}
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                    onEndReached={this.onEndReached}
                >
                    <Block>
                        {
                            this.renderItems()
                        }
                    </Block>
                </DataList>
            </View >
        )
    }
}