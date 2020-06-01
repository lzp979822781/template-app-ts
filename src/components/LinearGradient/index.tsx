import React, { ComponentClass } from "react";
import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.scss";

interface ListOption {
    direction: "row" | "column";
    children: any;
    style: object;
}

class LinearGradient extends Component<ListOption, any> {
    static defaultProps = {
        colors: ["#F2140C", "#ffffff"],
        direction: "column",
        height: 40,
        style: {
            "text-align": "center",
        }
    };

    constructor(props: ListOption) {
        super(props);
    }

    render() {
        const { height, direction, colors } = this.props;
        let colorStr = '';
        colors.forEach(item => {
            colorStr += `, ${item}`
        });
        return (
            <View
                style={{
                    ...this.props.style,
                    height: `${height}px`,
                    "line-height": `${height}px`,
                    background: `linear-gradient(to ${
                        direction === "row" ? "right" : "bottom"
                    } ${colorStr})`
                }}
            >
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
