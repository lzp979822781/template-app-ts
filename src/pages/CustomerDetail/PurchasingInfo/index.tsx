import Taro, { Component, Config } from "@tarojs/taro";
import { View, Block, Button, Text, Image } from "@tarojs/components";

import arrows from "@/assets/images/arrows@3x.png";
import RelationTitleIcon from "@/assets/images/relation-title-icon@3x.png";
import OrderRecordIcon from "@/assets/images/order-record-icon@3x.png";
import AddGoodsIcon from "@/assets/images/add-goods-icon@3x.png";
import DiscountCouponIcon from "@/assets/images/discount-coupon-icon@3x.png";
import RelationIcon from "@/assets/images/relation-icon@3x.png";
import { hoverStyle } from "@/utils/utils";
import "./index.scss";

export default class PurchasingInfo extends Component<any, any> {
    constructor(props) {
        super(props);
    }

    alert = () => {
        Taro.showModal({
            title: "提示",
            content: "这是一个模态弹窗",
            success: function(res) {
                if (res.confirm) {
                    console.log("用户点击确定");
                } else if (res.cancel) {
                    console.log("用户点击取消");
                }
            }
        });
    };

    routerTo = url => {
        Taro.navigateTo({
            url: url
        });
    };

    render() {
        return (
            <View className='card-purchasing'>
                <View className='purchasing-head'>
                    <View className='head-left'>
                        <Image
                            className='head-left-icon'
                            src={RelationTitleIcon}
                        />
                        <Text className='head-left-title'>采购信息</Text>
                        <Text className='head-left-des-label'>最近下单</Text>
                        <Text className='head-left-des-value'>57</Text>
                        <Text className='head-left-des-unit'>天前</Text>
                    </View>
                    <View
                        className='head-right'
                        hoverStyle={hoverStyle}
                        onClick={this.alert}
                    >
                        <Image className='head-right-icon' src={arrows} />
                    </View>
                </View>
                <View className='purchasing-body'>
                    <View
                        key='item-1'
                        className='purchasing-item'
                        hoverStyle={hoverStyle}
                        onClick={this.alert}
                    >
                        <Image
                            className='purchasing-item-icon'
                            src={OrderRecordIcon}
                        />
                        <Text className='purchasing-item-txt'>订单记录</Text>
                    </View>
                    <View
                        key='item-2'
                        className='purchasing-item'
                        hoverStyle={hoverStyle}
                        onClick={this.alert}
                    >
                        <Image
                            className='purchasing-item-icon'
                            src={AddGoodsIcon}
                        />
                        <Text className='purchasing-item-txt'>加车商品</Text>
                    </View>
                    <View
                        key='item-3'
                        className='purchasing-item'
                        hoverStyle={hoverStyle}
                        onClick={this.alert}
                    >
                        <Image
                            className='purchasing-item-icon'
                            src={DiscountCouponIcon}
                        />
                        <Text className='purchasing-item-txt'>优惠劵</Text>
                    </View>
                    <View
                        key='item-4'
                        className='purchasing-item'
                        hoverStyle={hoverStyle}
                        onClick={()=>{
                            this.routerTo("/pages/PurchaseRelation/index");
                        }}
                    >
                        <Image
                            className='purchasing-item-icon'
                            src={RelationIcon}
                        />
                        <Text className='purchasing-item-txt'>建采关系</Text>
                    </View>
                </View>
            </View>
        );
    }
}
