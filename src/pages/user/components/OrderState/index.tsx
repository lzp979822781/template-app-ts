import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import './index.scss';

type PageOwnProps = {
    img: string,
    text: string,
    onClick?: () => any
}

class OrderState extends Component<PageOwnProps> {


    render() {
        const { img, text, onClick } = this.props;
        console.log("img", img);
        return (
            <View className='order-state' onClick={onClick}>
                <Image src={img} className='order-state-image' />
                <View className='order-state-content'>
                    <Text className='order-state-content-text'>{text}</Text>
                </View>
            </View>
        )
    }
}

export default OrderState;