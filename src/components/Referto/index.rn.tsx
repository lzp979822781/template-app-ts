import Taro, { Component } from "@tarojs/taro";
import { List } from "@ant-design/react-native";
import "./index.scss";

const Item = List.Item;

interface ListOption {
    title?: string;
}

class Referto extends Component<ListOption, any> {
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
        return (
            <Item extra={value} onPress={this.onClick}>
                {this.props.title}
            </Item>
        );
    }
}

export default Referto as ComponentClass<PageOwnProps, PageState>;
