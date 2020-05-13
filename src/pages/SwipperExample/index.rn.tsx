import Taro, { Component, Config } from '@tarojs/taro'
import { Carousel } from '@ant-design/react-native';

import './index.scss'

type dispatchProps = {
    type: string,
    payload: any,
    resolve: any
}

type PageDispatchProps = {
    count: number
    dispatch: (param: dispatchProps) => void
}

type PageOwnProps = {
    children: any
}

type PageState = {}

type IProps = PageDispatchProps & PageOwnProps

interface SwipperExample {
    props: IProps;
}


class SwipperExample extends Component<IProps, PageState> {

    static externalClasses = ['swipper-class']

    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
    config: Config = {
        navigationBarTitleText: '测试页',
    }

    static options = {
        addGlobalClass: true
    }

    constructor(props: any) {
        super(props);
        this.state = {
            
        }

    }

    componentWillUnmount() { }

    componentDidShow() {

    }

    render() {

        return (
            <Carousel
                selectedIndex={0}
                autoplay
                infinite
            >
                {this.props.children}
            </Carousel>
        )
    }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default SwipperExample
