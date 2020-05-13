# 前期准备

## Taro基础知识准备

见快速开始 -> 各端开发前注意

基础教程 ->  框架（其实讲的是基础知识和注意事项）

​				 ->  最佳实践

​				 ->  语法特性 （这一章节其实已经包含react的相关内容了）

# helloworld

## 开发

### 创建新页面

在目录 src/pages下创建文件夹Test

```
import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

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

interface Test {
    props: IProps;
}

@connect(({ hello, ...other }) => ({ ...hello, ...other }))
class Test extends Component<any, any> {

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

        this.state = {}
    }

    componentWillReceiveProps(nextProps) {
        console.log(this.props, nextProps)
    }

    componentWillUnmount() { }

    componentDidShow() {
        // this.getData();
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

    onDec = () => {
        this.callModel('minus');
    }

    onMulti = () => {

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

    render() {
        return (
            <View className='index'>
                <View>
                    <Button className='add_btn' onClick={this.onAdd}>+</Button>
                    <Button className='dec_btn' onClick={this.onDec}>-</Button>
                </View>

                <Text>{this.props.count}</Text>
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

export default Test as ComponentClass<PageOwnProps, PageState>

```



### 添加路由

在根目录下app.tsx中添加路由,在config -> pages中添加路由'pages/Test/index'

### 设置首页

首页取的路由中的第一项,因此开发时将新创建的页面设为调整为路由第一项，便于调试

### 数据model层开发

当前项目使用的是dva框架，所有数据模型至于src/models目录下，在此目录下创建hello.ts

```
import { Effect } from 'dva-core';
import { Reducer } from 'redux';

export interface HelloModelState {
    count?: number
}

export interface HelloModelType {
    namespace: 'hello'
    state: HelloModelState,
    effects: {
        add: Effect
        minus: Effect,
    },
    reducers: {
        updateState: Reducer<HelloModelState>
    }
}


const helloModel: HelloModelType = {
    namespace: 'hello',
    state: { 
        count: 0
    },
    effects: {
        *add(param, { put, select }) {
            const { count } = yield select(state => state.hello);
            
            yield put({
                type: 'updateState',
                payload: {
                    count: count + 1
                }
            })
        },
        *minus(param, { put, select }) {
            const { count } = yield select(state => state.hello);
            yield put({
                type: 'updateState',
                payload: {
                    count: count - 1
                }
            })
        },
    },
    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload};
        },
    },
};

export default helloModel;


```

### 组件连接数据模型并调用

通过在组件中使用修饰符进行连接，参考组件代码中的@connect方法

参考组件中代码中的add_btn、des_btn的点击事件

## 在线预览

### 小程序

(1) 下载微信开发者工具

(2) 在template-app-ts下运行npm run dev:weapp, 此时会自动在dist目录下生成weapp文件夹

(3) 在微信开发者工具中导入dist目录下weapp工程

### h5

直接运行npm run dev:h5启动，启动完成后会自动在浏览器中打开

###  react native

(1)在template-app-ts工程中运行 npm run dev:rn, 启动完成会自动弹出加成完成的系统终端，如果需要再次启动需要运行先停止系统终端、编辑器终端

(2)启动壳工程：进入taro-native-shell目录，运行

```
react-native run-ios
```

## 调试

（1）小程序

在微信开发开发者工具者直接调试，调试方式与pc 端浏览器调试差不多

（2）h5

启动完成后，在浏览器中调试；调试方式与浏览器中调试相同

   (3)  react native 

调试方式见 taro官网 -> 多端开发目录 -> React Native端开发流程

## 打包

打包方式参考npm run build相关命令

## 部署

待后续补充

# 注意事项

开发时一定要仔细阅读Taro官网 ——>最佳实践章节

## js

* 千万不要在rn端 componentWillReceiveProps中打印 this.props和nextProps，否则会造成页面卡死
* View中嵌套Text的时候，View和Text之间不能有空格，否则RN端编译会报字符应该使用Text标签

* 组件传递函数组件名为on开头
* 组件中传递JSX元素的时候以render开头
* 小程序内部不可以使用通过render传入的jsx元素判断是否进行不同条件的渲染，需要定义独立的变量

## css

参考官网 -> 快速开始 -> 各端开发前注意 

