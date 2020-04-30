/* eslint-disable @typescript-eslint/no-empty-function */
import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text, Form, Input, ScrollView, Swiper, SwiperItem } from '@tarojs/components'
// const SwiperItem = Swiper.item;

export default class PagePicker extends Component {
    constructor() {
        super(...arguments)
    }

    config: Config = {
        navigationBarTitleText: '列表'
    }

    onScrollToUpper() { }

    // or 使用箭头函数
    // onScrollToUpper = () => {}

    onScroll(e) {
        console.log(e.detail)
    }

    onScrollToLower(e){
       alert("111");
    }

    render() {
        const scrollStyle = {
            height: 150
        }
        const scrollTop = 0
        const Threshold = 20
        const vStyleA = {
            height: 150,
            'background-color': 'rgb(26, 173, 25)'
        }
        const vStyleB = {
            height: 150,
            'background-color': 'rgb(39,130,215)'
        }
        const vStyleC = {
            height: 150,
            'background-color': 'rgb(241,241,241)',
            color: '#333'
        }

        return (
            <ScrollView
                className='scrollview'
                scrollY
                scrollWithAnimation
                onRefresherPulling={<Text>111</Text>}
                scrollTop={scrollTop}
                style={scrollStyle}
                lowerThreshold={Threshold}
                upperThreshold={Threshold}
                onScrollToUpper={this.onScrollToUpper.bind(this)} // 使用箭头函数的时候 可以这样写 `onScrollToUpper={this.onScrollToUpper}`
                onScroll={this.onScroll}
                onScrollToLower={this.onScrollToLower}
                refresherBackground={"#eee"}
            >
                <Swiper
                    style={{
                        height: 200,
                        backgroundColor: "#eeeeee"
                    }}
                    indicatorColor='#999'
                    indicatorActiveColor='#333'
                    // vertical
                    circular
                    indicatorDots
                    autoplay>
                    <SwiperItem>
                        <View className='demo-text-1'><Text>1</Text></View>
                    </SwiperItem>
                    <SwiperItem>
                        <View className='demo-text-2'><Text>2</Text></View>
                    </SwiperItem>
                    <SwiperItem>
                        <View className='demo-text-3'><Text>3</Text></View>
                    </SwiperItem>
                </Swiper>

                <View style={vStyleA}><Text>A</Text></View>
                <View style={vStyleB}><Text>B</Text></View>
                <View style={vStyleC}><Text>C</Text></View>
                <View style={vStyleA}><Text>1</Text></View>
                <View style={vStyleB}><Text>2</Text></View>
                <View style={vStyleC}><Text>3</Text></View>
            </ScrollView>

        )
    }
}