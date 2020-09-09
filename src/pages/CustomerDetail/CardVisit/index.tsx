/* eslint-disable react/jsx-key */
import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { parseUrl } from "@/utils/utils";
import ListItemTitleIcon from "@/assets/images/list-item-title-icon@3x.png";
import calendar from "@/assets/images/calendar@3x.png";
import customerManagerDefaultHead from "@/assets/images/customer-manager-default-head@3x.png";

import "./index.scss";

type baseProps = {
    lastPage: boolean;
    data?: object;
    visitList: Array<object>;
}

export default class CardVisit extends Component<baseProps, any> {
    static defaultProps = {
        lastPage:false,
        data: {},
        visitList: [{ id: 1 }]
    }

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    routerTo = (url, params) => {
        const uri = parseUrl(url, params)

        Taro.navigateTo({
            url: uri
        });
    };

    renderItems() {
        const { visitList } = this.props;
        const Shadow = {
            shadowColor: "#f5f5f5",
            shadowOffset: { w: 10, h: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 10,
            elevation: 1
        };

        // visitList = [{visitorList:[{}]}]

        if (visitList.length === 0) {
            return <Text className='visit-list-none' >暂无数据</Text>
        }

        return visitList.map((item) => {
            return (
                <View className='list-item' key={item.id} style={Shadow} onClick={() => {
                    this.routerTo("/pages/PlanDetail/index", {
                        customerId: item.customerId,
                        taskId: item.taskId
                    });
                }}
                >
                    <View className='list-item-head'>
                        <Image
                            className='list-item-title-icon'
                            src={ListItemTitleIcon}
                        />
                        <Text className='list-item-title-txt'>
                            拜访日期：{item.finishDate || "--"}
                        </Text>
                    </View>
                    <View className='list-item-des'>
                        <Text className='list-item-des-txt'>拜访人：{item.visitorList[0].contactName}</Text>
                        <View className='divide-line-vertical'></View>
                        <Text className='list-item-des-txt'>{item.visitorList[0].mobile}</Text>
                        <View className='divide-line-vertical'></View>
                        <Text className='list-item-des-txt'>{item.visitorList[0].roleName}</Text>
                    </View>
                    <View className='list-item-des'>
                        <Text className='list-item-des-txt'>
                            拜访纪要：{item.commContent || "--"}
                        </Text>
                    </View>
                    <View className='list-item-footer'>
                        <View className='item-footer-icon-con'>
                            <Image
                                className='item-footer-icon'
                                src={item.headPortrait || customerManagerDefaultHead}
                            />
                        </View>
                        <Text className='item-footer-txt'>
                            客户经理：{item.userName || "--"}
                        </Text>
                    </View>
                </View>
            );
        });
    }

    render() {
        const { lastPage, data, visitList } = this.props;
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
                    {lastPage && visitList.length > 0 ? <Text className='visit-list-none' >没有更多数据了</Text> : null}
                </View>
            </View>
        );
    }
}
