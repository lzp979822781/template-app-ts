import { ComponentClass } from "react";
import Taro, { Component } from "@tarojs/taro";
import { View, Button } from "@tarojs/components";
import { StatusBar, Header } from "@/components/index";
import { get as getGlobalData } from '@/utils/global_data';

import "./index.scss";

type PageOwnProps = {};
type PageState = {};

const routers = {
    customDetail: "pages/CustomerDetail/index",
}

class Empty extends Component<any, any> {
    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */

    constructor(props: any) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        const jyNativeData = getGlobalData('jyNativeData');
        if (jyNativeData.pageName) {
            this.redirectTo(routers[jyNativeData.pageName]);
        };
    }

    routerTo = url => {
        Taro.navigateTo({
            url: url
        });
    };

    redirectTo = url => {
        Taro.redirectTo({
            url: url
        });
    };

    render() {

        return (
            <View className='index'>
                <StatusBar />
                <Header title='中间页' backApp />
                {/* <Button
                    onClick={() => {
                        this.routerTo("/pages/CustomerDetail/index");
                    }}
                >
                    客户详情
                </Button>
                <Button
                    onClick={() => {
                        this.routerTo("/pages/GoodsSelection/index");
                    }}
                >
                    推品
                </Button>
                <Button
                    onClick={() => {
                        this.routerTo("/pages/Details/components/OrderDetail/index");
                    }}
                >
                    订单详情
                </Button>
                <Button
                    onClick={() => {
                        this.routerTo("/pages/Details/index");
                    }}
                >
                    明细
                </Button> */}
            </View>
        );
    }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Empty as ComponentClass<PageOwnProps, PageState>;
