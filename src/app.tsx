/* eslint-disable react/sort-comp */
import Taro, { Component, Config } from "@tarojs/taro";
import { Provider } from "@tarojs/redux";
import {
    set as setGlobalData,
} from "@/utils/global_data";
// import store from "./store/createStore";
// import { Index } from "./pages";
import "./app.scss";

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

type appProps = {
    jyNativeData?: string;
}

class App extends Component<appProps, any> {
    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
    config: Config = {
        pages: [
            "pages/Empty/index",
            "pages/CustomerDetail/index",
            "pages/CustomerTag/index",
            "pages/PurchaseRelation/index",
            "pages/GoodsSelection/index",
            "pages/GoodsSelection/Search/index",
            "pages/order/OrderDetail/index",
            "pages/Details/index",
            "pages/Details/components/OrderDetail/index"
        ],
        window: {
            backgroundTextStyle: "light",
            navigationBarBackgroundColor: "#fff",
            navigationBarTextStyle: "black",
            navigationStyle: "custom"
        }
    };

    componentWillMount() {
        const jyNativeData = this.props.jyNativeData || "";
        setGlobalData("jyNativeData", JSON.parse(jyNativeData));
    }

    componentDidMount() {}

    componentDidShow() {}

    componentDidHide() {}

    componentDidCatchError() {}

    // 在 App 类中的 render() 函数没有实际作用
    // 请勿修改此函数
    render() {
        return (
            <Provider>
            </Provider>
        );
    }
}

Taro.render(<App />, document.getElementById("app"));
