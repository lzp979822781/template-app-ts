import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import back from "@/assets/images/back@3x.png";
import search from "@/assets/images/search-icon-white@3x.png";
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

    renderLeft = () => {
        if (this.props.renderLeft) {
            return this.props.renderLeft;
        }
        return (
            <View
                className="back-btn"
                onClick={() => {
                    Taro.navigateBack();
                }}
            >
                <Image className="back-img" src={back} />
            </View>
        );
    };
    renderRignt = () => {
        if (this.props.renderRignt) {
            return this.props.renderRignt;
        }

        return null;
        // return (
        //     <View className="handle-btn">
        //         <Image className="handle-img" src={search} />
        //     </View>
        // );
    };

    render() {
        return (
            <View className="header-con">
                <View className="back-con">{this.renderLeft()}</View>
                <View className="title-con">
                    <Text className="title-txt">{this.props.title}</Text>
                </View>
                <View className="handle-con">{this.renderRignt()}</View>
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
