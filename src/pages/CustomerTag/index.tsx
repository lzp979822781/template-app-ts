import Taro, { Component, Config } from "@tarojs/taro";
import { View, Block, Button, Text, Image } from "@tarojs/components";
import Header from "@/components/Header";
import StatusBar from "@/components/StatusBar/index";
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

    render() {
        return (
            <View className="container">
                <StatusBar />
                <Header title="客户标签" />
                <View className="container"></View>
            </View>
        );
    }
}
