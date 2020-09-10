import { ComponentClass } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { ImageBackground, ScrollView, RefreshControl } from "react-native";
import { StatusBar, Header } from "@/components/index";
import { Toast } from '@ant-design/react-native';
import JDRequest from "@/utils/jd-request";
import { get as getGlobalData } from '@/utils/global_data';
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
            currentPage: 1,
            pageSize: 20,
            refreshing: false,
            lastPage: false,
            detailData: {},
            customerTags: {
                "1": [],
                "2": [],
                "3": []
            },
            visitListData: []
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
        this.getDetailData();
    }
    getDetailData = async () => {
        //获取原生提供的客户id
        
        const jyNativeData = getGlobalData('jyNativeData');

        this.getVisitDate();
        //客户详情获取
        const resDetail = await JDRequest.get("mjying_assist_customer_getDetail", {
            customerId: jyNativeData.customerId
        });

        //客户标签
        const resCustomerTags = await JDRequest.get("mjying_assist_customer_getTags", {
            pin: resDetail.data.pin
        });


        if (resDetail.success && resCustomerTags.success) {
            this.setState({ detailData: resDetail.data, customerTags: resCustomerTags.data, refreshing: false })
        }else{
            Toast.info(resDetail.errorMsg, 1);
        }

        
    };

    getVisitDate = async () => {
        const jyNativeData = getGlobalData('jyNativeData');
        const { currentPage, pageSize } = this.state;

        Taro.showLoading({
            title: "加载中"
        });

        //拜访记录列表获取
        const resVisit = await JDRequest.post("mjying_assist_visit_task_searchList", {
            customerId: jyNativeData.customerId,
            status: 2, // 任务状态：1未完成，2已完成，3已超时
            queryType: 1, // 查询类型：1.我的任务 2.下属任务
            pageNum: currentPage,
            pageSize: pageSize,
            appName: jyNativeData.userType // 系统来源：saint-地勤,partner-合伙人
        });

        Taro.hideLoading();
        if (resVisit.success) {
            this.setVisitListData(resVisit);
        } else {
            Toast.info(resVisit.errorMsg, 1);
            this.setState({
                currentPage: currentPage > 1 ? currentPage - 1 : 1
            })
        };
    }

    setVisitListData = (res) => {
        let visitListData = this.state.visitListData;
        let resData = [];
        let lastPage = false;
        const currentPage = this.state.currentPage;


        resData = res.data.data || [];
        lastPage = res.data.lastPage;

        if (currentPage === 1) {
            visitListData = resData;
        } else {
            visitListData = visitListData.concat(resData);
        }

        this.setState(
            {
                visitListData: visitListData,
                refreshing: false,
                lastPage
            },
            () => {
                if (resData.length < this.state.pageSize) {
                    this.canAction = false;
                } else {
                    setTimeout(() => {
                        this.canAction = true;
                    }, 50);
                }
            }
        );
    };

    onRefresh() {
        this.setState(
            {
                refreshing: true,
                currentPage: 1
            },
            () => {
                this.getDetailData();
            }
        );
    };

    onEndReached() {
        if (this.canAction) {
            Taro.showLoading({
                title: "加载中"
            });
            this.canAction = false;
            const currentPage = this.state.currentPage + 1;

            this.setState(
                {
                    currentPage
                },
                () => {
                    this.getVisitDate();
                }
            );
        }
    };

    render() {

        const statusBarHeight = getGlobalData('statusBarHeight');
        const { detailData, customerTags, visitListData, lastPage } = this.state;
        return (
            <View className='container'>
                <ImageBackground
                    source={{ uri: "https://img10.360buyimg.com/imagetools/jfs/t1/148849/4/8068/212960/5f58ac4eE89463cb5/ffba549489bfd3e0.png" }}
                    style={{
                        resizeMode: "repeat",
                        height: 134 + statusBarHeight
                    }}
                >
                    <StatusBar noBgColor></StatusBar>
                    <Header title='客户详情' noBgColor backApp></Header>
                </ImageBackground>
                <ScrollView
                    style={{
                        flex: 1,
                        height: "100%",
                        zIndex: 100,
                        marginTop: -86
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
                    <CardBase data={detailData} onPopupShow={this.onPopupShow} />
                    <CardTag data={detailData} tagsData={customerTags} />
                    <PurchasingInfo data={detailData} />
                    <CardVisit lastPage={lastPage} data={detailData} visitList={visitListData} />
                    <PopUpCon
                        data={detailData.contacts || []}
                        visible={this.state.visible}
                        onPopupClose={this.onPopupClose}
                    />
                </ScrollView>
            </View>
        );
    }
}

export default OrderRecord as ComponentClass<PageOwnProps, PageState>;
