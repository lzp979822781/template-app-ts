import Taro, { Component, Config } from "@tarojs/taro";
import { View, Block, Text, Image } from "@tarojs/components";
import { StatusBar, Header, DataList } from "@/components/index";
import { JDNetworkErrorView } from '@jdreact/jdreact-core-lib';
import JDRequest from "@/utils/jd-request";
import "./index.scss";

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

    render() {

        return (
            <View className='container'>
                <StatusBar />
                <Header title='明细' />
            </View>
        );
    }
}
