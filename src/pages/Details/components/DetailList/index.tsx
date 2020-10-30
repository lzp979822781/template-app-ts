import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import { FlatList, RefreshControl } from 'react-native';

import { parseUrl } from '@/utils/utils';
import { handleAmout, DEFAULT_BG } from '../../util';

import './index.scss';

const PREFIX = 'detail-table';
const EMPTY_PREFIX = `${PREFIX}-empty`;
const ITEM_PREFIX = `${PREFIX}-container-item`;
const emptySrc = 'https://img14.360buyimg.com/imagetools/jfs/t1/129925/9/12107/31518/5f83c943E94b00976/7f5435143d1b0c2a.png';
const jdSrc = 'https://img14.360buyimg.com/imagetools/jfs/t1/140041/16/10530/940/5f83f26bE63a88b14/b0dc01d29733d9a3.png';
const arrowRight = 'https://img13.360buyimg.com/imagetools/jfs/t1/137046/31/12130/417/5f8413cbE4e699467/ea0b238df26e0205.png';
const imgSrc = {
    ellipseSrc: 'https://img13.360buyimg.com/imagetools/jfs/t1/151062/34/2801/391/5f84040aE1137394a/61247b77294ed09b.png'
}

type pageOwnProps = {
    data?: Array<any>,
    goodsField?: string,
    refreshing?: boolean;
    onEndReached: Function;
    onRefresh: Function;
}

class DetailList extends Component<pageOwnProps> {

