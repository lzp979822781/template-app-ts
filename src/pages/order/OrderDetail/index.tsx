import Taro, { Component, Config } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { StatusBar, Header } from "@/components/index";
import "./index.scss";

export default class OrderDetail extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount() {
    }

    config: Config = {
        navigationBarTitleText: "",
        disableScroll: true //currentEnv === "RN"   //使用列表滚动事件，先把外壳默认滚动禁止，防止事件覆盖。
    };

    renderTop = () => {
        return (
            <View className='order-detail-top'>
                <Text>订单详情</Text>
            </View>
        );
    }

    render() {

        return (
            <View className='order-detail'>
                <StatusBar />
                <Header title='订单明细' />
                { this.renderTop()}
            </View>
        );
    }
}