import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import arrowRight from '@/assets/images/arrowright.png'; 
import { DrugTag} from '../components';

import './index.scss';

interface ItemData {
    imgSrc: string,
    selfSku: boolean,
    title: string,
    subTitle: string,
    spec: string,
    minPrice: number|string,
    maxPrice: number|string,
    isReduce: boolean,
    secKill: boolean,
    saleShopNum: number
}

type PageOwnProps = {
    itemData: ItemData,
    onItemClick?: (data?: ItemData|undefined) => void
};

type PageOwnState = {

}

const defaultProps = {
    itemData: {},
    onItemClick: () => {}
}

class DrugItem extends Component<PageOwnProps, PageOwnState> {

    static defaultProps = defaultProps;

    
    getFieldVal = field => {
        const { itemData } = this.props;
        return itemData[field];
    }

    onClick = () => {
        const { itemData, onItemClick } = this.props;
        if(onItemClick) {
            onItemClick(itemData)
        }
    }

    renderSelfSku = () => {
        const selfSku = this.getFieldVal("selfSku");
        if(!selfSku) return null;
        return (
            <View className='drug-content-title-selfsku'>
                <Text className='drug-content-title-selfsku-txt'>自营</Text>
            </View>
        )
    }

    /**
     * 渲染是否满减
     */
    renderReduce = () => {
        const secKill = this.getFieldVal("secKill");
        if(!secKill) return null;
        return (
            <View className='drug-content-price-seckill'>
                <Text>满减</Text>
            </View>
        );
    }

    renderContent = () => {
        const { itemData: { title, subTitle, spec, minPrice, maxPrice, isReduce, secKill,  saleShopNum } } = this.props;
        return (
            <View className='drug-content'>
                <View className='drug-content-title-container'>
                    { this.renderSelfSku()}
                    <View className='drug-content-title-txt-container'>
                        <Text className='drug-content-title-txt' numberOfLines={1}>{title}</Text>
                    </View>
                </View>
                <View className='drug-content-subtitle-container'>
                    <Text className='drug-content-subtitle-txt'>{subTitle}</Text>
                </View>
                <View className='drug-content-spec-container'>
                    <View className='drug-content-spec-container-child'>
                        <Text className='drug-content-spec-txt'>{`规格:${spec}`}</Text>
                    </View>
                </View>
                <View className='drug-content-price-container'>
                    <Text className='drug-content-price-txt'>{`￥${minPrice}-${maxPrice}`}</Text>
                    <DrugTag 
                        text={isReduce ? '满减': ''} 
                        custom-cls='drug-content-price-tag'
                        rnStyle={{ marginLeft: 4 }}
                    />
                    <DrugTag 
                        text={secKill ? '秒杀': ''} 
                        custom-cls='drug-content-price-tag'
                        rnStyle={{ marginLeft: 4 }} 
                    />
                </View>
                <View className='drug-content-shop' onClick={this.onClick}>
                    <Text className='drug-content-shop-txt'>{`该区域共${saleShopNum}个商家在售`}</Text>
                    <Image src={arrowRight} className='drug-content-shop-image' />
                </View>

            </View>
        )
    }
    
    renderImage = () => {
        return (
            <View>
                <Image src={this.getFieldVal('imgSrc')}  className='drug-image' />
            </View>
        )
    }
    render() {
        return (
            <View className='drug'>
                {/* <Text>药品Item</Text> */}
                { this.renderImage()}
                { this.renderContent()}
            </View>
        )
    }
}

export default DrugItem;