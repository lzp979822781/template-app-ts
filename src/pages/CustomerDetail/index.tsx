import Taro, { Component, Config } from "@tarojs/taro";
import { ImageBackground } from "react-native";
import { View, ScrollView } from "@tarojs/components";
import Header from "@/components/Header";
import CardBase from "./CardBase/index";
import CardTag from "./CardTag/index";
import PurchasingInfo from "./PurchasingInfo/index";
import CardVisit from "./CardVisit/index";
import PopUpCon from "./PopUpCon/index";
import StatusBar from "@/components/StatusBar/index";
import bgImage from "@/assets/images/customer-bg@3x.png";
import "./index.scss";

export default class OrderRecord extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    config: Config = {
        navigationBarTitleText: "列表",
        disableScroll: true //currentEnv === "RN"   //使用列表滚动事件，先把外壳默认滚动禁止，防止事件覆盖。
    };

    componentDidShow() {}

    onPopupShow = () => {
        this.setState({ visible: true });
    };

    onPopupClose = () => {
        this.setState({ visible: false });
    };

    render() {
        const { visible } = this.state;
        const image = { uri: bgImage };
        return (
            <View className="container">
                <ImageBackground
                    source={image}
                    style={{
                        resizeMode: "repeat",
                        height: 160
                    }}
                >
                    <StatusBar noBgColor />
                    <Header title="客户详情" noBgColor />
                </ImageBackground>
                <ScrollView className="container-no-bg">
                    <View style={{ height: 50 }}></View>
                    <CardBase onPopupShow={this.onPopupShow} />
                    <CardTag />
                    <PurchasingInfo />
                    <CardVisit />
                    <PopUpCon
                        visible={visible}
                        onPopupClose={this.onPopupClose}
                    />
                </ScrollView>
            </View>
        );
    }
}
