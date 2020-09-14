import { ComponentClass } from "react";
import Taro, { Component, Config } from "@tarojs/taro";

import { View, Platform } from "react-native";
import { JDNativeSystem } from "@jdreact/jdreact-core-lib";


export default class PageFooter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let ele = null;
    if (JDNativeSystem.statusBarHeight === 20 || Platform.OS !== "ios") {
      ele = null;
    } else {
      ele = <View style={{ height: 34, backgroundColor: "#fff" }}></View>;
    }
    return ele;
  }
}