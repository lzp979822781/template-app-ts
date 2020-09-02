/* eslint-disable react/sort-comp */
import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import store from './store/createStore';

import { Index } from './pages'

import './app.scss'


console.ignoredYellowBox = [
  "Warning: BackAndroid is deprecated. Please use BackHandler instead.",
  "source.uri should not be an empty string",
  "Invalid props.style key"
];

console.disableYellowBox = true; // 关闭全部黄色警告

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
        'pages/Empty/index',
        'pages/home/Home/index',
        'pages/BusinessList/index',
        'pages/Index/index',
        'pages/List/index',
        'pages/Form/index',
        'pages/Test/index',
        'pages/ReferPage/index',
        'pages/user/User/index',
        'pages/cart/Cart/index',
        'pages/home/search/Search/index',
        'pages/home/search/components/SearchGoodsList/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTextStyle: 'black',
    },
    /* tabBar: {
        color: '#989CA5',
        selectedColor: '#4381E5',
        list: [
            {
                pagePath: "pages/home/Home/index",
                iconPath: "https://img13.360buyimg.com/imagetools/jfs/t1/135587/24/6938/1857/5f34efd3E554a02e0/96676a809c3443b3.png",
                selectedIconPath: "./assets/tab-bar/home-active.png",
                text: "首页"
            }, 
            {
                pagePath: "pages/BusinessList/index",
                iconPath: "./assets/tab-bar/cate.png",
                selectedIconPath: "./assets/tab-bar/cate-active.png",
                text: "合作厂商"
            }, 
            {
                pagePath: "pages/cart/Cart/index",
                iconPath: "./assets/tab-bar/cart.png",
                selectedIconPath: "./assets/tab-bar/cart-active.png",
                text: "购物车"
            }, 
            {
                pagePath: "pages/user/User/index",
                iconPath: "./assets/tab-bar/user.png",
                selectedIconPath: "./assets/tab-bar/user-active.png",
                text: "个人"
            }
        ]
    }, */
    plugins: {
        loginPlugin: {
            "version": "1.1.8",
            "provider": "wxefe655223916819e"
        }
    }
}

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
        <Provider store={store}>
            <Index />
        </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
