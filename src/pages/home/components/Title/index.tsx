import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';

import './index.scss';

const arrowRight = 'https://img10.360buyimg.com/imagetools/jfs/t1/150044/30/5372/430/5f34ef8fE160c5191/d8d488805d680d91.png';

type PageProps = {
    title: string,
    description?: string,
    more?: string,
    onMoreClick?: () => void
};

type PageState = {

}

const defaultProps = {
    more: '更多活动',
    onMoreClick: () => {}
}

class Title extends Component< PageProps, PageState> {

    static defaultProps = defaultProps;

    render() {
        const { title, description, more, onMoreClick } = this.props;
        return (
            <View className='title' >
                <View className='title-title-container'><Text className='title-title-text'>{title}</Text></View>
                <View className='title-desc-container'><Text className='title-desc-text'>{description}</Text></View>
                <View className='title-more-container' onClick={onMoreClick}>
                    <Text className='title-more-text'>{more}</Text>
                    <Image src={arrowRight} className='title-more-image' />
                </View>
            </View>
        )
    }
}

export default Title;