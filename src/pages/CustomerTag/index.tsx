import Taro, { Component, Config } from "@tarojs/taro";
import {
    View,
    ScrollView,
    Block,
    Button,
    Text,
    Image
} from "@tarojs/components";
import Header from "@/components/Header";
import StatusBar from "@/components/StatusBar/index";
import ListItem from "./ListItem/index";
import TagAlertBtn from "@/assets/images/tag-alert-btn@3x.png";

import "./index.scss";

export default class Goods extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {};
    }

    config: Config = {
        navigationBarTitleText: "列表",
        disableScroll: true //currentEnv === "RN"   //使用列表滚动事件，先把外壳默认滚动禁止，防止事件覆盖。
    };

    componentDidShow() {}
    alert = () => {
        Taro.showModal({
            title: "提示",
            content: "这是一个模态弹窗",
            success: function(res) {
                if (res.confirm) {
                    console.log("用户点击确定");
                } else if (res.cancel) {
                    console.log("用户点击取消");
                }
            }
        });
    };
    render() {
        const Shadow = {
            shadowColor: "#f5f5f5",
            shadowOffset: { w: 10, h: 2 },
            shadowOpacity: 1,
            shadowRadius: 10,
            elevation: 2
        };
        return (
            <View className="container">
                <StatusBar />
                <Header
                    title="客户标签"
                    renderRight={
                        <View className="tag-head-right" onClick={this.alert}>
                            <Image
                                className="head-right-btn"
                                src={TagAlertBtn}
                            />
                        </View>
                    }
                />
                <View className="tag-banner-bg"></View>
                <View className="card-base" style={Shadow}>
                    <View className="card-base-item">
                        <Text className="card-base-item-label">生命周期</Text>
                        <Text className="card-base-item-value">稳定</Text>
                    </View>
                    <View className="tag-divide-line"></View>
                    <View className="card-base-item">
                        <Text className="card-base-item-label">客户价值</Text>
                        <Text className="card-base-item-value">重要价值</Text>
                    </View>
                </View>
                <View className="card-operation">
                    <ListItem
                        label={"服务标签"}
                        value={"在线问诊；可开处方；送药服务"}
                    />
                    <ListItem
                        label={"展示标签"}
                        value={"在线问诊；可开处方；送药服务"}
                    />
                    <ListItem
                        label={"服务位置"}
                        value={"在线问诊；可开处方；送药服务"}
                    />
                </View>
                <View className="card-operation">
                    <ListItem label={"复购周期"} value={"11"} />
                    <ListItem label={"促销敏感度"} value={"不敏感"} />
                    <ListItem
                        label={"购买标签"}
                        value={"全站非新人；药品新人；非药非新人"}
                    />
                </View>
            </View>
        );
    }
}
