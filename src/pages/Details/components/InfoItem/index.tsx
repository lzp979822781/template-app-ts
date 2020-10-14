import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";

import './index.scss';

const PREFIX = `info-item`;

interface Item {
    label: string,
    value: string|number
}

type pageOwnProps = {
    data: Item
}

class InfoItem extends Component<pageOwnProps> {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        const { data: {label, value}} = this.props;
        return (
            <View className={PREFIX}>
                <Text className={`${PREFIX}-label`}>{label}</Text>
                <Text className={`${PREFIX}-value`}>{value}</Text>
            </View>
        );
    }
}

export default InfoItem;