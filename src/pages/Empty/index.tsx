import { ComponentClass } from "react";
import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import Header from "@/components/Header";
import StatusBar from "@/components/StatusBar/index";
import { set as setGlobalData, get as getGlobalData } from '@/utils/global_data';

import "./index.scss";

type PageOwnProps = {};
type PageState = {};

const routers = {
    customDetail: "pages/CustomerDetail/index",
    customTag :"pages/CustomerTag/index",
    planDetail :"pages/PlanDetail/index",
    purchaseRelation: "pages/PurchaseRelation/index"
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
        const key = getGlobalData('pageName');
        if(key){
            this.routerTo(routers[key]);
        };
    }

    routerTo = url => {
        // Taro.navigateTo({
        //     url: url
        // });
        Taro.redirectTo({
            url: url
        });
    };

    render() {

        return (
            <View className="index">
                <StatusBar />
                <Header title="中间页" noBack />
                <Button
                    onClick={() => {
                        this.routerTo("/pages/CustomerDetail/index");
                    }}
                >
                    客户详情
                </Button>
                <Button
                    onClick={() => {
                        this.routerTo("/pages/CustomerTag/index");
                    }}
                >
                    客户标签
                </Button>
                <Button
                    onClick={() => {
                        this.routerTo("/pages/PlanDetail/index");
                    }}
                >
                    计划详情
                </Button>
                <Button
                    onClick={() => {
                        this.routerTo("/pages/PurchaseRelation/index");
                    }}
                >
                    建采关系
                </Button>
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
