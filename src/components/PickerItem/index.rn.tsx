import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { Picker, List } from "@ant-design/react-native";
import "./index.scss";

interface ListOption {
    title?: string;
    placeholder?: string;
    onChange?: () => void;
}

class PickerItem extends Component<ListOption, any> {
    static defaultProps = {
        title: "标题",
        placeholder: "请输入",
        dataSource: [],
        onChange: (value) => {}
    };

    constructor(props: any) {
        super(props);
        this.state = {
            value: [0]
        };
    }

    onChange = value => {
        this.setState({ value });
        this.props.onChange(value[0]);
    };

    render() {
        return (
            <Picker
                data={this.props.dataSource}
                cols={1}
                value={this.state.value}
                onChange={this.onChange}
            >
                <List.Item onPress={this.onPress}>{this.props.title}</List.Item>
            </Picker>
        );
    }
}

export default PickerItem as ComponentClass<PageOwnProps, PageState>;
