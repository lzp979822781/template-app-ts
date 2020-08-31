import Taro, { Component, Config } from "@tarojs/taro";
import { ScrollView, View } from "@tarojs/components";
import { ImageBackground } from "react-native";
import Header from "@/components/Header";
import StatusBar from "@/components/StatusBar/index";
import bgImage from "@/assets/images/customer-bg@3x.png";
import CardBase from "./CardBase/index";
import CardTag from "./CardTag/index";
import PurchasingInfo from "./PurchasingInfo/index";
import CardVisit from "./CardVisit/index";
import PopUpCon from "./PopUpCon/index";

import "./index.scss";

interface Option {
    name?: any
}

export default class OrderRecord extends Component<Option, any> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    };

    config: Config = {
        disableScroll: true //currentEnv === "RN"   //使用列表滚动事件，先把外壳默认滚动禁止，防止事件覆盖。
    };

    onPopupShow() {
        this.setState({ visible: true });
    };

    onPopupClose() {
        this.setState({ visible: false });
    };

    render() {
        return (
            <View className='container'>
                <ImageBackground
                    source={{ uri: bgImage }}
                    style={{
                        resizeMode: 'repeat',
                        height: 160
                    }}
                >
                    <StatusBar noBgColor></StatusBar>
                    <Header title='客户详情' noBgColor></Header>
                </ImageBackground>
                <ScrollView className='container-no-bg'>
                    <View className='no-bg-gap' />
                    <CardBase onPopupShow={this.onPopupShow}></CardBase>
                    <CardTag></CardTag>
                    <PurchasingInfo></PurchasingInfo>
                    <CardVisit></CardVisit>
                    <PopUpCon
                        visible={this.state.visible}
                        onPopupClose={this.onPopupClose}
                    ></PopUpCon>
                </ScrollView>
            </View>
        );
    }
}
