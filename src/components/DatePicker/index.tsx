import Taro, { Component } from "@tarojs/taro";
import { View, Text, Picker } from "@tarojs/components";
import { AtList, AtListItem } from "taro-ui";
import "./index.scss";

interface ListOption {
    title?: string;
    placeholder?: string;
    error?: boolean;
    onChange?: () => void;
}

class DatePicker extends Component<ListOption, any> {
    static defaultProps = {
        title: "日期",
        placeholder: "请输入",
        onChange: () => {}
    };

    constructor(props: ListOption) {
        super(props);
        this.state = {
            dateSel: "2018-04-22"
        };
    }

    onDateChange = e => {
        this.setState({
            dateSel: e.detail.value
        });
    };

    render() {
        const { value } = this.state;
        return (
            <Picker mode="date" onChange={this.onDateChange}>
                <AtList>
                    <AtListItem
                        title={this.props.title}
                        extraText={this.state.dateSel}
                    />
                </AtList>
            </Picker>
        );
    }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default DatePicker;