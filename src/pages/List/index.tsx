/* eslint-disable @typescript-eslint/no-empty-function */
import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text, Form, Input } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtTabBar } from 'taro-ui';

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

type dispatchProps = {
    type: string,
    payload: any,
    resolve: any
}

type PageDispatchProps = {
    count: number
    dispatch: (param: dispatchProps) => void
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageDispatchProps & PageOwnProps

interface List {
    props: IProps;
}

@connect(({ hello, ...other }) => ({ ...hello, ...other }))
class List extends Component<any, any> {

    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
    // eslint-disable-next-line react/sort-comp
    config: Config = {
        navigationBarTitleText: '列表'
    }

    constructor(props: any) {
        super(props);
        this.state = {
            current: 0
        }
    }

    componentWillUnmount() { }

    componentDidShow() {
        alert(JSON.stringify(this.$router.params))
    }

    componentDidHide() { }

    goback = () => {
        Taro.navigateBack();
    }

    handleClick(value) {
        this.setState({
            current: value
        })
    }

    render() {
        return (
            <View className='container'>
                <Button className='add_btn' onClick={this.goback}>测试路由</Button>
                <AtTabBar
                    tabList={[
                        { title: '待办事项', text: 8 },
                        { title: '拍照' },
                        { title: '通讯录', dot: true }
                    ]}
                    onClick={this.handleClick.bind(this)}
                    current={this.state.current}
                />
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

export default List as ComponentClass<PageOwnProps, PageState>
