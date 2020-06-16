import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtListItem } from "taro-ui";
import "./index.scss";

interface ListOption {
    title?: string;
}

class JDSwitch extends Component<ListOption, any> {
    static defaultProps = {
        title: "开关",
        onClick: () => {}
    };

    constructor(props: ListOption) {
        super(props);
        this.state = {
            value: false
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            value: props.value || false
        };
    }

    onChange = obj => {
        this.setState(
            {
                value: obj.detail.value
            },
            () => {
                this.props.onChange(obj.detail.value);
            }
        );
    }; 

    render() {
        const { value } = this.state;
        return (
            <AtListItem
                isSwitch
                title={this.props.title}
                switchIsCheck={value}
                switchColor="#F2140C"
                onSwitchChange={this.onChange}
            />
        );
    }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default JDSwitch;
