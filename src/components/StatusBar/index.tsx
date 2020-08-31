import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./index.scss";

interface Option {
    noBgColor?: boolean;
}

export default class TopBar extends Component<Option, any> {
    static defaultProps = {
        noBgColor: false
    };
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
        const { noBgColor } = this.props;
        const conClassName = noBgColor ? "status-bar-noBgColor" : "status-bar";

        const styleStr = {
            height: statusBarHeight
        };

        return (
            <View className={conClassName} style={styleStr}>
            </View>
        );
    }
}
