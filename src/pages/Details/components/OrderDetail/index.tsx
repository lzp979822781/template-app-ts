import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import { FlatList } from 'react-native';

import './index.scss';

const PREFIX = 'order-detail';

class OrderDetail extends Component<pageOwnProps> {

    constructor(props){
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View className={PREFIX}>
                <Text>订单详情</Text>
            </View>
        );
    }
}

export default OrderDetail;