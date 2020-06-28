import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import './index.scss';

type PageOwnProps = {
    onClick?: () => any,
    src: string,
    text: string
}

class GridItem extends Component<PageOwnProps> {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        const { onClick, src, text } = this.props;

        return (
            <View className='grid-item' onClick={onClick}>
                <View className='grid-item-icon-wrapper'><Image src={src} className='grid-item-icon-img' /></View>
                <View className='grid-item-content'>
                    <Text className='grid-item-content-text'>{text}</Text>
                </View>
            </View>
        );
    }
}

export default GridItem;