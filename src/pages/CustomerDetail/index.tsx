import Taro, { Component, Config } from "@tarojs/taro";
import { View, Block, Button, Text, Image } from "@tarojs/components";
import Header from "@/components/Header";
import "./index.scss";

const currentEnv = Taro.getEnv(); // 获取当前环境平台

interface option {
    text: string;
    style?: object;
    code: number;
}

export default class OrderRecord extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            current: 0
        };
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
                <Header title="客户详情" />
            </View>
        );
    }
}
