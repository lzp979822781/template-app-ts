/* eslint-disable @typescript-eslint/no-use-before-define */
import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { StyleSheet, Platform } from 'react-native';

export default class Triangle extends Component<any, any> {
  static defaultProps = {
    title: "标题",
    type: "none" // none, top, bottom
  };
  constructor(props) {
    super(props);
  }

  render() {
    const { type } = this.props;
    if(type==="top"){
      return (
          <View style={styles.container}>
              <View style={[styles.triangleUp, styles.triangleUpActive]}></View>
              <View style={styles.triangleDown}></View>
          </View>
      );
    }else if(type==="bottom"){
      return (
          <View style={styles.container}>
              <View style={styles.triangleUp}></View>
              <View style={[styles.triangleDown, styles.triangleDownActive]}></View>
          </View>
      );
    }else{
      return (
          <View style={styles.container}>
              <View style={styles.triangleUp}></View>
              <View style={styles.triangleDown}></View>
          </View>
      );
    }
    
  }
}

const styles = StyleSheet.create({
  triangleUp: {
    marginLeft: 5,
    marginTop: 0.5,
    width: 0,
    height: 0,
    borderStyle: "solid",
    borderWidth: 3,
    borderTopColor: "transparent", //下箭头颜色
    borderLeftColor: "transparent", //右箭头颜色
    borderBottomColor: "#979797", //上箭头颜色
    borderRightColor: "transparent", //左箭头颜色
    borderRadius: Platform.OS === 'ios' ? 1 : 0,
    marginBottom: 2
  },
  triangleUpActive: {
    borderTopColor: "transparent", //下箭头颜色
    borderLeftColor: "transparent", //右箭头颜色
    borderBottomColor: "#F23030", //上箭头颜色
    borderRightColor: "transparent", //左箭头颜色
  },
  triangleDown: {
    marginLeft: 5,
    marginTop: 0.5,
    width: 0,
    height: 0,
    borderStyle: "solid",
    borderWidth: 3,
    borderTopColor: "#979797", //下箭头颜色
    borderLeftColor: "transparent", //右箭头颜色
    borderBottomColor: "transparent", //上箭头颜色
    borderRightColor: "transparent", //左箭头颜色
    borderRadius: Platform.OS === 'ios' ? 1 : 0
  },
  triangleDownActive: {
    borderTopColor: "#F23030", //下箭头颜色
    borderLeftColor: "transparent", //右箭头颜色
    borderBottomColor: "transparent", //上箭头颜色
    borderRightColor: "transparent", //左箭头颜色
  },
  container: {
    justifyContent: "center",
    alignItems: "center"
  }
});
