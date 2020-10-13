import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";

import './index.scss';

const PREFIX = `order-detail-good`;
const PREFIX_CONTENT = `${PREFIX}-content`;

interface GoodItem {
    id: string|number,
    img: string,
    skuName: string,
    medicalSpec: string,
    price: number,
    commission: number,
    num: number
}

type pageOwnProps = {
    data: GoodItem,
}

class OrderDetailGood extends Component<pageOwnProps> {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    renderGoodImg = () => {
        const { data: { img } } = this.props;

        return (
            <View className={`${PREFIX}-img`}>
                <Image className={`${PREFIX}-img-icon`} src={img} />
            </View>
        );
    }

    renderFooter = () => {
        const { data: { price, num, commission }} = this.props;
        return (
            <View className={`${PREFIX_CONTENT}-footer`}> 
                <Text className={`${PREFIX_CONTENT}-footer-price`}>{`¥${price}`}</Text>
                <Text className={`${PREFIX_CONTENT}-footer-num`}>{`x${num}`}</Text>
                <View className={`${PREFIX_CONTENT}-footer-commission`}>
                    <Text className={`${PREFIX_CONTENT}-footer-commission-desc`}>预估佣金 </Text>
                    <Text className={`${PREFIX_CONTENT}-footer-commission-text`}>{`¥${commission}`}</Text>
                </View>
            </View>
        );
    }

    renderContent = () => {
        const { data: { skuName, medicalSpec }} = this.props;
        return (
            <View className={PREFIX_CONTENT}>
                <View>
                    <Text className={`${PREFIX_CONTENT}-name`} numberOfLines={1} >{skuName}</Text>
                </View>
                <Text className={`${PREFIX_CONTENT}-spec`}>{`规格：${medicalSpec}`}</Text>
                { this.renderFooter()}
            </View>
        );
    }

    render() {
        return (
            <View className={PREFIX}>
                {this.renderGoodImg()}
                { this.renderContent()}
            </View>
        );
    }
}

export default OrderDetailGood;