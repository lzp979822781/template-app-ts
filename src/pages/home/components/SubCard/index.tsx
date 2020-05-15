import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';

import './index.scss';

type PageProps = {
    title: string,
    description: string,
    showGo?: boolean,
    src?: any,
    onClick?: () => void,
    customStyle?: object
};

type PageState = {
    
}

const defaultProps = {
    showGo: true,
    onClick: () => {},
    customStyle:{ backgroundColor: '#F7F8FB'}
}

class BaseCard extends Component< PageProps, PageState> {

    static externalClasses = ['custom-cls']
    static defaultProps = defaultProps;

    render() {
        const { title, description, src, customStyle } = this.props;

        return (
            <View className='subcard custom-cls' style={customStyle}>
                <View className='subcard-title-container'><Text className='subcard-title-txt'>{title}</Text></View>
                <View className='subcard-desc-container'><Text className='subcard-desc-txt'>{description}</Text></View>
                <View className='subcard-footer'>
                    <Image src={src} className='subcard-footer-image' />
                </View>
            </View>
        )
    }
}

export default BaseCard;