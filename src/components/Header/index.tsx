import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import back from "@/assets/images/back@3x.png";
import { hoverStyle } from "@/utils/utils";
import "./index.scss";

interface Option {
    title?: string;
    noBack?: boolean;
    noBgColor?: boolean;
    renderLeft?: object;
    renderRight?: object;
}

class Header extends Component<Option, any> {
    static defaultProps = {
        title: "标题",
        noBgColor: false,
        renderLeft: null
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    renderLeft = () => {

        // 不显示返回箭头
        if(this.props.noBack){
            return null;
        };

        // 自定义返回按钮
        if (this.props.renderLeft) {
            return this.props.renderLeft;
        }

        return (
            <View
                className='back-btn'
                hoverStyle={hoverStyle}
                onClick={() => {
                    Taro.navigateBack();
                }}
            >
                <Image className='back-img' src={back} />
            </View>
        );
    };
    renderRight = () => {

        //自定义右边按钮
        if (this.props.renderRight) {
            return this.props.renderRight;
        }

        return null;
    };

    render() {
        const {noBgColor} = this.props;
        const conClassName = noBgColor ? "header-con-noBgColor" : "header-con";
        return (
            <View className={conClassName}>
                <View className='back-con'>{this.renderLeft()}</View>
                <View className='title-con'>
                    <Text className='title-txt'>{this.props.title}</Text>
                </View>
                <View className='handle-con'>{this.renderRight()}</View>
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
