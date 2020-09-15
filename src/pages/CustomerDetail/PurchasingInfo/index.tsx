import Taro, { Component } from "@tarojs/taro";
import { JDJumping } from "@jdreact/jdreact-core-lib";

import { View, Text, Image } from "@tarojs/components";
import { get as getGlobalData } from '@/utils/global_data';
import { hoverStyle, parseUrl, debounce } from "@/utils/utils";
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
        const { data } = this.props;
        JDJumping.jumpToOpenapp(
            `openApp.jyingApp://virtual?params={"category":"jump","des":"${des}", "params": ${JSON.stringify({ customerPin: data.pin, customerType: data.buyerUserType })}}`
        );
    }


    render() {
        const jyNativeData = getGlobalData('jyNativeData');
        const { data } = this.props;
        return (
            <View className='card-purchasing'>
                <View className='purchasing-head'>
                    <View className='head-left'>
                        <Image
                            className='head-left-icon'
                            src="https://img12.360buyimg.com/imagetools/jfs/t1/118715/23/17430/4896/5f58ac4fE40e24320/664d020c23d1392c.png"
                        />
                        <Text className='head-left-title'>采购信息</Text>
                        <Text className='head-left-des-label'>最近下单</Text>
                        <Text className='head-left-des-value'>{jyNativeData.userType === "CM" ? data.lastOrderDateStr : data.partnerLastOrderDateStr}</Text>
                        {/* <Text className='head-left-des-unit'>天前</Text> */}
                    </View>
                    {/* <View
                        className='head-right'
                        hoverStyle={hoverStyle}
                    >
                        <Image className='head-right-icon' src="https://img11.360buyimg.com/imagetools/jfs/t1/112898/10/17386/543/5f58ac4dEb76984c6/fd46e9d2b0230023.png" />
                    </View> */}
                </View>
                <View className='purchasing-body'>
                    <View
                        key='item-1'
                        className='purchasing-item'
                        hoverStyle={hoverStyle}
                        onClick={
                            debounce(() => {
                                this.jumpToApp("orderPage");
                            }, 150)
                        }
                    >
                        <Image
                            className='purchasing-item-icon'
                            src="https://img13.360buyimg.com/imagetools/jfs/t1/142495/32/7880/39398/5f58ac4eE02b1ed82/d16fd992d06dbbb6.png"
                        />
                        <Text className='purchasing-item-txt'>订单记录</Text>
                    </View>
                    <View
                        key='item-2'
                        className='purchasing-item'
                        hoverStyle={hoverStyle}
                        onClick={
                            debounce(() => {
                                this.jumpToApp("cartPage");
                            }, 150)
                        }
                    >
                        <Image
                            className='purchasing-item-icon'
                            src="https://img14.360buyimg.com/imagetools/jfs/t1/122857/20/12129/38309/5f58ac4dE1f7b88e8/4733db3e6c1401a1.png"
                        />
                        <Text className='purchasing-item-txt'>加车商品</Text>
                    </View>
                    <View
                        key='item-3'
                        className='purchasing-item'
                        hoverStyle={hoverStyle}
                        onClick={
                            debounce(() => {
                                this.jumpToApp("discountPage");
                            }, 150)
                        }
                    >
                        <Image
                            className='purchasing-item-icon'
                            src="https://img14.360buyimg.com/imagetools/jfs/t1/132553/24/9543/37247/5f58ac4eE37cd9c1b/a5bf6137c1c781ae.png"
                        />
                        <Text className='purchasing-item-txt'>优惠劵</Text>
                    </View>
                    <View
                        key='item-4'
                        className='purchasing-item'
                        hoverStyle={hoverStyle}
                        onClick={
                            debounce(() => {
                                this.routerTo("/pages/PurchaseRelation/index", { pin: data.pin });
                            }, 150)
                        }
                    >
                        <Image
                            className='purchasing-item-icon'
                            src="https://img11.360buyimg.com/imagetools/jfs/t1/133541/28/9499/59600/5f58ac4fE4fd82808/614eaeaf84a6cf7b.png"
                        />
                        <Text className='purchasing-item-txt'>建采关系</Text>
                    </View>
                </View>
            </View>
        );
    }
}
