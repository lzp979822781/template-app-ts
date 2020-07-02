import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.scss';

type PageOwnprops = {
    children?: any,
    colors?: Array<string>,
    className?: string
}

class Gradient extends Component<PageOwnprops> {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    static externalClasses = ['my-class']

    render() {
        return (
            <View className='my-class'>
                {this.props.children}
            </View>
        );
    }
}

export default Gradient;