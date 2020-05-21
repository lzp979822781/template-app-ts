import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import {
    Button,
    InputItem,
    List,
    TextareaItem
} from "@ant-design/react-native";

import "./index.scss";

interface ListOption {
    title?: string;
    placeholder?: string;
    onChange?: () => void;
}

class Textarea extends Component<ListOption, any> {
    static defaultProps = {
        title: "标题",
        placeholder: "请输入",
        onChange: () => {}
    };

    constructor(props: any) {
        super(props);
        this.state = {
            value: ""
        };
    }

    render() {
        return (
            <View>
                <View  style={{ height:40, justifyContent: "center"; }}><Text style={{ fontSize:16, marginLeft:15 }}>多行文本</Text></View>
                <View style={{ marginHorizontal: 15, borderWidth:1, borderColor: "#eeeeee" }}>
                    <TextareaItem rows={4} count={200} placeholder="请输入..." />
                </View>
            </View>
        );
    }
}

export default Textarea as ComponentClass<PageOwnProps, PageState>;
