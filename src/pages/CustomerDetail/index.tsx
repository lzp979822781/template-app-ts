import Taro, { Component, Config } from "@tarojs/taro";
import { ImageBackground } from "react-native";
import { View, ScrollView } from "@tarojs/components";
import Header from "@/components/Header";
import CardBase from "./CardBase/index";
import CardTag from "./CardTag/index";
import PurchasingInfo from "./PurchasingInfo/index";
import CardVisit from "./CardVisit/index";

import bgImage from "@/assets/images/customer-bg@3x.png";
import "./index.scss";

export default class OrderRecord extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false
        };
    }

    config: Config = {
        navigationBarTitleText: "列表",
        disableScroll: true //currentEnv === "RN"   //使用列表滚动事件，先把外壳默认滚动禁止，防止事件覆盖。
    };

    componentDidShow() {
        this.loadList();
    }

    loadList() {}

    render() {
        const image = { uri: bgImage };
        return (
            <View className="container">
                <ScrollView>
                    <ImageBackground
                        source={image}
                        style={{
                            resizeMode: "cover",
                            height: 160
                        }}
                    >
                        <Header title="客户详情" noBgColor />
                    </ImageBackground>
                    <CardBase />
                    <CardTag />
                    <PurchasingInfo />
                    <CardVisit />
                </ScrollView>
            </View>
        );
    }
}
