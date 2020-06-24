import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

import './index.scss';

class Cart extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <View>
                <Text>购物车</Text>
            </View>
        );
    }
}

export default Cart;