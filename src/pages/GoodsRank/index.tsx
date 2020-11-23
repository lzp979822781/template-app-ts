import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";

class GoodsRank extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <View>
                <Text>商品排行</Text>
            </View> 
        );
    }
}

export default GoodsRank;