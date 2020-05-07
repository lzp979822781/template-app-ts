import { ComponentClass } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { Button, View, Text } from '@tarojs/components';
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui";

import { UUID } from '@/utils/utils';
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

type PageOwnProps = {
    visible: boolean,
    title?: string,
    className: any,
    footer?: any,
    renderHeader?: any,
    renderFooter?: any,
    renderContent?: any,
    onConfirm?: () => void,
    onCancel?: () => void,
    cancelText?: string,
    confirmText?: string,
    customHeader?: boolean, // 是否显示定制头 直接用renderHeader判断的话, 获取不到正确结果
    customFooter?: boolean,  // 是否使用自定义footer
    customStyle?: object,
    closable?: boolean
}

type PageState = {}


class Modal extends Component<any, any> {

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


    onOpenMNodal = () => {

    }

    getFooterBtn = () => {
        const { footer } = this.props;
        if(!Array.isArray(footer) || (Array.isArray(footer) && !footer.length)) {
            return [];
        }
        return footer.map((item, index) => {
            const { text, onCallFn } = item;
            return (
                <Button type='primary' onClick={onCallFn} key={index}>{text}</Button>
            );
        });
    }

    renderFooter = () => {
        const data = [{ text: '取消'}];
        return data.map((item) => {
            const { text } = item;
            return <Button key={UUID()}>{text}</Button>
        })
    }

    renderDefaultHeader = () => {
        const { title } = this.props;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
        const defaultHeader = (
            <AtModalHeader>{title}</AtModalHeader>
        )
        return defaultHeader;
    }

    /**
     * @param {boolean} customHeader 是否使用自定义头
     * @returns
     */
    renderInnerHeader = () => {
        const { customHeader, title } = this.props;
        if(!customHeader && !title) {
            return null;
        }

        return customHeader ? (
            <View className='modal-default-header'>
                {this.props.renderHeader}
            </View>
        ): this.renderDefaultHeader();
    }

    renderDefaultFooter = () => {
        const { confirmText, cancelText, onConfirm, onCancel } = this.props;
        return (
            <AtModalAction>
                { cancelText ? <Button onClick={onCancel}>{cancelText}</Button> : null}
                { confirmText ? <Button onClick={onConfirm}>{confirmText}</Button> : null}
            </AtModalAction>
        )
    }

    /**
     * 这里不使用this.props.renderFooter判断是否自定义，是因为taro中编译不通过
     * @memberof Modal
     */
    renderInnerFooter = () => {
        const { customFooter } = this.props;
        return customFooter ? <View className='footer-container'>{this.props.renderFooter}</View> : this.renderDefaultFooter();
    }

    render() {
        const { visible, maskClosable = true } = this.props;
        return (
            <AtModal isOpened={visible} closeOnClickOverlay={maskClosable} className='modal-container'>
                {/* <AtModalHeader>{title}</AtModalHeader> */}
                { this.renderInnerHeader()}
                <AtModalContent>
                    {this.props.renderContent}
                </AtModalContent>
                {/* <AtModalAction> */}
                {/* <View>
                    { this.props.renderFooter }
                </View> */}
                { this.renderInnerFooter()}
                {/* </AtModalAction> */}
            </AtModal>
        )
    }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Modal as ComponentClass<PageOwnProps, PageState>
