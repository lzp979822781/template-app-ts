import Taro, { Component, Config } from "@tarojs/taro";
import { View, Text, Picker } from "@tarojs/components";

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
    }

    config: Config = {
        navigationBarTitleText: "表单"
    };

    componentDidShow() {
        console.log("");
    }

    render() {
        return (
            <View className="list">
                <InputText type="number" />
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
                    className="demo-view"
                    style={{
                        padding: 15,
                        alignItems: "center",
                        borderRadius: 5
                    }}
                >
                    <Text>按钮</Text>
                </LinearGradient>
            </View>
        );
    }
}
