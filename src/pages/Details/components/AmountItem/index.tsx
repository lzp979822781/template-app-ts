import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";

import './index.scss';

const PREFIX = `amount-item`;

interface Item {
    label: string,
    value: string|number,
    prefixSign?: string|undefined
}

type pageOwnProps = {
    data: Item
}

class AmountItem extends Component<pageOwnProps> {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        const { data: {label, value, prefixSign}} = this.props;
        return (
            <View className={PREFIX}>
                <Text className={`${PREFIX}-label`}>{label}</Text>
                <View className={`${PREFIX}-right`}>
                    <Text className={`${PREFIX}-sign`}>{prefixSign || ''}</Text>
                    <Text className={`${PREFIX}-value`}>{`￥${value}`}</Text>
                </View>
                
            </View>
        );
    }
}

export default AmountItem;