/* eslint-disable react/jsx-key */
import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { get as getGlobalData } from '@/utils/global_data';
import { parseUrl } from "@/utils/utils";
import "./index.scss";

type baseProps = {
    lastPage: boolean;
    loaded: boolean;
    data?: object;
    visitList: Array<object>;
}

export default class CardVisit extends Component<baseProps, any> {
    static defaultProps = {
        lastPage:false,
        loaded: false,
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
        const { visitList, loaded } = this.props;
        const Shadow = {
            shadowColor: "#f5f5f5",
            shadowOffset: { w: 10, h: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 10,
            elevation: 1
        };

        // visitList = [{id:1, visitorList:[{}]}]

        if (visitList.length === 0 && loaded) {
            return <Text className='visit-list-none' >暂无数据</Text>
        }else if(visitList.length === 0 && !loaded){
            return <Text className='visit-list-none' >--</Text>
        };

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
                            src='https://img10.360buyimg.com/imagetools/jfs/t1/124605/18/11985/1524/5f58ac4eEcadb87aa/e8016790250e8b64.png'
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
                                src={item.headPortrait || "https://img12.360buyimg.com/imagetools/jfs/t1/117795/39/17237/9507/5f58ac4eEbac6f1aa/bd467cb98fce7724.png"}
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
        const jyNativeData = getGlobalData('jyNativeData');
        const { lastPage, data, visitList } = this.props;
        return (
            <View className='card-visit'>
                <View className='visit-head'>
                    <View className='head-left'>
                        <Image className='head-left-icon' src='https://img12.360buyimg.com/imagetools/jfs/t1/124862/19/12175/1481/5f58ac4dE55b26764/7cb827149a95b6e5.png' />
                        <Text className='head-left-title'>拜访记录</Text>
                        <Text className='head-left-des-label'>最近拜访</Text>
                        <Text className='head-left-des-value'>{jyNativeData.userType === "CM" ? data.lastVisitDateStr : data.partnerLastVisitDateStr}</Text>
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
