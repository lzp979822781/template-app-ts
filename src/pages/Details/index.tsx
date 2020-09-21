import Taro, { Component, Config } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { StatusBar, Header } from "@/components/index";
// import { JDNetworkErrorView } from '@jdreact/jdreact-core-lib';
// import JDRequest from "@/utils/jd-request";
import "./index.scss";

const { statusBarHeight } = Taro.getSystemInfoSync() || {};

export default class Details extends Component<any, any> {
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
            <View >
                <Text>订单详情</Text>
            </View>
        );
    }

    render() {

        return (
            <View className='container'>
                <StatusBar />
                <Header title='明细' noBack />
                { this.renderTop()}
            </View>
        );
    }
}
