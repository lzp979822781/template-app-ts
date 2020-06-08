import Taro, { Component } from "@tarojs/taro";
import { Button, InputItem, List } from "@ant-design/react-native";

import "./index.scss";

interface ListOption {
    title?: string;
    type?:
        | "number"
        | "text"
        | "password"
        | "phone"
        | "idcard"
        | "digit"
        | undefined;
    placeholder?: string;
    onChange?: () => void;
    error?: boolean
}

class InputText extends Component<ListOption, any> {
    static defaultProps = {
        value: "",
        title: "单行文本",
        type: "text",
        placeholder: "请输入",
        onChange: () => {}
    };

    constructor(props: any) {
        super(props);
        this.state = {
            value: ""
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            value: props.value || ""
        };
    }

    timer = null;

    onChange = value => {
        this.setState({ value }, () => {
            if (this.props.onChange) {
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.props.onChange(value);
                }, 300);
            }
        });
    };

    render() {
        const { value } = this.state;
        return (
            <InputItem
                type={this.props.type}
                defaultValue={value}
                onChange={this.onChange}
                placeholder={this.props.placeholder}
            >
                {this.props.title}
            </InputItem>
        );
    }
}

export default InputText as ComponentClass<PageOwnProps, PageState>;