    static defaultProps = {
        noMoreShow: false,
        goodsField: 'partnerCentCommissionOrderSkuVoList',
        ListFooterComponent: () => {
            return (
                <View
                    style={{ marginTop:10, paddingBottom: 50, justifyContent: "center", alignItems: "center" }}
                >
                    <Text style={{ color: "#C8C8C8", fontSize: 12 }}>～没有更多数据了～</Text>
                </View>
            );
        }
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    renderTitle = (item) => {
        const { shopName, statusDesc } = item;
        return (
            <View className={`${ITEM_PREFIX}-title`}>
                <Image className={`${ITEM_PREFIX}-title-icon`} src={jdSrc} />
                <View className={`${ITEM_PREFIX}-title-shop`}>
                    <Text className={`${ITEM_PREFIX}-title-shop-name`} numberOfLines={1}>{shopName}</Text>
                    <Image className={`${ITEM_PREFIX}-title-shop-icon`} src={arrowRight} />
                </View>
                <Text className={`${ITEM_PREFIX}-title-status`}>{statusDesc}</Text>
            </View>
        );
    }

    renderBaseline = () => {
        return (
            <View className={`${ITEM_PREFIX}-baseline`}>

            </View>
        );
    }

    renderContentOrder = (item) => {
        const { dealId, occurTime } = item;
        return (
            <View className={`${ITEM_PREFIX}-content-order`}>
                <Text className={`${ITEM_PREFIX}-content-order-text`}>{`订单号${dealId}`}</Text>
                <Text className={`${ITEM_PREFIX}-content-order-text ${ITEM_PREFIX}-content-order-left`}>{occurTime}</Text>
            </View>
        );
    }

    renderContentClient = (item) => {
        const { companyName } = item;
        return (
            <View className={`${ITEM_PREFIX}-content-client`}>
                <Text className={`${ITEM_PREFIX}-content-client-label`}>客户名称</Text>
                <Text className={`${ITEM_PREFIX}-content-client-text`}>{companyName}</Text>
            </View>
        );
    }

    filterGoods = (goodsData) => {
        const length = goodsData.length;
        if (length < 4) return goodsData;
        return goodsData.slice(0, 4);
    }

    renderEllipse = goodsData => {
        if (!Array.isArray(goodsData) || (Array.isArray(goodsData) && !goodsData.length)) {
            return null;
        }

        return (
            <View className={`${ITEM_PREFIX}-content-pics-ellipse`}>
                <Image className={`${ITEM_PREFIX}-content-pics-ellipse-img`} src={imgSrc.ellipseSrc}></Image>
            </View>
        );
    }

    getInitGoodData = (item) => {
        const { goodsField } = this.props;
        const { [goodsField]: goodsData } = item;
        return goodsData;
    }

    renderPics = (item) => {
        const goodsData = this.getInitGoodData(item);
        const resData = this.filterGoods(goodsData);
        return (
            <View className={`${ITEM_PREFIX}-content-pics`}>
                {
                    resData.map(goodsItem => {
                        const { id, img } = goodsItem;
                        const imgSrc = img ? `https://img11.360buyimg.com/img/${img}` : DEFAULT_BG;
                        return (
                            <View className={`${ITEM_PREFIX}-content-pics-container`} key={id}>
                                <Image className={`${ITEM_PREFIX}-content-pics-container-img`} src={imgSrc} />
                            </View>
                        );
                    })
                }
                { resData.length > 3 && this.renderEllipse(goodsData)}
            </View>
        );
    }

    renderFooter = (item) => {
        const goodsData = this.getInitGoodData(item);
        const { commission } = item;
        return (
            <View className={`${ITEM_PREFIX}-content-footer`}>
                <Text className={`${ITEM_PREFIX}-content-footer-amount ${ITEM_PREFIX}-content-footer-common`}>{`共${goodsData.length}种分佣商品`}</Text>
                <Text className={`${ITEM_PREFIX}-content-footer-common`}>预估佣金：</Text>
                <Text className={`${ITEM_PREFIX}-content-footer-money`}>{`¥${handleAmout(commission)}`}</Text>
            </View>
        );

    }

    renderContent = (item) => {

        return (
            <View className={`${ITEM_PREFIX}-content`}>
                {this.renderContentOrder(item)}
                {this.renderContentClient(item)}
                {this.renderPics(item)}
                {this.renderFooter(item)}
            </View>
        );
    }

    onItemClick = (item) => () => {
        const url = '/pages/Details/components/OrderDetail/index';
        // 跳转到详情页面
        Taro.navigateTo({
            url: parseUrl(url, { prePage: JSON.stringify(item) }),

        })
    }

    renderItem = (item) => {
        return (
            <View className={ITEM_PREFIX} onClick={this.onItemClick(item)}>
                { this.renderTitle(item)}
                { this.renderBaseline()}
                { this.renderContent(item)}
            </View>
        );
    }


    ListEmptyComponent = () => {
        return (
            <View className={EMPTY_PREFIX}>
                <View className={`${EMPTY_PREFIX}-img`}>
                    <Image className={`${EMPTY_PREFIX}-img-icon`} src={emptySrc} />
                </View>
                <View className={`${EMPTY_PREFIX}-content`}>
                    <Text className={`${EMPTY_PREFIX}-content-text`}>暂无相关明细结果哦~</Text>
                </View>
            </View>
        );
    }

    ListFooterComponent = () => {
        const { data, noMoreShow, ListFooterComponent } = this.props;
        if (data.length > 0 && noMoreShow && ListFooterComponent && typeof ListFooterComponent === "function") {
            return ListFooterComponent();
        };
        return <View style={{ height: 15 }}></View>;
    };

    render() {
        const { refreshing, data, onEndReached, onRefresh } = this.props;
        return (
            <View className={PREFIX}>
                <View className={`${PREFIX}-container`}>
                    <FlatList
                        data={data}
                        renderItem={({ item }) => this.renderItem(item)}
                        keyExtractor={item => item.id}
                        onEndReachedThreshold={0.01}
                        onEndReached={onEndReached}
                        ListEmptyComponent={this.ListEmptyComponent}
                        ListFooterComponent={this.ListFooterComponent}
                        refreshControl={
                            <RefreshControl
                                tintColor='#F23030'
                                title='刷新...'
                                titleColor='#666666'
                                // colors={["#ff0000", "#00ff00", "#0000ff"]}
                                // progressBackgroundColor='#F23030'
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    />
                </View>
            </View>
        );
    }
}

export default DetailList;
