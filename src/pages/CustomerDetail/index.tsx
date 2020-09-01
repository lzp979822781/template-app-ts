import { ComponentClass } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { ImageBackground, ScrollView, RefreshControl } from "react-native";
import Header from "@/components/Header";
import StatusBar from "@/components/StatusBar/index";
import bgImage from "@/assets/images/customer-bg@3x.png";
import CardBase from "./CardBase/index";
import CardTag from "./CardTag/index";
import PurchasingInfo from "./PurchasingInfo/index";
import CardVisit from "./CardVisit/index";
import PopUpCon from "./PopUpCon/index";

import "./index.scss";

type PageOwnProps = {};
type PageState = {};

class OrderRecord extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            // currentPage: 1,
            refreshing: false
            // data: []
        };
        this.onRefresh = this.onRefresh.bind(this);
        this.onEndReached = this.onEndReached.bind(this);
    };

    config: Config = {
        disableScroll: true //currentEnv === "RN"   //使用列表滚动事件，先把外壳默认滚动禁止，防止事件覆盖。
    };

    onPopupShow = () => {
        this.setState({ visible: true });
    };

    onPopupClose = () => {
        this.setState({ visible: false });
    };

    _contentViewScroll = (e: Record<string, any>) => {
        const offsetY = e.nativeEvent.contentOffset.y; //滑动距离
        const contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
        const oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
        if (offsetY + oriageScrollHeight + 10 >= contentSizeHeight) {
            this.onEndReached();
        }
    };

    canAction = false;

    componentDidShow() {
        this.loadList();
    }

    loadList = async () => {
        setTimeout(() => {
            this.setState({
                refreshing: false
            });
        }, 3000);
        // const { currentPage, active } = this.state;
        // try {
        //     const res = await Request.get("api_partnerVender_list", {
        //         currentPage: currentPage,
        //         pageSize: 10,
        //         venderType: active.id
        //     });

        //     let listData = this.state.data;
        //     let data = [];
        //     if (res.data.data) {
        //         data = res.data.data.result;
        //     }

        //     if (currentPage === 1) {
        //         listData = data;
        //     } else {
        //         listData = listData.concat(data);
        //     }

        //     // console.log("res", res);
        //     this.setState(
        //         {
        //             data: listData,
        //             refreshing: false,
        //             ...res.data.data.page
        //             //   statusCode: response.code,
        //         },
        //         () => {
        //             if (data.length < this.state.pageSize) {
        //                 this.canAction = false;
        //             } else {
        //                 setTimeout(() => {
        //                     this.canAction = true;
        //                 }, 50);
        //             }
        //         }
        //     );
        // } catch (e) {
        //     console.log("e", e);
        // }
        // Taro.hideLoading();
    };

    onRefresh() {
        this.setState({
            refreshing: true
        });
        this.loadList();
        // this.setState(
        //     {
        //         refreshing: true,
        //         currentPage: 1
        //     },
        //     () => {
        //         this.loadList();
        //     }
        // );
    };

    onEndReached() {
        Taro.showToast({
            title: "底部",
            icon: "none",
            duration: 500
        }).then(res => console.log(res));

        // if (this.canAction) {
        //     Taro.showLoading({
        //         title: "加载中"
        //     });
        //     this.canAction = false;
        //     const currentPage = this.state.currentPage + 1;

        //     this.setState(
        //         {
        //             currentPage
        //         },
        //         () => {
        //             this.loadList();
        //         }
        //     );
        // }
    };

    render() {
        return (
            <View className='container'>
                <ImageBackground
                    source={{ uri: bgImage }}
                    style={{
                        resizeMode: "repeat",
                        height: 160
                    }}
                >
                    <StatusBar noBgColor></StatusBar>
                    <Header title='客户详情' noBgColor></Header>
                </ImageBackground>
                <ScrollView
                    style={{
                        flex: 1,
                        height: "100%",
                        zIndex: 100,
                        marginTop: -80
                    }}
                    onMomentumScrollEnd={this._contentViewScroll}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                        />
                    }
                >
                    <View className='no-bg-gap' />
                    <CardBase onPopupShow={this.onPopupShow} />
                    <CardTag />
                    <PurchasingInfo />
                    <CardVisit />
                    <PopUpCon
                        visible={this.state.visible}
                        onPopupClose={this.onPopupClose}
                    />
                </ScrollView>
            </View>
        );
    }
}

export default OrderRecord as ComponentClass<PageOwnProps, PageState>;
