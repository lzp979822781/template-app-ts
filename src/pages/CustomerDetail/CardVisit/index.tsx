/* eslint-disable react/jsx-key */
import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";

import ListItemTitleIcon from "@/assets/images/list-item-title-icon@3x.png";
import calendar from "@/assets/images/calendar@3x.png";
import "./index.scss";

export default class CardVisit extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            data: [{}, {}]
        };
    }

    renderItems() {
        const { data } = this.state;
        const Shadow = {
            shadowColor: "#f5f5f5",
            shadowOffset: { w: 10, h: 2 },
            shadowOpacity: 1,
            shadowRadius: 10,
            elevation: 1
        };

        return data.map(item => {
            return (
                <View className='list-item' style={Shadow}>
                    <View className='list-item-head'>
                        <Image
                            className='list-item-title-icon'
                            src={ListItemTitleIcon}
                        />
                        <Text className='list-item-title-txt'>
                            拜访日期：2017-04-18
                        </Text>
                    </View>
                    <View className='list-item-des'>
                        <Text className='list-item-des-txt'>拜访人：张爽</Text>
                        <View className='divide-line-vertical'></View>
                        <Text className='list-item-des-txt'>13804217770</Text>
                        <View className='divide-line-vertical'></View>
                        <Text className='list-item-des-txt'>法人</Text>
                    </View>
                    <View className='list-item-des'>
                        <Text className='list-item-des-txt'>
                            拜访纪要：拜访
                        </Text>
                    </View>
                    <View className='list-item-footer'>
                        <View className='item-footer-icon-con'>
                            <Image
                                className='item-footer-icon'
                                src='https://m.360buyimg.com/jmeside/jfs/t1/57152/18/11709/90893/5d88b603E5f78381c/f27e683a0ac599f9.png'
                            />
                        </View>
                        <Text className='item-footer-txt'>
                            客户经理：王佳丽
                        </Text>
                    </View>
                </View>
            );
        });
    }

    render() {
        return (
            <View className='card-visit'>
                <View className='visit-head'>
                    <View className='head-left'>
                        <Image className='head-left-icon' src={calendar} />
                        <Text className='head-left-title'>拜访记录</Text>
                        <Text className='head-left-des-label'>最近下单</Text>
                        <Text className='head-left-des-value'>今天</Text>
                    </View>
                </View>
                <View className='visit-body'>
                    <View className='data-list'>{this.renderItems()}</View>
                </View>
            </View>
        );
    }
}
