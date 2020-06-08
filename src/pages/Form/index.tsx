import Taro, { Component, Config } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import InputText from "@/components/InputText/index";
import TextareaItem from "@/components/Textarea/index";
import PickerItem from "@/components/PickerItem/index";
import DatePicker from "@/components/DatePicker/index";
import Referto from "@/components/Referto/index";

import LinearGradient from "@/components/LinearGradient/index";

import "./index.scss";

export default class PagePicker extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                input: "123",
                textarea: "456",
                picker: 1,
                date: "2019-05-09",
                refer: "参照-0"
            }
        };
        this.alertEvent = this.alertEvent.bind(this);
    }

    config: Config = {
        navigationBarTitleText: "表单"
    };

    componentDidShow() {}

    componentDidMount() {
        // 监听一个事件，接受参数
        Taro.eventCenter.on("changeRefer", val => {
            this.onChange("refer", val);
        });
    }

    componentWillUnmount() {
        Taro.eventCenter.off("changeRefer");
    }

    alertEvent() {
        Taro.showToast({
            title: "点击",
            icon: "none",
            duration: 500
        }).then(res => console.log(res));
    }

    onChange(key, value) {
        let { data } = this.state;
        let newDate = { ...data };
        newDate[key] = value;

        this.setState({
            data: newDate
        });
    }

    render() {
        const { data } = this.state;
        return (
            <View className="list">
                <InputText
                    error = {true}
                    value={data.input}
                    onChange={value => {
                        this.onChange("input", value);
                    }}
                />
                <TextareaItem
                    value={data.textarea}
                    onChange={value => {
                        this.onChange("textarea", value);
                    }}
                />
                <PickerItem
                    value={data.picker}
                    onChange={value => {
                        this.onChange("picker", value);
                    }}
                    dataSource={[
                        { label: "美国", value: 0 },
                        { label: "中国", value: 1 },
                        { label: "巴西", value: 2 },
                        { label: "日本", value: 3 }
                    ]}
                />
                <DatePicker
                    value={data.date}
                    onChange={value => {
                        this.onChange("date", value);
                    }}
                />
                <Referto
                    value={data.refer}
                    onClick={() => {
                        Taro.navigateTo({
                            url: `/pages/ReferPage/index?id=${data.refer}`
                        });
                    }}
                />
                <LinearGradient
                    direction="row"
                    colors={["#F2140C", "#F2270C", "#F24D0C"]}
                    height={40}
                >
                    <View className="btn" onClick={this.alertEvent}>
                        <Text style={{ color: "#ffffff" }}>按钮</Text>
                    </View>
                </LinearGradient>
                <View>
                    <Text>{JSON.stringify(data, null, 2)}</Text>
                </View>
            </View>
        );
    }
}
