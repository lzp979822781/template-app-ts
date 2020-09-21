import Taro, { Component, Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
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

    render() {

        return (
            <View className='container'>
                <StatusBar />
                <Header title='订单明细' />
            </View>
        );
    }
}
