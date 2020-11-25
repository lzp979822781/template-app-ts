import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import classnames from 'classnames';
import { DEFAULT_BG } from '../../utils'
import './index.scss';

const PREFIX = 'buslist-item';

const imgObj = {
    0: 'https://img12.360buyimg.com/imagetools/jfs/t1/130920/22/17145/1149/5fbb7354Ece5ebbf5/a3fc9f87b5c90fdd.png',
    1: 'https://img11.360buyimg.com/imagetools/jfs/t1/138123/26/15568/1148/5fbb73acE80cd86f9/23676c2a37143357.png',
    2: 'https://img11.360buyimg.com/imagetools/jfs/t1/132797/29/17112/1101/5fbb73cdE8c3500b7/e1e465eb3361f05e.png',
    3: 'https://img14.360buyimg.com/imagetools/jfs/t1/122888/28/19521/1141/5fbb73efE62ecfc87/1da9080f5ad8b3f7.png'
};

interface ItemProps {
    img: string|undefined
}

interface PageOwnProps {
    data: ItemProps,
    dataIndex: number
}

class ListItem extends Component<PageOwnProps> {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    isNumber = (param) => typeof param === 'number' 

    renderGap = () => {
        return (
            <View className={`${PREFIX}-top-right-desc-gap`}></View>
        );
    }

    renderTopRightDesc = () => {
        const variety = 453;
        const amount = 1000;
        return (
            <View className={`${PREFIX}-top-right-desc`}>
                <View className={`${PREFIX}-top-right-desc-variety`}>
                    <Text className={`${PREFIX}-top-right-desc-variety-text`}>上架品种{`${ this.isNumber(variety) ? variety : '--'}`}</Text>
                </View>
                { this.renderGap()}
                <View className={`${PREFIX}-top-right-desc-amount`}>
                    <Text className={`${PREFIX}-top-right-desc-amount-text`}>{`起送金额${this.isNumber(amount) ? amount: '--' }元`}</Text>
                </View>

                
            </View>
        )
    }

    renderTopRightArea = () => {
        const text = '北京、天津、上海、广州、重庆、成都' || '--';
        return (
            <View className={`${PREFIX}-top-right-area`}>
                <Text className={`${PREFIX}-top-right-area-text`} numberOfLines={1}>{`经营区域: ${text}`}</Text>
            </View>
        );
    }

    renderRight = () => {
        return (
            <View className={`${PREFIX}-top-right`}>
                <View className={`${PREFIX}-top-right-title`}>
                    <Text className={`${PREFIX}-top-right-title-text`} numberOfLines={1}>天津医药集团太平医药限公司</Text>
                </View>

                { this.renderTopRightDesc()}
                { this.renderTopRightArea()}
            </View>
        );
    }

    renderStaticticsGap = () => {
        return (
            <View className={`${PREFIX}-statistics-delimeter`}>

            </View>
        );
    }

    renderStatistics = () => {
        const analyseData = {
            alreayOrdered: { label: '已下单', value: 2000}, 
            delivery: { label: '已出库', value: 20000}, 
            orderClientNum: { label: '下单客户数', value: 2000}, 
            customerPrice: { label: '客单价', value: 2000}, 
            customAverage: { label: '客均价', value: 2000}, 
        };
        return (
            <View className={`${PREFIX}-statistics`}>
                { this.renderLittleCard(analyseData.alreayOrdered)}
                { this.renderStaticticsGap() }
                { this.renderLittleCard(analyseData.delivery) }
                { this.renderStaticticsGap() }
                { this.renderLittleCard(analyseData.orderClientNum) }
                { this.renderStaticticsGap() }
                { this.renderLittleCard(analyseData.customerPrice) }
                { this.renderStaticticsGap() }
                { this.renderLittleCard(analyseData.customAverage) }
            </View>
        );
    }

    renderLittleCard = (item) => {
        const { label, value } = item;
        return (
            <View className={`${PREFIX}-statistics-card`}>
                <View className={`${PREFIX}-statistics-card-value`}><Text className={`${PREFIX}-statistics-card-value-text`}>{value}</Text></View>
                <View className={`${PREFIX}-statistics-card-label`}><Text className={`${PREFIX}-statistics-card-label-text`}>{label}</Text></View>
            </View>
        );
    }

    renderBottomButton = () => {
        return (
            <View className={`${PREFIX}-bottom-container`}>
                <View className={`${PREFIX}-bottom-btn`}>
                    <Text className={`${PREFIX}-bottom-btn-text`}>推荐</Text>
                </View>
            </View>
        );
    }

    renderBottomDelimeter = () => {
        return (
            <View className={`${PREFIX}-statistics-delimeter`}>

            </View>
        );
    }

    renderTop = () => {
        const { data: { img } } = this.props;
        const imgSrc = img || DEFAULT_BG;
        return (
            <View className={`${PREFIX}-top`}>
                <View className={`${PREFIX}-top-left`}>
                    <Image className={`${PREFIX}-top-left-img`} src={imgSrc} />
                </View>
                { this.renderRight()}
            </View>
        )
    }

    renderDelimeter = () => {
        return (
            <View className={`${PREFIX}-delimeter`}>

            </View>
        );
    }

    renderRankIcon = () => {
        const { dataIndex } = this.props;
        const isNumber = typeof dataIndex === 'number';
        if( !isNumber || (isNumber && dataIndex > 3)) {
            return null;
        }
        return (
            <View className={`${PREFIX}-rank-icon`}>
                <Image className={`${PREFIX}-rank-icon-img`} src={imgObj[dataIndex]} />
            </View>
        );
    }

    renderRankText = () => {
        const { dataIndex } = this.props;
        const isNumber = typeof dataIndex === 'number';
        if( !isNumber || (isNumber && dataIndex > 3)) {
            return null;
        }
        return (
            <View className={`${PREFIX}-rank-icon`}>
                <Text className={`${PREFIX}-rank-icon-text`}>{dataIndex + 1}</Text>
            </View>
        );
    }

    render() {
        return (
            <View className={PREFIX}>
                { this.renderTop()}
                { this.renderDelimeter()}
                {/* 统计数据 */}
                { this.renderStatistics()}
                {/* 推荐按钮 */}
                { this.renderBottomButton()}
                { this.renderRankIcon() }
                { this.renderRankText()}
            </View>
        );
    }
}

export default ListItem;