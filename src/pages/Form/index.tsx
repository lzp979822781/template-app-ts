import Taro, { Component, Config } from "@tarojs/taro";
import { View, Text, Picker } from "@tarojs/components";
import { LinearGradient } from "expo-linear-gradient";

import InputText from "@/components/InputText/index";
import TextareaItem from "@/components/Textarea/index";
import PickerItem from "@/components/PickerItem/index";
import DatePicker from "@/components/DatePicker/index";

import "./index.scss";

export default class PagePicker extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        };
    }

    config: Config = {
        navigationBarTitleText: "表单"
    };

    componentDidShow() {}

    handleChange(value) {
        this.setState({
            value
        });
        // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
        return value;
    }

    render() {
        return (
            <View className="list">
                <InputText type={"number"} />
                <TextareaItem />
                <PickerItem
                    dataSource={[
                        { label: "美国", value: "0" },
                        { label: "中国", value: "1" },
                        { label: "巴西", value: "2" },
                        { label: "日本", value: "3" }
                    ]}
                />
                <DatePicker />
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={["#F2140C", "#F2270C", "#F24D0C"]}
                    style={{
                        padding: 15,
                        alignItems: "center",
                        borderRadius: 5
                    }}
                >
                    <Text
                        style={{
                            backgroundColor: "transparent",
                            fontSize: 15,
                            color: "#fff"
                        }}
                    >
                        Sign in
                    </Text>
                </LinearGradient>
            </View>
        );
    }
}
