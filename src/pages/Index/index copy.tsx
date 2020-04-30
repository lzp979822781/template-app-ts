import { ComponentClass } from 'react'
import {
    ProgressViewIOS,
    Picker,
    SegmentedControlIOS,
    DatePickerIOS,
    ActivityIndicator,
    TouchableHighlight,
    TouchableOpacity,
    Modal
} from "react-native";
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text, Form, Input, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { SearchBar } from '@/components';
import Request from '@/utils/Request';
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

interface Index {
    props: IProps;
}

@connect(({ hello, ...other }) => ({ ...hello, ...other }))
class Index extends Component<any, any> {

    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
    config: Config = {
        navigationBarTitleText: '首页'
    }

    constructor(props: any) {
        super(props);

        this.setDate = this.setDate.bind(this);
        this.state = {
            name: '',
            selectedIndex: 1,
            chosenDate: new Date(),
            modalVisible: false
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(this.props, nextProps)
    }

    componentWillUnmount() { }

    componentDidShow() {
        this.getData();
    }


    getData = async () => {
        try {
            const res = await Request.get("api_user_userInfo", { content: "hello" })
            console.log("res", res)
        } catch (e) {
            console.log("e", e)
        }
    }

    componentDidHide() { }

    onAdd = () => {
        this.callModel("add");
    }

    routerTo = () => {
        Taro.navigateTo({
            url: '/pages/List/index?id=2&type=test'
        });
    }
    onDec = () => {
        this.callModel('minus');
    }

    onMulti = () => {

    }

    onNameInput = e => {
        const { detail: { value = '' } = {} } = e;
        console.log("value", value);
        this.setState({
            name: value
        })
    }

    onSumbmit = e => {
        console.log("e", e);
        const { detail: { value = {} } = {} } = e;
        console.log("submit value", value);
    }

    renderForm = () => {
        const { name } = this.state;

        return (
            <View>
                <Form onSubmit={this.onSumbmit}>
                    <Input name="name" type="text" onInput={this.onNameInput} placeholder="请输入名称" value={name} />
                    <Button formType="submit">提交</Button>
                </Form>
            </View>
        )
    }

    callModel = (type: string, data = {}) => {
        return new Promise((resolve) => {
            this.props.dispatch({
                type: `hello/${type}`,
                payload: data,
                resolve
            })
        })
    }

    setDate(newDate) {
        this.setState({ chosenDate: newDate })
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    render() {
        return (
            <View className='index'>
                <View className="nav">
                    <View className="header">
                        <SearchBar />
                    </View>
                </View>
                <View>
                    <Button className='add_btn' onClick={this.onAdd}>+</Button>
                    <Button className='dec_btn' onClick={this.onDec}>-</Button>
                    <Button className='dec_btn' onClick={this.onMulti}>other</Button>
                    <Button className='add_btn' onClick={this.routerTo}>测试路由</Button>
                </View>
                <TouchableHighlight
                    onPress={() => {
                        this.setModalVisible(true);
                    }}
                >
                    <Text>Show Modal</Text>
                </TouchableHighlight>
                {/* {this.renderForm()} */}
                <Text>{this.props.count}</Text>
                <View><Text>Hello, World</Text></View>
                <ProgressViewIOS progressTintColor={"#61dafb"} progress={0.3}></ProgressViewIOS>
                <SegmentedControlIOS
                    values={['One', 'Two']}
                    selectedIndex={this.state.selectedIndex}
                    onChange={(event) => {
                        this.setState({ selectedIndex: event.nativeEvent.selectedSegmentIndex });
                    }}
                />
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-around'
                    }}
                >
                    <ActivityIndicator size="large" color="#0000ff" />
                    <ActivityIndicator size="small" color="#00ff00" />
                </View>
                <Picker
                    selectedValue={this.state.language}
                    style={{ height: 50, width: "100%" }}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ language: itemValue })
                    }>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert("Modal has been closed.");
                    }}
                >
                    <View style={{ flex: 1, marginTop: 22 }}>
                        <View style={{ height: 200, backgroundColor: "#fff" }}>
                            <Text>Hello World!</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}
                            >
                                <Text>Hide Modal</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => {
                            this.setModalVisible(!this.state.modalVisible);
                        }} style={{ flex: 1, backgroundColor: "rgba(36, 41, 46, 0.8)" }}>
                            <View></View>
                        </TouchableOpacity>
                    </View>
                </Modal>
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

export default Index as ComponentClass<PageOwnProps, PageState>
