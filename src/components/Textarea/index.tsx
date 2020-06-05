import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtTextarea } from "taro-ui";
import "./index.scss";

interface ListOption {
    title?: string;
    placeholder?: string;
    error?: boolean;
    onChange?: () => void;
}

class Textarea extends Component<ListOption, any> {
    static defaultProps = {
        title: "标题",
        placeholder: "请输入",
        onChange: () => {}
    };

    constructor(props: ListOption) {
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
    
    onChange=(value)=> {
        this.setState({ value }, ()=>{
            if(this.props.onChange){
                clearTimeout(this.timer)
                this.timer = setTimeout(()=>{
                    this.props.onChange(value);
                }, 300);
            }
        });
    }


    render() {
        const { value } = this.state;
        return (
            <View>
                <View style="height:50px; line-height:50px; padding-left:15px">
                    多行文本
                </View>
                <View style="margin:0 15px">
                    <AtTextarea
                        value={value}
                        onChange={this.onChange}
                        maxLength={200}
                        placeholder="请输入..."
                    />
                </View>
            </View>
        );
    }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Textarea;
