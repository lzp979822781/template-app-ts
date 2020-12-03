import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { Modal, Gradient } from '@/components';
import { DEFAULT_BG, getRemainder } from '../../utils'
import './index.scss';

const PREFIX = 'buslist-item';
const DATEPREFIX= `${PREFIX}-top-right-desc`;
const AMOUNTPREFIX= `${PREFIX}-top-right-amount`;

const imgObj = {
    0: 'https://img12.360buyimg.com/imagetools/jfs/t1/130920/22/17145/1149/5fbb7354Ece5ebbf5/a3fc9f87b5c90fdd.png',
    1: 'https://img11.360buyimg.com/imagetools/jfs/t1/138123/26/15568/1148/5fbb73acE80cd86f9/23676c2a37143357.png',
    2: 'https://img11.360buyimg.com/imagetools/jfs/t1/132797/29/17112/1101/5fbb73cdE8c3500b7/e1e465eb3361f05e.png',
    3: 'https://img14.360buyimg.com/imagetools/jfs/t1/122888/28/19521/1141/5fbb73efE62ecfc87/1da9080f5ad8b3f7.png',
    modalClose: 'https://img11.360buyimg.com/imagetools/jfs/t1/126321/32/20120/483/5fc0a60dE7572aa60/80facbc37f1145e7.png',
    factory: 'https://img12.360buyimg.com/imagetools/jfs/t1/148925/17/16197/860/5fc4947bE7299af40/3c352ade8fd68887.png',
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

    renderRight = () => {
        return (
            <View className={`${PREFIX}-top-right`}>
                <View className={`${PREFIX}-top-right-title`}>
                    <Text className={`${PREFIX}-top-right-title-text`} numberOfLines={2}>抗老露得清醇晚霜抗初老抗皱收缩毛孔保湿面霜40g</Text>
                </View>

                { this.renderFactory()}
                { this.renderDateSpec()}
                { this.renderAmount()}
                { this.renderShop() }
            </View>
        );
    }

    /**
     * 厂家模块
     * @returns
     */
    renderFactory = () => {
        return (
            <View className={`${PREFIX}-top-right-factory`}>
                <Image className={`${PREFIX}-top-right-factory-img`} src={imgObj.factory} />
                <Text className={`${PREFIX}-top-right-factory-text`} numberOfLines={1}>东京购物精华篇日本药妆店便敏东京购物精华篇日本药妆店便敏</Text>
            </View>
        );
    }

    /**
     * 渲染有效期和规格
     */
    renderDateSpec = () => {
        const date = '2020.09.20';
        const spec = '2盒10粒';
        return (
            <View className={`${DATEPREFIX}`}>
                <Text className={`${DATEPREFIX}-text`}>{`有效期至${date}`}</Text>
                <View className={`${DATEPREFIX}-delimeter`}></View>
                <Text className={`${DATEPREFIX}-spec ${DATEPREFIX}-text`}>{`${spec}`}</Text>
            </View>
        );
    }

    renderAmount = () => {
        const amout = 399.80;
        const sale = 248;
        const amoutIsNum = typeof amout === 'number';
        const intAmount = amoutIsNum ? (amout | 0) : '--'; // 取整
        const littleAmount = getRemainder(amout);

        return (
            <View className={`${AMOUNTPREFIX}`}>
                <Text className={`${AMOUNTPREFIX}-sign`}>￥</Text>
                <Text className={`${AMOUNTPREFIX}-intAmount`}>{`${intAmount}`}</Text>
                { littleAmount && <Text className={`${AMOUNTPREFIX}-sign`}>{`.${littleAmount}`}</Text> }
                <Text className={`${AMOUNTPREFIX}-sale`}>{`月销${ typeof sale === 'number' ? sale : '--'}`}</Text>
            </View>
        );
    }

    renderShop = () => {
        const shopName = '北京京东佳康旗舰店';

        return (
            <View className={`${PREFIX}-top-right-shop`}>
                <Text className={`${PREFIX}-top-right-shop-text`} numberOfLines={1}>{shopName}</Text>
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