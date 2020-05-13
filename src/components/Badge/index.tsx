import Taro, { Component } from '@tarojs/taro';
import { AtBadge } from 'taro-ui'

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
    static externalClasses = ['badge-cls']
    static options = {
        addGlobalClass: true
    }

    constructor(props: any) {
        super(props);
        this.state = {
        }

    }

    componentDidMount() {
    }

    render() {

        const { value, dot, maxValue } = this.props;

        return (
            <AtBadge 
                className='badge-cls'
                value={value}
                maxValue={maxValue}
                dot={dot}
            >
                {this.props.children}
            </AtBadge>
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
