import Taro, { Component, ComponentClass } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { DatePicker, List } from "@ant-design/react-native";
import "./index.scss";

interface ListOption {
    title?: string;
    placeholder?: string;
    onChange?: () => void;
}

class YaoDatePicker extends Component<ListOption, any> {
    static defaultProps = {
        title: "日期",
        placeholder: "请输入",
        onChange: () => {
            console.log("")
        }
    };

    constructor(props: any) {
        super(props);
        this.state = {
            value: undefined
        };
    }

    onChange = value => {
        this.setState({ value });
        if(this.props.onChange){
            this.props.onChange(value);
        }
    };

    render() {
        return (
            <DatePicker
                value={this.state.value}
                mode='date'
                defaultDate={new Date()}
                minDate={new Date(2015, 7, 6)}
                maxDate={new Date(2026, 11, 3)}
                onChange={this.onChange}
                format='YYYY-MM-DD'
            >
                <List.Item>{this.props.title}</List.Item>
            </DatePicker>
        );
    }
}

export default YaoDatePicker as ComponentClass<PageOwnProps, PageState>;
