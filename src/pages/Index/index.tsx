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
import { SearchBar } from "@/components";

import Request from "@/utils/Request";
import { UUID } from "@/utils/utils";
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

    onMulti = () => {};

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

    onNameInput = e => {
        const { detail: { value = "" } = {} } = e;
        console.log("value", value);
        this.setState({
            name: value
        });
    };

    onSumbmit = e => {
        console.log("e", e);
        const { detail: { value = {} } = {} } = e;
        console.log("submit value", value);
    };

    renderForm = () => {
        const { name } = this.state;

        return (
            <View>
                <Form onSubmit={this.onSumbmit}>
                    <Input
                        name='name'
                        type='text'
                        onInput={this.onNameInput}
                        placeholder='请输入名称'
                        value={name}
                    />
                    <Button formType='submit'>提交</Button>
                </Form>
            </View>
        );
    };

    renderSwipperItem = () => {
        const data = [
            { url: 'https://img10.360buyimg.com/imagetools/jfs/t1/113013/34/14655/437725/5f34ef8eEa7a405ab/30d0945a08fc4c22.png' },
            { url: 'https://img11.360buyimg.com/imagetools/jfs/t1/112751/6/14929/213590/5f34ef8eE42adfb6c/259ce8a3ebff49fe.png' },
            { url: 'https://img14.360buyimg.com/imagetools/jfs/t1/150235/13/5346/468881/5f34ef8fE104f2b45/f46728fd2c561d64.png' },
            { url: 'https://img14.360buyimg.com/imagetools/jfs/t1/150235/13/5346/468881/5f34ef8fE104f2b45/f46728fd2c561d64.png' }
        ].map( item => ({...item, key: UUID()}));
        return data.map((item) => {
            const { url, key } = item;
            return (
                <SwiperItem
                    className='swipper-item'
                    key={key}
                    style={{ backgroundColor: "#8EA7E1" }}
                >
                    <Image src={url} />
                </SwiperItem>
            );
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
            <View className='index'>
                <View className='nav'>
                    <View className='header'>
                        <SearchBar onRightClick={this.onScan} />
                    </View>
                </View>
                <Swiper
                    className='swipper-container'
                    indicatorColor='#999'
                    indicatorActiveColor='#333'
                    circular
                    indicatorDots
                    interval={2000}
                    autoplay
                >
                    {this.renderSwipperItem()}
                </Swiper>

                <View>
                    <Button className='add_btn' onClick={this.onAdd}>
                        +
                    </Button>
                    <Button className='dec_btn' onClick={this.onDec}>
                        -
                    </Button>
                    <Button className='dec_btn' onClick={this.onMulti}>
                        other
                    </Button>
                    <Button
                        className='add_btn'
                        onClick={() => {
                            this.routerTo("/pages/List/index?id=2");
                        }}
                    >
                        通用列表实现
                    </Button>
                    <Button
                        className='add_btn'
                        onClick={() => {
                            this.routerTo("/pages/Form/index?type=test");
                        }}
                    >
                        通用表单
                    </Button>
                    <Button className='add_btn' onClick={this.onToTest}>
                        测试基础组件
                    </Button>
                    <Button className='add_btn' onClick={this.onToHome}>
                        首页
                    </Button>
                </View>
                {this.renderForm()}

                <Text>{this.props.count}</Text>
                <View>
                    <Text>Hello, World</Text>
                </View>
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
