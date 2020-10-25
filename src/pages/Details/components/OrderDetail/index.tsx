import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import { JDNetworkErrorView  } from '@jdreact/jdreact-core-lib';
import JDRequest from "@/utils/jd-request";
import { StatusBar, Header } from "@/components";
import InfoItem from '../InfoItem';

import OrderDetailGood from '../OrderDetailGood';
import AmountItem from '../AmountItem';

import REQUEST_URL from '../../services';
import { handleAmout, showLoading, hideLoading } from '../../util';

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
    companyName: string, // 客户名称
    occurTime: string, //下单时间
    partnerCentCommissionOrderSkuVoList: Array<GoodItem>
}

type pageOwnState = {
    data: OrderData,
    isTimeout: boolean, // 是否超时
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
                companyName: '北京协和医院',
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
            },

            isTimeout: false
        }
    }

    componentDidMount(){
        // 通过this.$router.params获取值
        this.getData();
    }

    getData = async () => {
        showLoading();
        const param = this.getParam();
        const res = await JDRequest.get(REQUEST_URL.orderDetail, param);
        hideLoading();
        this.handleSuccess(res);
        this.handleError(res);
    }

    handleSuccess = ({ success, data }) => {
        if(!success) return;
        this.setState({ 
            isTimeout: false,
            data
        })
    }

    handleError = ({ success }) => {
        if(success) return;
        this.setState({ isTimeout: true })
    }

    getParam = () => {
        const { prePage: { dealId = 120299792086 } = { }} = this.$router.params;
        return { id: dealId };
    }

    updata = () => {
        this.setState({
            isTimeout: false
        }, () => {
            this.getData();
        })
    }

    renderTotal = () => {
        const { data: { commission, statusDesc } } = this.state;

        return (
            <View className={`${PREFIX}-total`}>
                <View className={`${PREFIX}-total-desc`}>
                    <Text className={`${PREFIX}-total-desc-text`}>预估总佣金(元)</Text>
                </View>
                <View className={`${PREFIX}-total-amount`}>
                    <Text className={`${PREFIX}-total-amount-text`}>{handleAmout(commission)}</Text>
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
                <View className={`${PREFIX}-shop-head-container`}>
                    <Text className={`${PREFIX}-shop-head-name`} numberOfLines={1}>{shopName}</Text>
                </View>
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
        const { data: { occurTime, orderId, companyName } } = this.state;
        const data = [
            { label: '客户名称', value: companyName },
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
                    <Text className={`${PREFIX}-amount-info-real-value`}>{`￥${handleAmout(59.90)}`}</Text>
                </View>
            </View>
        );
    }

    render() {

        const { isTimeout } = this.state;

        if(isTimeout) {
            return (
                <View className={`${PREFIX}-net-error`}>
                    <StatusBar />
                    <Header title='订单详情' />
                    <View className={`${PREFIX}-net-error-container`}>
                        <JDNetworkErrorView onRetry={this.updata} />
                    </View>
                </View>
            );
        }

        return (
            <View className={PREFIX}>
                <StatusBar />
                <Header title='订单详情' />
                {this.renderTotal()}
                {this.renderShop()}
                { this.renderOrderInfo()}
                {/* { this.renderAmountInfo()} */}
            </View>
        );
    }
}

export default OrderDetail;