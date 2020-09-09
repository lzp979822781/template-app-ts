import Taro, { Component } from "@tarojs/taro";
import { JDJumping } from "@jdreact/jdreact-core-lib";

import { View, Text, Image } from "@tarojs/components";
import arrows from "@/assets/images/arrows@3x.png";
import RelationTitleIcon from "@/assets/images/relation-title-icon@3x.png";
import OrderRecordIcon from "@/assets/images/order-record-icon@3x.png";
import AddGoodsIcon from "@/assets/images/add-goods-icon@3x.png";
import DiscountCouponIcon from "@/assets/images/discount-coupon-icon@3x.png";
import RelationIcon from "@/assets/images/relation-icon@3x.png";
// import { get as getGlobalData } from '@/utils/global_data';
import { hoverStyle, parseUrl } from "@/utils/utils";
import "./index.scss";

type baseProps = {
    data?: object;
}

export default class PurchasingInfo extends Component<baseProps, any> {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        data: {}
    }

    routerTo = (url, params) => {
        const uri = parseUrl(url, params)

        Taro.navigateTo({
            url: uri
        });
    };

    jumpToApp(des) {
        // const jyNativeData = getGlobalData('jyNativeData');
        const { data } = this.props;
        // console.log(`openApp.jyingApp://virtual?params={"category":"jump","des":"${des}", "params": ${JSON.stringify({customerPin: data.pin})}}`)
        JDJumping.jumpToOpenapp(
            `openApp.jyingApp://virtual?params={"category":"jump","des":"${des}", "params": ${JSON.stringify({customerPin: data.pin})}}`
        )
    }


    render() {
        const { data } = this.props;
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
                        <Text className='head-left-des-value'>{data.partnerLastOrderDateStr}</Text>
                        {/* <Text className='head-left-des-unit'>天前</Text> */}
                    </View>
                    <View
                        className='head-right'
                        hoverStyle={hoverStyle}
                    >
                        <Image className='head-right-icon' src={arrows} />
                    </View>
                </View>
                <View className='purchasing-body'>
                    <View
                        key='item-1'
                        className='purchasing-item'
                        hoverStyle={hoverStyle}
                        onClick={() => {
                            this.jumpToApp("orderPage");
                        }}
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
                        onClick={() => {
                            this.jumpToApp("cartPage");
                        }}
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
                        onClick={() => {
                            this.jumpToApp("discountPage");
                        }}
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
                        onClick={() => {
                            this.routerTo("/pages/PurchaseRelation/index", { pin: data.pin });
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
