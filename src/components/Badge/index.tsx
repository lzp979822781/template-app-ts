import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

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

    renderBadge = () => {
        const { dot } = this.props;
        return dot ? <View className='badge-dot'><Text> </Text></View> : (
            <View className='badge-text'><Text style={{ color: '#fff'}}>{ this.getValue()}</Text></View>
        )
    }

    getValue = () => {
        const { value, maxValue } = this.props;
        if (value === '' || value === null || value === undefined) return '';
        if(Number.isNaN(+value)) {
            return value;
        }

        if(typeof maxValue === 'number' ) {
            return value > maxValue ? `${maxValue}+` : value;
        }

    }

    render() {

        return (
            <View className='badge badge-cls'>
                <View>
                    {this.props.children}
                    { this.renderBadge()}
                </View>
            </View>
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
