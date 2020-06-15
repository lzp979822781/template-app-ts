import Taro, { Component } from "@tarojs/taro";
import { List } from "@ant-design/react-native";
import { View, Switch } from "@tarojs/components";
import "./index.scss";

const Item = List.Item;

interface ListOption {
    title?: string;
}

class JDSwitch extends Component<ListOption, any> {
    static defaultProps = {
        title: "开关",
        onClick: ()=>{}
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
        const comp = <Switch checked={value} onChange={this.onChange} color="#F2140C" />
        return (
            <Item extra={comp}>
                {this.props.title}
            </Item>
        );
    }
}

export default JDSwitch as ComponentClass<PageOwnProps, PageState>;
