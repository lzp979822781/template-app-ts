import Taro, { Component, ComponentClass } from "@tarojs/taro";
import { Picker, List } from "@ant-design/react-native";
import "./index.scss";

interface LabelValue {
    label: string;
    value: any;
}

interface ListOption {
    title?: string;
    placeholder?: string;
    dataSource: LabelValue[];
    onChange?: () => void;
}

class PickerItem extends Component<ListOption, any> {
    static defaultProps = {
        title: "标题",
        placeholder: "请输入",
        dataSource: [{ label: "美国", value: 0 }],
        onChange: () => {
            console.log("");
        }
    };

   
    constructor(props: any) {
        super(props);
        this.state = {
            value: [0]
        };
    }

    onPress: () => void;

    static getDerivedStateFromProps(props, state) {
        return {
            value: [props.value] || [0]
        };
    }

    onChange = value => {
        this.setState({ value });
        if (this.props.onChange) {
            this.props.onChange(value[0]);
        }
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
