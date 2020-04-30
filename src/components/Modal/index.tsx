import { ComponentClass } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { Button } from '@tarojs/components';
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui";

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
    content?: string
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

    render() {
        const { title, visible, maskClosable = true  } = this.props;
        return (
            <AtModal isOpened={visible} closeOnClickOverlay={maskClosable}>
                <AtModalHeader>{title}</AtModalHeader>
                <AtModalContent>
                    {this.props.children}
                </AtModalContent>
                <AtModalAction>
                    <Button type='primary'>取消</Button>
                    <Button type='primary'>确定</Button> 
                </AtModalAction>
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
