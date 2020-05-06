import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
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
    onCancel?: () => void
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

class TaroModal extends Component<any, any> {

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
        const { footer } = this.props;
        if(!Array.isArray(footer) || (Array.isArray(footer) && !footer.length)) {
            return [];
        }
        return footer.map(({ text, onClick }) => ({ text, onPress: onClick }));
    }


    render() {
        const { visible, title, transparent = true, maskClosable = true, closable = false } = this.props;

        return (
            <Modal
              title={title}
              transparent={transparent}
              maskClosable={maskClosable}
              visible={visible}
              closable={closable}
              footer={this.getFooterBtn()}
            >
                {this.props.children}
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
