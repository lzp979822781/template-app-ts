import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import {
    JDJumping
} from '@jdreact/jdreact-core-lib';
import { hoverStyle } from "@/utils/utils";
import "./index.scss";

interface Option {
    title?: string;
    backApp: boolean;
    noBack?: boolean;
    noBgColor?: boolean;
    renderLeft?: object;
    renderRight?: object;
}

class Header extends Component<Option, any> {
    static defaultProps = {
        title: "标题",
        noBgColor: false,
        backApp: false,
        noBack: false
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    renderLeft = () => {

        const { noBack, renderLeft, backApp } = this.props;
        // 不显示返回箭头
        if (noBack) {
            return null;
        };

        // 自定义返回按钮
        if (renderLeft) {
            return renderLeft;
        }

        return (
            <View
                className='back-btn'
                hoverStyle={hoverStyle}
                onClick={() => {
                    if (backApp) {
                        JDJumping.jumpToBack();
                    } else {
                        Taro.navigateBack();
                    }
                }}
            >
                <Image className='back-img' src="https://img10.360buyimg.com/imagetools/jfs/t1/131583/34/9685/2776/5f58ac4dEc286157f/56bb716cb76286f2.png" />
            </View>
        );
    };
    renderRight = () => {
        const { renderRight } = this.props;
        //自定义右边按钮
        if (renderRight) {
            return renderRight;
        }

        return null;
    };

    render() {
        const { noBgColor } = this.props;
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
