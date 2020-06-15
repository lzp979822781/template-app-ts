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
        title: "参照",
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

    onClick=()=>{
        this.props.onClick();
    }

    render() {
        const { value } = this.state;
        const comp = <Switch color="#F2140C" />
        return (
            <Item extra={comp} onPress={this.onClick}>
                {this.props.title}
            </Item>
        );
    }
}

export default JDSwitch as ComponentClass<PageOwnProps, PageState>;
