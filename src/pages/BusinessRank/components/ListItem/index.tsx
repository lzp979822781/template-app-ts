import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { Modal, Gradient } from '@/components';
import { DEFAULT_BG } from '../../utils'
import './index.scss';

const PREFIX = 'buslist-item';

const imgObj = {
    0: 'https://img12.360buyimg.com/imagetools/jfs/t1/130920/22/17145/1149/5fbb7354Ece5ebbf5/a3fc9f87b5c90fdd.png',
    1: 'https://img11.360buyimg.com/imagetools/jfs/t1/138123/26/15568/1148/5fbb73acE80cd86f9/23676c2a37143357.png',
    2: 'https://img11.360buyimg.com/imagetools/jfs/t1/132797/29/17112/1101/5fbb73cdE8c3500b7/e1e465eb3361f05e.png',
    3: 'https://img14.360buyimg.com/imagetools/jfs/t1/122888/28/19521/1141/5fbb73efE62ecfc87/1da9080f5ad8b3f7.png',
    modalClose: 'https://img11.360buyimg.com/imagetools/jfs/t1/126321/32/20120/483/5fc0a60dE7572aa60/80facbc37f1145e7.png',
};

interface ItemProps {
    img: string|undefined
}

interface PageOwnProps {
    data: ItemProps,
    dataIndex: number
}

interface PageOwnSate {
    showModal: boolean
}

class ListItem extends Component<PageOwnProps, PageOwnSate> {
    constructor(props) {
        super(props);
        this.state = {  
            showModal: false
        };
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

    onRecommond = () => {
        this.setState({ showModal: true })
    }

    renderBottomButton = () => {
        return (
            <View className={`${PREFIX}-bottom-container`}>
                <View className={`${PREFIX}-bottom-btn`} onClick={this.onRecommond}>
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

    onClose = () => {
        this.setState({ showModal: false })
    }

    onConfirm = () => {

    }

    renderHeader = () => {
        return (
            <View className={`${PREFIX}-modal-header`}>
                <Text className={`${PREFIX}-modal-header-text`}>微信好友分享</Text>
            </View>
        );
    }

    renderClose = () => {
        return (
            <View className={`${PREFIX}-modal-close`} onClick={this.onClose}>
                <Image className={`${PREFIX}-modal-close-img`} src={imgObj.modalClose} />
            </View>
        );
    }

    renderModalContent = () => {

        const text = `由于微信分享限制，可以通过口令的方式分享商品，好友复制口令后打开药京采，可直接查看`;
        return (
            <View className={`${PREFIX}-modal-content-container`}>
                <Text className={`${PREFIX}-modal-content-container-text`}>{text}</Text>
            </View>
        );
    }

    onShare = () => {
        // 复制口令功能
    }

    renderShareBtn = () => {
        return (
            <View className={`${PREFIX}-modal-btn`} onClick={this.onShare}>
                <Gradient
                    className={`${PREFIX}-modal-btn-gradient`}
                    angle={0}
                    colors={["#EC1B1B", "#FF511D"]}
                >
                    <Text className={`${PREFIX}-modal-btn-text`}>复制口令给好友</Text>
                </Gradient>
            </View>
        );
    }

    renderContent = () => {
        return (
            <View className={`${PREFIX}-modal-content`}>
                { this.renderHeader()}
                { this.renderModalContent()}
                { this.renderShareBtn()}
                { this.renderClose()}
            </View>
        );
    }

    renderModal = () => {
        const { showModal } = this.state;

        return (
            <Modal
                className={`${PREFIX}-modal`}
                visible={showModal}
                onCancel={this.onClose}
                onConfirm={this.onConfirm}
                // eslint-disable-next-line taro/render-props
                renderContent={this.renderContent()}
                customFooter
                customHeader
            />
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

                {/* 渲染弹框 */}
                { this.renderModal()}
            </View>
        );
    }
}

export default ListItem;