import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
// import { UUID } from '@/utils/utils';
import { Gradient  } from '@/components';
import { ServiceItem, Price } from './components';


import './index.scss';

const clsPre = 'search-drawer';
const clsService = `${clsPre}-service`;

type PageOwnProps = {
    onClick: (param) => any
}

interface ServiceData {
    type: string,
    active?: boolean
}

type PageOwnState = {
    serviceData: Array<ServiceData>,
    lowPrice: number|undefined,
    highPrice: number|undefined
}



class SearchDrawer extends Component<PageOwnProps, PageOwnState> {
    constructor(props) {
        super(props);
        this.state = {  
            serviceData: [
                { type: 'selfTrade', active: false },
                { type: 'purchase', active: false },
                { type: 'hasStore', active: false },
                { type: 'send', active: false },
            ],
            lowPrice: undefined,
            highPrice: undefined
        };
    }

    onServieClick = (data: ServiceData) => {
        console.log("service data", data);
        const { type }  =data;
        const { serviceData } = this.state;
        const res = serviceData.map(item => {
            const { type: innerType } = item;
            return innerType === type ? { ...data } : item;
        });
        this.setState({ serviceData: [...res]})
    }

    renderService = () => {
        const { serviceData: [ selfTrade, purchase, storeData, sendData ] = [] } = this.state;
        return (
            <View className={`${clsService}`}>
                <View>
                    <Text className={`${clsService}-text`}>京采服务</Text>
                </View>
                <View className={`${clsService}-content`}>
                    <ServiceItem  text='京东自营' onClick={this.onServieClick} data={selfTrade} />
                    <ServiceItem  text='已建采' onClick={this.onServieClick} data={purchase} />
                    <ServiceItem  text='仅看有货' onClick={this.onServieClick} data={storeData} />
                    <ServiceItem  text='可配送' my-cls='mt20' className='mt20' onClick={this.onServieClick} data={sendData} />
                </View>
                { this.renderPrice()}
            </View>
        );
    }

    renderBtns = () => {
        return (
            <View className={`${clsPre}-btns`}>
                <View className={`${clsPre}-btns-btn`}>
                    <Text className={`${clsPre}-reset`}>重置</Text>
                </View>
                <Gradient
                    colors={['#689FF6', '#4381E5']}
                    my-class={`${clsPre}-btns-gradient ${clsPre}-btns-btn`}
                    className={`${clsPre}-btns-btn`}
                >
                    <Text className={`${clsPre}-btns-sure-text`}>确定</Text>
                </Gradient>
                
            </View>
        );
    }

    onLowPrice = (e) => {
        console.log(e);
    }

    onHighPrice = () => {

    }

    renderPrice = () => {
        const { lowPrice, highPrice} = this.state;
        return (
            <View className={`${clsService}-price`}>
                <Text className={`${clsService}-text`}>价格区间</Text>
                <View className={`${clsService}-price-content`}>
                    <Price placeholder='最低价' onInput={this.onLowPrice} value={lowPrice} />
                    <View className={`${clsService}-price-delimiter`}></View>
                    <Price placeholder='最高价' onInput={this.onHighPrice} value={highPrice} />
                </View>
            </View>
        )
    }

    renderCondition = () => {
        return (
            <View className={`${clsPre}-condition`}>
                
            </View>
        );
    }

    render() {
        return (
            <View className={clsPre}>
                { this.renderService()}
                { this.renderCondition()}
                { this.renderBtns()}
            </View>
        );
    }
}

export default SearchDrawer;