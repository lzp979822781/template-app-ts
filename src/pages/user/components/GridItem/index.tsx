import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { Badge } from '@/components';
import LinearBadge from '../LinearBadge';
import './index.scss';

type PageOwnProps = {
    onClick?: () => any,
    src: string,
    text: string,
    badgeValue?: number|string,
}

class GridItem extends Component<PageOwnProps> {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    renderCustom = () => {
        const { badgeValue } = this.props;
        if(!badgeValue) return null;
        return (
            <LinearBadge
                my-class='grid-item-gradient'
                colors={[ '#F96E70', '#ED5458' ]}
                className='grid-item-gradient'
            >
                <Text className='grid-item-gradient-text'>{badgeValue}</Text>
            </LinearBadge>
        )
    }

    renderBadge = () => {
        const { badgeValue, src } = this.props;
        const customBadge = this.renderCustom();
        return (
            <Badge 
                value={badgeValue} 
                // eslint-disable-next-line taro/render-props
                renderBadge={customBadge}
                text-class='grid-item-badge-text'
                className='grid-item-badge-text-rn'
                custom
            >
                <Image src={src} className='grid-item-icon-img' />
            </Badge>
        );
    }
    render() {
        const { onClick, text } = this.props;

        return (
            <View className='grid-item' onClick={onClick}>
                {/* <View className='grid-item-icon-wrapper'><Image src={src} className='grid-item-icon-img' /></View> */}
                <View className='grid-item-icon-wrapper'>
                    { this.renderBadge()}
                </View>
                <View className='grid-item-content'>
                    <Text className='grid-item-content-text'>{text}</Text>
                </View>
            </View>
        );
    }
}

export default GridItem;