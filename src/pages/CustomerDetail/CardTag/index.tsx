import Taro, { Component, Config } from "@tarojs/taro";
import { View, Block, Button, Text, Image } from "@tarojs/components";
import Gradient from "@/components/Gradient";

import arrows from "@/assets/images/arrows@3x.png";
import CustomerTagIcon from "@/assets/images/customer-tag-icon@3x.png";
import "./index.scss";

export default class CardTag extends Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View className="card-tag">
                <View className="tag-head">
                    <View className="head-left">
                        <Image className="head-left-icon" src={CustomerTagIcon} />
                        <Text className="head-left-title">客户标签</Text>
                    </View>
                    <View className="head-right">
                        <Text className="head-right-txt">全部</Text>
                        <Image className="head-right-icon" src={arrows} />
                    </View>
                </View>
                <View className="tag-body">
                    <View className="tag-item">
                        <Text className="tag-item-txt">客户生命周期：稳定</Text>
                    </View>
                    <View className="tag-item">
                        <Text className="tag-item-txt">促销敏感度：不敏感</Text>
                    </View>
                </View>
            </View>
        );
    }
}
