import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.scss";

export default class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusBarHeight: "20px"
    };
  }
  componentWillMount() {
    const res = Taro.getSystemInfoSync();
    debugger
    this.setState({
        statusBarHeight: res.statusBarHeight
    })
  }

  render() {
    const {statusBarHeight} = this.state;
    const styleStr= `height: ${statusBarHeight}`
    return <View className="status-bar-height" style={styleStr}><Text>{styleStr}</Text></View>;
  }
}