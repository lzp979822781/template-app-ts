import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import { StatusBar, Header } from "@/components";
import InfoItem from '../InfoItem';

import OrderDetailGood from '../OrderDetailGood';
import AmountItem from '../AmountItem';

import './index.scss';

const PREFIX = 'order-detail';
const imgSrc = {
    orderStateSrc: 'https://img13.360buyimg.com/imagetools/jfs/t1/151329/7/2905/817/5f844b23E5c2274f0/85efdae6a589dc20.png',
    shopHomeSrc: 'https://img11.360buyimg.com/imagetools/jfs/t1/152280/25/2037/1252/5f8450bbE22498620/3a8f55630a33af74.png',
    goodSrc: 'https://img14.360buyimg.com/imagetools/jfs/t1/128214/20/9716/410294/5f34ef8fEff34ec67/979a2fbce2411de7.png',
}

type pageOwnProps = {

}

interface GoodItem {
    id: string|number,
    img: string,
    skuName: string,
    medicalSpec: string,
    price: number,
    commission: number,
    num: number
}

interface OrderData {
    commission: number,
    statusDesc: string,
    shopName: string,
    orderSkuNum: number,
    orderType: number, // 订单类型
    orderId: number, //订单编号
    buyerName: string, // 客户名称
    occurTime: string, //下单时间
    partnerCentCommissionOrderSkuVoList: Array<GoodItem>
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
                shopName: '京东自营医药旗舰店',
                orderSkuNum: 20,
                orderId: 89702987463,
                orderType: 1001,
                buyerName: '北京协和医院',
                occurTime: '2019-01-01 17:03:29',
                /* consultAmount: 429.8,
                reduction: 0,
                discount: 30,
 */
                partnerCentCommissionOrderSkuVoList: [
                    {
                        id: '01',
                        img: imgSrc.goodSrc,
                        skuName: '珍源红石榴液红参浓饮品 10g*30包美国',
                        medicalSpec: '10g*30包',
                        price: 280,
                        commission: 123, // 佣金
                        num: 999
                    }
                ]
            }
        }
    }

    componentDidMount(){
        // 通过this.$router.params获取值
        this.showLoading('加载中');
    }

    timeout

    showLoading = (text, interval = 4000) => {
        clearTimeout(this.timeout);
        Taro.showLoading({ title: text })
        this.timeout = setTimeout(() => {
            this.hideLoading();
        }, interval);
    }

    hideLoading = () => {
        Taro.hideLoading();
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

    /**
     * 渲染店铺名称
     * @returns
     */
    renderShopHead = () => {
        const { data: { shopName, orderSkuNum }} = this.state;
        return (
            <View className={`${PREFIX}-shop-head`}>
                <Image className={`${PREFIX}-shop-head-icon`} src={imgSrc.shopHomeSrc} />
                <Text className={`${PREFIX}-shop-head-name`}>{shopName}</Text>
                <Text className={`${PREFIX}-shop-head-num`}>{`共${orderSkuNum}件分佣商品`}</Text>
            </View>
        );
    }

    renderGoods = () => {
        const { data: { partnerCentCommissionOrderSkuVoList: goodsData }} = this.state;
        return (
            <View className={`${PREFIX}-shop-content`}>
                {
                    goodsData.map((item) => {
                        return (
                            <OrderDetailGood  data={item} key={item.id} />
                        );
                    })
                }
            </View>
        );
    }

    renderShop = () => {
        return (
            <View className={`${PREFIX}-shop`}>
                { this.renderShopHead()}
                { this.renderGoods()}
                { this.renderEnd()}
            </View>
        );
    }

    renderEnd = () => {
        return (
            <View className={`${PREFIX}-end`}>
                <Text className={`${PREFIX}-end-text`}>没有更多了~</Text>
            </View>
        );
    }

    renderOrderInfo = () => {
        const { data: { occurTime, orderId, buyerName } } = this.state;
        const data = [
            { label: '客户名称', value: buyerName },
            { label: '订单编号', value: orderId },
            { label: '下单时间', value: occurTime },
        ]

        return (
            <View className={`${PREFIX}-info`}>
                {
                    data.map((item) => {
                        return <InfoItem data={item} key={item.label} />
                    })
                }
                
            </View>
        );
    }

    renderAmountInfo = () => {
        const data =[
            { label: '问诊金额', value: 429.8},
            { label: '立减', value: 0, prefixSign: '-'},
            { label: '商品优惠', value: 30, prefixSign: '+'},
        ];

        return (
            <View className={`${PREFIX}-amount-info`}>
                {
                    data.map((item) => ( <AmountItem data={item} key={item.label} />))
                }
                <View className={`${PREFIX}-amount-info-real`}>
                    <Text className={`${PREFIX}-amount-info-real-desc`}>实付款</Text>
                    <Text className={`${PREFIX}-amount-info-real-value`}>{`￥${59.90}`}</Text>
                </View>
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
                { this.renderOrderInfo()}
                { this.renderAmountInfo()}
            </View>
        );
    }
}

export default OrderDetail;