import { ComponentClass } from "react";
import Taro, { Component, Config } from "@tarojs/taro";

import { View, Platform } from "react-native";
import { JDNativeSystem } from "@jdreact/jdreact-core-lib";

type baseProps = {
  noBgColor?: boolean;
};

export default class PageFooter extends Component<baseProps, any> {

  static defaultProps = {
    noBgColor: false
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { noBgColor } = this.props;
    let ele;
    if (JDNativeSystem.statusBarHeight === 20 || Platform.OS !== "ios") {
      ele = null;
    } else {
      ele = <View style={{ height: 34, backgroundColor: noBgColor ? "transparent" : "#fff" }}></View>;
    };
    
    return ele;
  }
}