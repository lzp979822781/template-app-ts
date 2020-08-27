import Taro, { Component, Config } from "@tarojs/taro";
import { View, Block, Button, Text, Image } from "@tarojs/components";
import Header from "@/components/Header";
import StatusBar from "@/components/StatusBar/index";
import "./index.scss";



export default class DiscountCoupon extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {};
    }

    config: Config = {
        navigationBarTitleText: "列表",
        disableScroll: true //currentEnv === "RN"   //使用列表滚动事件，先把外壳默认滚动禁止，防止事件覆盖。
    };

    componentDidShow() {
        this.loadList();
    }

    loadList() {
        setTimeout(() => {
            this.setState({
                refreshing: false
            });
        }, 3000);
    }

    render() {
        return (
            <View className="list">
                <StatusBar />
                <Header title="计划详情" />
            </View>
        );
    }
}
