import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.scss';

type PageOwnprops = {
    children?: any,
    badgeValue?: number|string|undefined,
    colors?: Array<string>,
    className?: string
}

class LinearBadge extends Component<PageOwnprops> {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    static externalClasses = ['my-class']

    render() {
        console.log("this.props", this.props);
        return (
            <View className='my-class gradient-badge'>
                {this.props.children}
            </View>
        );
    }
}

export default LinearBadge;