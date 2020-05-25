import Taro, { Component } from "@tarojs/taro";
import { AtInput }  from 'taro-ui'
import "./index.scss";

interface ListOption {
    title?: string;
    type?: "number" | "text" | "password" | "phone" | "idcard" | "digit" | undefined;
    placeholder?: string;
    error?: boolean;
    onChange?: () => void;
}

class InputText extends Component<ListOption, any> {
    static defaultProps = {
        title: "单行文本",
        type: "text",
        placeholder: "请输入",
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onChange: ()=>{}
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
        this.props.onChange(value)
        return value;
    }

    render() {
        return (
            <AtInput
                error={this.props.error}
                name='value'
                title={this.props.title}
                type={this.props.type}
                placeholder={this.props.placeholder}
                value={this.state.value}
                onChange={this.handleChange.bind(this)}
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

export default InputText;
