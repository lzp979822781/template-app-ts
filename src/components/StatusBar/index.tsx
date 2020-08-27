import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.scss";

interface Option {
}

export default class TopBar extends Component<Option, any> {
    constructor(props) {
        super(props);
        this.state = {
            statusBarHeight: "20px"
        };
    }
    componentWillMount() {
        const res = Taro.getSystemInfoSync();
        this.setState({
            statusBarHeight: res.statusBarHeight
        });
    }

    render() {
        const { statusBarHeight } = this.state;

        const styleStr = {
            height: statusBarHeight
        };

        const styleStr2 = {
            color: "#FFFFFF"
        };

        return (
            <View className="status-bar-height" style={styleStr}>
                <Text style={styleStr2}>{statusBarHeight}</Text>
            </View>
        );
    }
}
