import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.scss";

interface Option {
    label: string;
    value: string;
    renderValue?: any;
}


export default class ListItem extends Component<Option, any> {
    static defaultProps = {
        label: "标题",
        value: ""
    };
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderValue = () => {
        const { renderValue } = this.props;
        if (renderValue) {
            return renderValue;
        } else {
            return <Text className='list-item-value-txt'>{this.props.value}</Text>
        };
    }
    render() {
        return (
            <View className='list-item'>
                <View className='list-item-lable'><Text className='list-item-lable-txt'>{this.props.label}</Text></View>
                <View className='list-item-value'>{this.renderValue()}</View>
            </View>
        );
    }
}
