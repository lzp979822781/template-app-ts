import Taro, { Component } from "@tarojs/taro";
import { ScrollView, View, Text } from "@tarojs/components";

class BusinessRank extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <View>
                <Text>商家排行</Text>
            </View> 
        );
    }
}

export default BusinessRank;