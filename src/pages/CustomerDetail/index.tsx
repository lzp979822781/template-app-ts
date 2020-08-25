import Taro, { Component, Config } from "@tarojs/taro";
import { ImageBackground } from "react-native";
import { View, Block, Button, Text, Image } from "@tarojs/components";
import Header from "@/components/Header";
import bgImage from "@/assets/images/customer-bg@3x.png";
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

    loadList() {}

    render() {
        const image = { uri: bgImage };
        return (
            <View className="container">
                <ImageBackground
                    source={image}
                    style={{
                        resizeMode: "cover",
                        height: 160
                    }}
                >
                    <Header title="客户详情" noBgColor />
                </ImageBackground>
                <View className="card-base">
                    <View className="card-base-head">
                        <Image
                            className="card-base-head-img"
                            src="https://zh-hans.reactjs.org/logo-og.png"
                        />
                    </View>
                    <View className="base-msg">
                        <Text className="company-title">
                            北京宇康松百姓平安大药房南海家园店
                        </Text>
                        <Text className="company-pin">
                            客户pin：温州市前锋大药房11111
                        </Text>
                        <Text className="company-manager">
                            客户经理：张琳琳
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}
