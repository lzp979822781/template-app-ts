import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';

import './index.scss';

type PageProps = {
    title: string,
    description: string,
    showGo?: boolean,
    src?: any,
    onClick?: () => void,
    mainTitleStyle?: object,
    subTitleStyle?: object,
    appendConStyle?: object,
    appendTxtStyle?: object,
    customStyle?: object
};

type PageState = {
    
}

const defaultProps = {
    showGo: true,
    onClick: () => {},
    mainTitleStyle: { color: '#333840'},
    subTitleStyle: { color: '#989CA5' },
    appendConStyle: { backgroundColor: '#4381E5'},
    appendTxtStyle: { color: '#fff'},
    customStyle:{ backgroundColor: '#F7F8FB'}
}

class BaseCard extends Component< PageProps, PageState> {

    static externalClasses = ['custom-cls']
    static defaultProps = defaultProps;

    render() {
        const { title, description, showGo, src, onClick, customStyle, mainTitleStyle, subTitleStyle, appendConStyle, appendTxtStyle } = this.props;

        return (
            <View className='basecard custom-cls' style={customStyle}>
                <View className='basecard-title-container'><Text className='basecard-title-txt' style={mainTitleStyle}>{title}</Text></View>
                <View className='basecard-desc-container'><Text className='basecard-desc-txt' style={subTitleStyle}>{description}</Text></View>
                <View className='basecard-footer'>
                    <View className='basecard-footer-container'>
                        { showGo ? (
                            <View className='basecard-footer-container-container' onClick={onClick} style={appendConStyle}>
                                <Text className='basecard-footer-container-txt' style={appendTxtStyle}>Go</Text>
                            </View>
                        ): null}
                    </View>
                    {src ? <Image src={src} className='basecard-footer-container-img' /> : null}
                    
                </View>
            </View>
        )
    }
}

export default BaseCard;