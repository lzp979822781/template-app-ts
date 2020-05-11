import Taro, { Component, Config } from '@tarojs/taro'
import { View, Block, Button, Text, Image, Form, Input, ScrollView, Swiper, SwiperItem } from '@tarojs/components'
import DataList from '@/components/DataList/index';
import SwipeAction from '@/components/SwipeAction/index';
import './index.scss';


interface option {
    text: string;
    style?: object;
    code: number;
}


export default class PagePicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            refreshing: false
        }
        this.onRefresh = this.onRefresh.bind(this)
        this.onEndReached = this.onEndReached.bind(this)
    }

    config: Config = {
        navigationBarTitleText: '列表',
        disableScroll: true   //使用列表滚动事件，先把外壳默认滚动禁止，防止事件覆盖。
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
        const dataSource = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        return dataSource.map((item, index) => {
            return <View key={index} className="list-item" >
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
        });
    }

    onClickSwipeAction = (item) => {
        Taro.showToast({
            title: item.text + "" + item.code,
            icon: "none",
            duration: 500
        })
            .then(res => console.log(res))
    }



    render() {
        const options: option[] = [{
            code: 1,
            text: "编辑",
            style: { backgroundColor: 'orange', color: 'white' }
        }, {
            code: 2,
            text: "删除",
            style: { backgroundColor: 'red', color: 'white' }
        }]

        return (
            <View className='list'>
                <SwipeAction options={options} onClick={this.onClickSwipeAction}>
                    <View className="swipe-action"><Text>SwipeAction 侧滑操作事例</Text></View>
                </SwipeAction>

                <DataList
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                    onEndReached={this.onEndReached}
                >
                    {/* 空标签用Block */}
                    <Block>
                        {
                            this.renderItems()
                        }
                    </Block>
                </DataList>
            </View>
        )
    }
}