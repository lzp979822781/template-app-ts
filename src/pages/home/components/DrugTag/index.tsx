import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.scss';


type PageOwnProps = {
    text: string,
    rnStyle?: object
}

class DrugTag extends Component<PageOwnProps> {

    static externalClasses = ['custom-cls']
    
    render() {
        const { text, rnStyle } = this.props;
        if(!text) return null;
        const style = Taro.getEnv() === 'RN' ? rnStyle : {};

        return (
            <View className='tag custom-cls' style={style}>
                <Text className='tag-txt'>{text}</Text>
            </View>
        )
    }
    
}

export default DrugTag;