import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtTextarea } from "taro-ui";
import "./index.scss";

interface ListOption {
    title?: string;
    placeholder?: string;
    error?: boolean;
    onChange?: () => void;
}

class Textarea extends Component<ListOption, any> {
    static defaultProps = {
        title: "标题",
        placeholder: "请输入",
        onChange: () => {}
    };

    constructor(props: ListOption) {
        super(props);
        this.state = {
            value: ""
        };
    }

    handleChange(value) {
        this.setState({
            value
        });
        // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    }

    render() {
        const { value } = this.state;
        return (
            <View>
                <View style="height:50px; line-height:50px; padding-left:15px">
                    多行文本
                </View>
                <View style="margin:0 15px">
                    <AtTextarea
                        value={value}
                        onChange={this.handleChange.bind(this)}
                        maxLength={200}
                        placeholder="请输入..."
                    />
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

export default Textarea;
