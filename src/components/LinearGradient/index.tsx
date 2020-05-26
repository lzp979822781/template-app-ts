import React, { ComponentClass } from "react";
import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.scss";

interface ListOption {
    children: any;
}

class LinearGradient extends Component<ListOption, any> {
    static defaultProps = {
        className: "demo-view"
    };

    constructor(props: ListOption) {
        super(props);
    }

    render() {
        return (
            <View className={this.props.className}>
                {this.props.children}
            </View>
        );
    }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default LinearGradient;
