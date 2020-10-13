import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import { FlatList } from 'react-native';
import { StatusBar, Header } from "@/components";

import './index.scss';

const PREFIX = 'order-detail';
const imgSrc = {
    orderStateSrc: 'https://img13.360buyimg.com/imagetools/jfs/t1/151329/7/2905/817/5f844b23E5c2274f0/85efdae6a589dc20.png',
    shopHomeSrc: 'https://img11.360buyimg.com/imagetools/jfs/t1/152280/25/2037/1252/5f8450bbE22498620/3a8f55630a33af74.png',
}

type pageOwnProps = {

}

interface OrderData {
    commission: number,
    statusDesc: string
}

type pageOwnState = {
    data: OrderData
}

class OrderDetail extends Component<pageOwnProps, pageOwnState> {

    constructor(props){
        super(props);
        this.state = {
            data: {
                commission: 1999,
                statusDesc: '订单-已完成',
            }
        }
    }


    renderTotal = () => {
        const { data: { commission, statusDesc } } = this.state;

        return (
            <View className={`${PREFIX}-total`}>
                <View className={`${PREFIX}-total-desc`}>
                    <Text className={`${PREFIX}-total-desc-text`}>预估总佣金(元)</Text>
                </View>
                <View className={`${PREFIX}-total-amount`}>
                    <Text className={`${PREFIX}-total-amount-text`}>{commission}</Text>
                </View>

                <View className={`${PREFIX}-total-order`}>
                    <Image className={`${PREFIX}-total-order-img`} src={imgSrc.orderStateSrc} />
                    <Text className={`${PREFIX}-total-order-text`}>{statusDesc}</Text>
                </View>
            </View>
        );
    }

    renderShopHead = () => {
        return (
            <View className={`${PREFIX}-shop-head`}>
                <Image className={`${PREFIX}-shop-head-icon`} src={imgSrc.shopHomeSrc} />
            </View>
        );
    }

    renderShop = () => {
        return (
            <View className={`${PREFIX}-shop`}>
                { this.renderShopHead()}
            </View>
        );
    }

    render() {
        return (
            <View className={PREFIX}>
                <StatusBar />
                <Header title='订单详情' />
                {this.renderTotal()}
                {this.renderShop()}
            </View>
        );
    }
}

export default OrderDetail;