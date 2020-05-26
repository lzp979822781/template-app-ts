import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.scss';


type PageOwnProps = {
    text: string,
    rnStyle?: object,
    className?: string
}

class DrugTag extends Component<PageOwnProps> {

    static externalClasses = ['custom-cls']
    
    render() {
        const { text, rnStyle, className } = this.props;
        if(!text) return null;
        const style = Taro.getEnv() === 'RN' ? rnStyle : {};

        return (
            <View className={`tag custom-cls ${className}`} style={style}>
                <Text className='tag-txt'>{text}</Text>
            </View>
        )
    }
    
}

export default DrugTag;