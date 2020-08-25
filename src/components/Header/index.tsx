import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";

import "./index.scss";

interface ListOption {
    title?: string;
}

class Header extends Component<ListOption, any> {
    static defaultProps = {
        title: "标题"
    };

    constructor(props: ListOption) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View className="header-con">
                <View className="back-con">
                    <Image
                        src={"../../img/back.png"}
                    />
                </View>
                <View className="title-con">
                    <Text className="title-txt">{this.props.title}</Text>
                </View>
                <View className="handle-con">
                    <Text className="handle-txt">搜索</Text>
                </View>
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

export default Header;
