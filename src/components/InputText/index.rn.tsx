import Taro, { Component } from "@tarojs/taro";
import { Button, InputItem, List } from "@ant-design/react-native";

import "./index.scss";

interface ListOption {
    title?: string;
    type?: "number" | "text" | "password" | "phone" | "idcard" | "digit" | undefined;
    placeholder?: string;
    onChange?: () => void;
}

class InputText extends Component<ListOption, any> {
    static defaultProps = {
        title: "标题",
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

    render() {
        return (
            <InputItem
                type={this.props.type}
                value={this.state.value}
                onChange={value => {
                    this.setState({
                        value: value
                    });
                }}
                placeholder={this.props.placeholder}
            >
                {this.props.title}
            </InputItem>
        );
    }
}

export default InputText as ComponentClass<PageOwnProps, PageState>;
