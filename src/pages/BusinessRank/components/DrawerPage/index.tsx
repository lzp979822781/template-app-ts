import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import SelectTitle from '../SelectTitle';
import SelectItem from '../SelectItem';
import './index.scss';

const PREFIX = 'drawer';

class DrawerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            shopData: [
                { label: '药品'},
                { label: '非药'}
            ]
        };
    }

    renderShopRight = () => {
        return (
            <View className={`${PREFIX}-shop-title-right`}>
                <Text className={`${PREFIX}-shop-title-right-text`}>备注: 更新时间T+1</Text>
            </View>
        );
    }

    onShopItemClick = (selectedItem) => () => {
        const { shopData } = this.state;
        const res = shopData.map(item => ({...item, selected: selectedItem.label === item.label}));
        this.setState({ shopData: res})
    }

    renderShopContent = () => {
        const { shopData } = this.state;
        return (
            <View className={`${PREFIX}-shop-content`}>
                {
                    shopData.map(item => {
                        return <SelectItem data={item} onClick={this.onShopItemClick(item)} className={`${PREFIX}-shop-content-item`} />
                    })
                }
                { this.renderEmpty()}
            </View>
        );
    }

    renderEmpty = () => {
        return (
            <View className={`${PREFIX}-item-empty`}></View>
        );
    }

    renderBusinessType = () => {
        return (
            <View className={`${PREFIX}-shop-title`}>
                <SelectTitle title='商家类型' renderRight={() => this.renderShopRight()} />
                { this.renderShopContent()}
            </View>
        );
    }

    render() {
        return (
            <View className={`${PREFIX}`}>
                { this.renderBusinessType()}
            </View>
        );
    }
}

export default DrawerPage;