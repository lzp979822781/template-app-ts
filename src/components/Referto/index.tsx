import Taro, { Component } from "@tarojs/taro";
import { AtListItem }  from 'taro-ui'
import "./index.scss";

interface ListOption {
    title?: string;
}

class Referto extends Component<ListOption, any> {
    static defaultProps = {
        title: "参照",
        onClick: ()=>{}
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
    
    onClick=()=>{
        this.props.onClick();
    }

    render() {
        const { value } = this.state;
        return (
            <AtListItem title={this.props.title} extraText={value} onClick={this.onClick} />
        );
    }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Referto;
