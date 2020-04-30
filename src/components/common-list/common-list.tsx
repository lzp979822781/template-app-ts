import Taro, { Component, Config } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import './index.scss';

class CommonList extends Component {
    static defaultProps = {

    };

    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <View><Text>1222</Text></View>
        );
    }
}

export default CommonList;