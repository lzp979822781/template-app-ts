import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { Modal } from '@ant-design/react-native';

import './index.scss'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

interface FooterBtn {
    text: string,
    onClick?: () => void
}

type PageOwnProps = {
    visible: boolean,
    title: string,
    className: any,
    cancelText?: string,
    confirmText?: string,
    footer?: Array<FooterBtn>,
    onConfirm?: () => void,
    onCancel?: () => void,
    customFooter?: boolean,  // 是否使用自定义footer
    renderHeader?: any,
    renderFooter?: any, // footer元素
    renderContent?: any, // 内容区元素
    customStyle?: object,
    maskClosable?: boolean,
    closable?: boolean
}

type PageState = {}

/* const defaultProps = {
    maskClosable: true,
    closable: false,
    transparent: false,
    popup: false,
    animationType: 'fade',
    footer: []
} */

const BORDER_COLOR = '#E5E5E5';

const footerContainer = {
    borderTopWidth: 0.5,
    borderTopColor: BORDER_COLOR
}

const defaultProps = {
    maskClosable: true
}

class TaroModal extends Component<any, any> {

    static defaultProps = defaultProps
    static externalClasses = ['custom-class']

    constructor(props: any) {
        super(props);
        this.state = {}
    }

    componentWillReceiveProps(nextProps) {
        console.log(this.props, nextProps)
    }

    componentWillUnmount() { }

    componentDidShow() {
    }

    getFooterBtn = () => {
        /* const { footer } = this.props;
        if(!Array.isArray(footer) || (Array.isArray(footer) && !footer.length)) {
            return [];
        }
        return footer.map(({ text, onClick }) => ({ text, onPress: onClick })); */
        const { confirmText, cancelText, onConfirm, onCancel } = this.props;
        return [
            { text: cancelText, onPress: onCancel },
            { text: confirmText, onPress: onConfirm}
        ];
    }

    renderDefaultHeader = () => {
        const { title } = this.props;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        const defaultHeader = (
            <Text className='modal-default-header-text'>{title}</Text>
        )
        return defaultHeader;
    }

    getHeader = () => {
        const { renderHeader, title } = this.props;
        if(!renderHeader && !title) {
            return null;
        }
        // return renderHeader ? <View className='modal-default-header'>{this.props.renderHeader}</View>: this.renderDefaultHeader();
        return (
            <View className='modal-default-header'>
                {renderHeader ? this.props.renderHeader: this.renderDefaultHeader()}
            </View>
        )
    }

    getClasses = () => {
        const classes = TaroModal.externalClasses.reduce((total, item) => {
            total += `${item} `;
            return total;
        }, '');
        return classes;
    }


    render() {
        const { visible, transparent = true, maskClosable, closable = false, } = this.props;
        return (
            <Modal
                transparent={transparent}
                maskClosable={maskClosable}
                visible={visible}
                closable={closable}
                footer={[]}
                style={[{ marginVertical: 0, paddingVertical: 0, paddingTop: 0}]}
                bodyStyle={{ marginHorizontal: 0, marginVertical: 0, paddingHorizontal: 0, paddingVertical: 0, paddingBottom: 0, minHeight: 210, display: 'flex' }}
            >
                { this.getHeader()}
                <View style={{ flex: 1}}>
                    {this.props.renderContent}
                </View>
                <View style={footerContainer}>{ this.props.renderFooter}</View>
            </Modal>
        )
    }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default TaroModal as ComponentClass<PageOwnProps, PageState>
