import Taro, { Component } from "@tarojs/taro";
import { Picker } from "@tarojs/components";
import { AtList, AtListItem } from "taro-ui";
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

    constructor(props: ListOption) {
        super(props);
        this.state = {
            value: 0
        };
    }

    onChange = e => {
        this.setState({
            value: e.detail.value
        });
        
        if (this.props.onChange) {
            this.props.onChange(e.detail.value);
        }
    };

    render() {
        const { value } = this.state;
        const Key = Number(value);
        return (
            <Picker
                value={value}
                mode='selector'
                range={this.props.dataSource}
                rangeKey='label'
                onChange={this.onChange}
            >
                <AtListItem
                    title={this.props.title}
                    extraText={this.props.dataSource[Key].label}
                />
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

export default PickerItem;
