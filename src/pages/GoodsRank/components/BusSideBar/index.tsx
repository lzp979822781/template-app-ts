import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";

import './index.scss';

const PREFIX = 'bus-rank';

class BusSideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    render() {
        return (
            <View className={PREFIX}>
                <Text>侧边栏</Text>
            </View> 
        );
    }
}

export default BusSideBar;