import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import {
    Button,
    InputItem,
    List,
    TextareaItem
} from "@ant-design/react-native";

import "./index.scss";

interface ListOption {
    title?: string;
    placeholder?: string;
    onChange?: () => void;
}

class Textarea extends Component<ListOption, any> {
    static defaultProps = {
        title: "多行文本",
        placeholder: "请输入",
        onChange: () => {}
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

    timer = null;

    onChange = value => {
        this.setState({ value }, ()=>{
            if(this.props.onChange){
                clearTimeout(this.timer)
                this.timer = setTimeout(()=>{
                    this.props.onChange(value);
                }, 300);
            }
        });
    };

    render() {
        const {value} = this.state;
        return (
            <View>
                <View style={{ height:40, justifyContent: "center"; }}><Text style={{ fontSize:17, marginLeft:15, color:"#333333" }}>{this.props.title}</Text></View>
                <View style={{ marginHorizontal: 15, borderWidth:1, borderColor: "#eeeeee" }}>
                    <TextareaItem rows={4} count={200} defaultValue={value} placeholder="请输入..."  onChange={this.onChange} />
                </View>
            </View>
        );
    }
}

export default Textarea as ComponentClass<PageOwnProps, PageState>;
