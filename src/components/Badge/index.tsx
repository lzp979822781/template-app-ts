import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

import './index.scss'


type PageOwnProps = {
    value: string|number|undefined,
    dot?: boolean,
    maxValue?: number,
    rnStyle?: object,
    custom?: boolean,
    renderBadge?: any,
    textClass?: string,
    style?: object,
    className?: string
}

type PageState = {}

const defaultProps = {
    maxValue: 99,
    custom: false
}

class TaroBadge extends Component<PageOwnProps, PageState> {

    static defaultProps = defaultProps
    static externalClasses = ['badge-cls', 'text-class']
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

    renderDefault = () => {
        return (
            <View className='badge-text'>
                <Text style={{ color: '#fff'}}>{ this.getValue()}</Text>
            </View>
        )
    }

    renderCustomBadge = () => {
        const { style = {} } = this.props;
        return (
            <View className='text-class badge-custom-text'  style={style}>
                {this.props.renderBadge}
            </View>
        )
    }

    renderBadge = () => {
        const { dot, custom } = this.props;
        const badgeText = custom ? this.renderCustomBadge() : this.renderDefault();

        return dot ? <View className='badge-dot'><Text> </Text></View> : badgeText;
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

    getRnStyle = () => {
        const { rnStyle } = this.props;
        return rnStyle && (Taro.getEnv() === 'RN') ? rnStyle : {};
    }

    render() {

        return (
            <View className='badge badge-cls' style={this.getRnStyle()}>
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
