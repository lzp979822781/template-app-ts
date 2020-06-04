import Taro, { Component, Config } from "@tarojs/taro";
import { View, Text, Picker } from "@tarojs/components";
import { Animated } from 'react-native';
import InputText from "@/components/InputText/index";
import TextareaItem from "@/components/Textarea/index";
import PickerItem from "@/components/PickerItem/index";
import DatePicker from "@/components/DatePicker/index";
import LinearGradient from "@/components/LinearGradient/index";

import "./index.scss";

export default class PagePicker extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {};
        this.alertEvent = this.alertEvent.bind(this);
    }

    config: Config = {
        navigationBarTitleText: "表单"
    };

    componentDidShow() {
        console.log("");
    }

    alertEvent() {
        Taro.showToast({
            title: "点击",
            icon: "none",
            duration: 500
        }).then(res => console.log(res));
    }

    render() {
        return (
            <View className="list">
                <InputText />
                <TextareaItem />
                <PickerItem
                    dataSource={[
                        { label: "美国", value: 0 },
                        { label: "中国", value: 1 },
                        { label: "巴西", value: 2 },
                        { label: "日本", value: 3 }
                    ]}
                />
                <DatePicker />
                <LinearGradient
                    direction="row"
                    colors={["#4c669f", "#ffffff", "#4c669f"]}
                    height={40}
                >
                    <View className="btn" onClick={this.alertEvent}>
                        <Text style={{ color: "#666666" }}>按钮</Text>
                    </View>
                </LinearGradient>
            </View>
        );
    }
}
