import Taro, { Component, Config } from "@tarojs/taro";
import { View, Block, Button, Text, Image } from "@tarojs/components";
import "./index.scss";

interface Option {
    label?: string;
    value?: string;
}


export default class ListItem extends Component<Option, any> {
    static defaultProps = {
        label: "标题",
        value: "内容"
    };
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View className="list-item">
                <View className="list-item-lable"><Text className="list-item-lable-txt">{this.props.label}</Text></View>
                <View className="list-item-value"><Text className="list-item-value-txt">{this.props.value}</Text></View>
            </View>
        );
    }
}
