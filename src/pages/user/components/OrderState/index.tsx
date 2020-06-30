import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { Badge } from '@/components';
import LinearBadge from '../LinearBadge';

import './index.scss';

type PageOwnProps = {
    img: string,
    text: string,
    badgeValue?: number|string,
    onClick?: () => any
}

class OrderState extends Component<PageOwnProps> {

    renderCustom = () => {
        const { badgeValue } = this.props;
        if(!badgeValue) return null;
        /* return (
            <View className='order-state-badge'>
                <Text className='order-state-badge-text'>{badgeValue}</Text>
            </View>
        ) */
        /* return (
            <LinearGradient
                direction='row'
                height={32}
                style={{ width: 32, height: 32, borderRadius: 16}}
                colors={[ '#F96E70', '#ED5458' ]}
            >
                
            </LinearGradient>
        ) */
        return (
            <LinearBadge
                my-class='order-state-gradient'
                colors={[ '#F96E70', '#ED5458' ]}
                className='order-state-gradient'
            >
                <Text className='order-state-gradient-text'>{badgeValue}</Text>
            </LinearBadge>
        )
    }

    renderBadge = () => {
        const { badgeValue, img } = this.props;
        const customBadge = this.renderCustom();
        return (
            <Badge 
                value={badgeValue} 
                rnStyle={{ marginTop: 5 }} 
                // eslint-disable-next-line taro/render-props
                renderBadge={customBadge}
                custom
            >
                <Image src={img} className='order-state-image' />
            </Badge>
        );
    }


    render() {
        const { text, onClick } = this.props;
        return (
            <View className='order-state' onClick={onClick}>
                {/* <Image src={img} className='order-state-image' /> */}
                { this.renderBadge()}
                <View className='order-state-content'>
                    <Text className='order-state-content-text'>{text}</Text>
                </View>
            </View>
        )
    }
}

export default OrderState;