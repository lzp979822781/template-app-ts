import Taro, { Component } from '@tarojs/taro';
import { Badge } from '@ant-design/react-native';

import './index.scss'


type PageOwnProps = {
    value: string|number,
    dot?: boolean,
    maxValue?: number,
    rnStyle?: object
}

type PageState = {}

const defaultProps = {
    maxValue: 99
}

class TaroBadge extends Component<PageOwnProps, PageState> {

    static defaultProps = defaultProps

    constructor(props: any) {
        super(props);
        this.state = {
        }

    }

    componentDidMount() {
    }

    render() {
        const { value, maxValue, rnStyle } = this.props;

        return (
            <Badge 
                text={value} 
                overflowCount={maxValue}
                style={rnStyle}
            >
                {this.props.children}
            </Badge>
        )
    }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default TaroBadge
