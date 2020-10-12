/* eslint-disable @typescript-eslint/no-use-before-define */
import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";

export default class Triangle extends Component<any, any> {
  static defaultProps = {
    title: "标题",
  };
  constructor(props) {
    super(props);
  }

  render() {
    return <View></View>
  }
}