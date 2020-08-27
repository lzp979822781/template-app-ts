import { ComponentClass } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import {
    View,
    Button,
    Text,
    Form,
    Input,
    Swiper,
    Image,
    SwiperItem
} from "@tarojs/components";
import { connect } from "@tarojs/redux";

import Request from "@/utils/Request";
import { UUID } from "@/utils/utils";
import Header from "@/components/Header";
import StatusBar from "@/components/StatusBar/index";

import "./index.scss";

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
    type: string;
    payload: any;
    resolve: any;
};

type PageDispatchProps = {
    count: number;
    dispatch: (param: dispatchProps) => void;
};

type PageOwnProps = {};

type PageState = {};

type IProps = PageDispatchProps & PageOwnProps;

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
        navigationBarTitleText: "首页"
    };

    constructor(props: any) {
        super(props);

        this.state = {
            name: ""
        };
    }

    componentWillReceiveProps(nextProps) {
        console.log(this.props, nextProps);
    }

    componentWillUnmount() {}

    componentDidShow() {
        // this.getData();
    }

    getData = async () => {
        try {
            const res = await Request.get("api_user_userInfo", {
                content: "hello"
            });
            console.log("res", res);
        } catch (e) {
            console.log("e", e);
        }
    };

    componentDidHide() {}

    onAdd = () => {
        this.callModel("add");
    };

    onDec = () => {
        this.callModel("minus");
    };

    /**
     * 搜索框扫描
     */
    onScan = () => {
        console.log("扫描事件");
        const type = Taro.getEnv();
        if (type !== "RN") {
            Taro.scanCode({ scanType: ["barCode", "qrCode"] })
                .then(res => {
                    console.log("res", res);
                })
                .catch(e => {
                    console.log("扫描错误", e);
                });
        }
    };

    routerTo = url => {
        Taro.navigateTo({
            url: url
        });
    };

    onToTest = () => {
        Taro.navigateTo({
            url: "/pages/Test/index"
        });
    };

    onToHome = () => {
        Taro.navigateTo({
            url: "/pages/home/Home/index"
        });
    };

    callModel = (type: string, data = {}) => {
        return new Promise(resolve => {
            this.props.dispatch({
                type: `hello/${type}`,
                payload: data,
                resolve
            });
        });
    };

    render() {
        return (
            <View className="index">
                <StatusBar />
                <Header />
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

export default Index as ComponentClass<PageOwnProps, PageState>;
