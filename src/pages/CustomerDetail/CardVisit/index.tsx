/* eslint-disable react/jsx-key */
import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";

import ListItemTitleIcon from "@/assets/images/list-item-title-icon@3x.png";
import calendar from "@/assets/images/calendar@3x.png";
import "./index.scss";

type baseProps = {
    data?: object;
    visitList: Array<object>;
}

export default class CardVisit extends Component<baseProps, any> {
    static defaultProps = {
        data: {},
        visitList: [{ id: 1 }]
    }

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    renderItems() {
        const { visitList } = this.props;
        const Shadow = {
            shadowColor: "#f5f5f5",
            shadowOffset: { w: 10, h: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 10,
            elevation: 1
        };

        if(visitList.length===0){
            return <Text className='visit-list-none' >暂无数据</Text>
        }

        return visitList.map((item) => {
            return (
                <View className='list-item' key={item.id} style={Shadow}>
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
        const { data } = this.props;
        return (
            <View className='card-visit'>
                <View className='visit-head'>
                    <View className='head-left'>
                        <Image className='head-left-icon' src={calendar} />
                        <Text className='head-left-title'>拜访记录</Text>
                        <Text className='head-left-des-label'>最近拜访</Text>
                        <Text className='head-left-des-value'>{data.partnerLastVisitDateStr}</Text>
                    </View>
                </View>
                <View className='visit-body'>
                    <View className='data-list'>{this.renderItems()}</View>
                </View>
            </View>
        );
    }
}
