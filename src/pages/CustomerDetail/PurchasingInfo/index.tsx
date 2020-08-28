import Taro, { Component, Config } from "@tarojs/taro";
import { View, Block, Button, Text, Image } from "@tarojs/components";

import arrows from "@/assets/images/arrows@3x.png";
import RelationTitleIcon from "@/assets/images/relation-title-icon@3x.png";
import OrderRecordIcon from "@/assets/images/order-record-icon@3x.png";
import AddGoodsIcon from "@/assets/images/add-goods-icon@3x.png";
import DiscountCouponIcon from "@/assets/images/discount-coupon-icon@3x.png";
import RelationIcon from "@/assets/images/relation-icon@3x.png";

import "./index.scss";

export default class PurchasingInfo extends Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View className="card-purchasing">
                <View className="purchasing-head">
                    <View className="head-left">
                        <Image className="head-left-icon" src={RelationTitleIcon} />
                        <Text className="head-left-title">采购信息</Text>
                        <Text className="head-left-des-label">最近下单</Text>
                        <Text className="head-left-des-value">57</Text>
                        <Text className="head-left-des-unit">天前</Text>
                    </View>
                    <View className="head-right">
                        <Image className="head-right-icon" src={arrows} />
                    </View>
                </View>
                <View className="purchasing-body">
                    <View className="purchasing-item">
                        <Image className="purchasing-item-icon" src={OrderRecordIcon} />
                        <Text className="purchasing-item-txt">订单记录</Text>
                    </View>
                    <View className="purchasing-item">
                        <Image className="purchasing-item-icon" src={AddGoodsIcon} />
                        <Text className="purchasing-item-txt">加车商品</Text>
                    </View>
                    <View className="purchasing-item">
                        <Image className="purchasing-item-icon" src={DiscountCouponIcon} />
                        <Text className="purchasing-item-txt">优惠劵</Text>
                    </View>
                    <View className="purchasing-item">
                        <Image className="purchasing-item-icon" src={RelationIcon} />
                        <Text className="purchasing-item-txt">建采关系</Text>
                    </View>
                </View>
            </View>
        );
    }
}
