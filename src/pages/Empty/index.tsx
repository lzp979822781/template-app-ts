import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';

class Empty extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {  };
        Taro.redirectTo({
            url: 'pages/home/Home/index'
        })
    }
    render() {
        return (
            <View>
            </View>
        );
    }
}

export default Empty;