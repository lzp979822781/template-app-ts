import { ComponentClass } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { View, Text, Input } from "@tarojs/components";
import {
    ImageBackground,
    ScrollView,
    RefreshControl,
    Platform,
    NativeModules,
    NativeEventEmitter,
    DeviceEventEmitter
} from "react-native";
import { JDJumping, JDDevice, JDConfirmDialog, JDNetworkErrorView } from '@jdreact/jdreact-core-lib';
import { StatusBar, Header } from "@/components/index";
import JDRequest from "@/utils/jd-request";
import { get as getGlobalData } from '@/utils/global_data';
import CardBase from "./CardBase/index";
import CardTag from "./CardTag/index";
import PurchasingInfo from "./PurchasingInfo/index";
import CardVisit from "./CardVisit/index";
import PopUpCon from "./PopUpCon/index";
import PopUpDist from "./PopUpDist/index";
import DistBtn from "./DistBtn/index";
// import BaseBtn from "./BaseBtn/index";

import "./index.scss";

type PageOwnProps = {};
type PageState = {};

class CustomerDetail extends Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
            timeout: 0,
            visible: false,
            popupType: "contact", //联系人 contact, 分配 dist, 绑定 binding
            inputValue: "",
            bindData: {},
            currentPage: 1,
            pageSize: 20,
            refreshing: false,
            loaded: false,
            lastPage: false,
            canBind: false,  //是否能绑定客户
            // showBottomBtn: false,
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



    componentWillMount() {
        this.getDetailData();
        this.listenerFn();
    }

    componentWillUnmount() {

        if (this.timer) {
            clearTimeout(this.timer);
        };

        if (this.listener) {
            this.listener.remove();
        }
    }

    timer = null;

    listener = null;

    listenerFn = () => {
        if (Platform.OS === "android") {
            JDDevice.exitApp = () => { };
            this.listener = DeviceEventEmitter.addListener(
                "appNativeNoticeUpdateCustomerDetail",
                () => {
                    this.reloadDetail();
                }
            );
        }

        if (Platform.OS === "ios") {
            const emitter = new NativeEventEmitter(NativeModules.JYNativeModule);
            this.listener = emitter.addListener("appNativeNoticeUpdateCustomerDetail", () => {
                this.reloadDetail();
            });
        }
    };


    config: Config = {
        navigationBarTitleText: "",
        disableScroll: true //currentEnv === "RN"   //使用列表滚动事件，先把外壳默认滚动禁止，防止事件覆盖。
    };

    onPopupShow = (type) => {
        this.setState({ visible: true, popupType: type });
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
        };
        // if (offsetY >= 400) {
        //     this.setState({ showBottomBtn: true })
        // } else {
        //     this.setState({ showBottomBtn: false })
        // }
    };

    canAction = false;

    //判断客户是否可以绑定
    getCanBind = async (pin) => {
        const res = await JDRequest.get("mjying_assist_partner_customer_canBind", {
            customerPin: pin
        });
        //success为true， code为1都是可以绑定的客户
        if (res.success) {
            this.setState({
                canBind: true
            });
        } else {
            this.setState({
                canBind: false
            });
        };
    }

    //客户标签
    getCustomerTags = async (pin) => {
                // 新接口：mjying_assist_tag_customertag  老接口：mjying_assist_customer_getTags
        const resCustomerTags = await JDRequest.get("mjying_assist_tag_customertag", {
            pin: pin
        });
        if (resCustomerTags.success) {
            this.setState({ customerTags: resCustomerTags.data, refreshing: false });
        } else {
            Taro.showToast({
                title: "标签获取失败",
                icon: 'none',
                duration: 1000
            });
        };
    }

    reloadDetail = async () => {
        const jyNativeData = getGlobalData('jyNativeData');
        //客户详情获取
        const resDetail = await JDRequest.get("mjying_assist_customer_getDetail", {
            customerId: jyNativeData.customerId
        });

        if (resDetail.success) {
            this.setState({ detailData: resDetail.data, refreshing: false });
            //是否有绑定客户按钮：合伙人单独接口，客户是用pin判断
            if (jyNativeData.userType === "CM") {
                this.setState({
                    canBind: !resDetail.data.pin
                });
            } else {
                this.getCanBind(resDetail.data.pin);
            };
        } else {
            Taro.showToast({
                title: resDetail.errorMsg,
                icon: 'none',
                duration: 1000
            });
            this.setState({ timeout: resDetail.timeout, refreshing: false });
        };

    }

    getDetailData = async () => {
        //获取原生提供的客户id

        const jyNativeData = getGlobalData('jyNativeData');

        this.getVisitDate();
        //客户详情获取
        const resDetail = await JDRequest.get("mjying_assist_customer_getDetail", {
            customerId: jyNativeData.customerId
        });
        Taro.hideLoading();
        if (resDetail.success) {

            this.setState({ detailData: resDetail.data, refreshing: false });
            if (resDetail.data.pin) {
                this.getCustomerTags(resDetail.data.pin)
            }

            //是否有绑定客户按钮：合伙人单独接口，客户是用pin判断
            if (jyNativeData.userType === "CM") {
                this.setState({
                    canBind: !resDetail.data.pin
                });
            } else {
                this.getCanBind(resDetail.data.pin);
            };
        } else {
            Taro.showToast({
                title: resDetail.errorMsg,
                icon: 'none',
                duration: 1000
            });
            this.setState({ timeout: resDetail.timeout, refreshing: false });
        };
    };

    getVisitDate = async () => {
        const jyNativeData = getGlobalData('jyNativeData');
        const { currentPage, pageSize, refreshing } = this.state;

        if (!refreshing) {
            Taro.showLoading({
                title: "加载中"
            });
        };

        //拜访记录列表获取
        const params = {
            customerId: jyNativeData.customerId,
            status: 2, // 任务状态：1未完成，2已完成，3已超时
            pageNum: currentPage,
            pageSize: pageSize,
            appName: jyNativeData.userType === "CM" ? "saint" : "partner" // 系统来源：saint-地勤,partner-合伙人
        };

        const resVisit = await JDRequest.post("mjying_assist_visit_task_searchList", params);

        Taro.hideLoading();
        if (resVisit.success) {
            this.setVisitListData(resVisit);
        } else {
            Taro.showToast({
                title: "拜访列表获取失败",
                icon: 'none',
                duration: 1000
            })
            this.setState({
                currentPage: currentPage > 1 ? currentPage - 1 : 1,
                refreshing: false
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
                loaded: true,
                lastPage
            },
            () => {
                if (resData.length < this.state.pageSize) {
                    this.canAction = false;
                } else {
                    this.timer = setTimeout(() => {
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
                currentPage: 1,
                timeout: 0
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

    renderBindDialog() {
        const { visible, popupType, bindData } = this.state;
        return (
            <JDConfirmDialog
                show={visible && popupType === "binding"}
                onClose={this.onPopupClose}
                onConfirm={this.bindCustomer}
            >
                <View className='jd-dialog-con'>
                    <Text className='jd-dialog-txt'>客户名称：{bindData.companyName || "--"}</Text>
                    <Text className='jd-dialog-txt'>客户类型：{bindData.storeTypeName || "--"}</Text>
                    <Text className='jd-dialog-txt'>客户经理：{bindData.userName}</Text>
                </View>
            </JDConfirmDialog>
        );
    }

    //确认绑定客户
    bindCustomer = async () => {
        const { inputValue } = this.state;
        const jyNativeData = getGlobalData('jyNativeData');
        //绑定客户
        this.setState({
            visible: false
        });

        const uri = jyNativeData.userType === "CM" ? "mjying_assist_customer_merge" : "mjying_assist_partner_customer_bind";
        const res = await JDRequest.post(uri, {
            pin: inputValue,
            customerId: jyNativeData.customerId
        });

        if (res.success) {
            NativeModules.JYNativeModule.updateCustomerList();
            this.setState({ visible: false }, () => {
                Taro.showToast({
                    title: "绑定成功",
                    icon: 'success',
                    duration: 1500
                });
                this.timer = setTimeout(() => {
                    JDJumping.jumpToBack();
                }, 1500);
            });
        } else {
            this.setState({ visible: false }, () => {
                Taro.showToast({
                    title: res.errorMsg,
                    icon: 'none',
                    duration: 1500
                });
            });
        }
    }

    renderInputDialog() {
        const jyNativeData = getGlobalData('jyNativeData');
        const { visible, popupType, inputValue } = this.state;
        return (
            <JDConfirmDialog
                show={visible && popupType === "input"}
                onClose={this.onPopupClose}
                onConfirm={jyNativeData.userType === "CM" ? this.getBindData : this.bindCustomer}
            >
                <View className='jd-dialog-input-con'>
                    <Input className='custom-pin-input' type='text' value={inputValue} placeholder='请输入客户pin' focus onInput={this.onChange} />
                </View>
            </JDConfirmDialog>
        );
    }

    //获取绑定信息，做绑定前确认
    getBindData = async () => {
        const { inputValue } = this.state;
        const jyNativeData = getGlobalData('jyNativeData');

        const functionId = jyNativeData.userType === "CM" ? "mjying_assist_customer_merge_getCustomer" : "mjying_assist_partner_authinfo"
        //客户详情获取
        const res = await JDRequest.get(functionId, {
            pin: inputValue
        });
        if (res.success) {

            this.setState({ bindData: res.data, popupType: "binding" });
        } else {
            this.setState({ visible: false }, () => {
                Taro.showToast({
                    title: res.errorMsg,
                    icon: 'none',
                    duration: 2000
                });

                this.timer = setTimeout(() => {
                    this.setState({ visible: true });
                }, 2000);
            });

        };
    }

    onChange = (e) => {
        this.setState({
            inputValue: e.target.value
        });
    }

    render() {
        const jyNativeData = getGlobalData('jyNativeData');
        const statusBarHeight = getGlobalData('statusBarHeight');
        const { detailData, customerTags, visitListData, lastPage, loaded, visible, popupType, canBind, pageSize, timeout } = this.state;
        //地勤能分配，合伙人没有分配
        const renderRight = jyNativeData.userType === "CM" && jyNativeData.isManager ? <DistBtn onPopupShow={() => this.onPopupShow("dist")} /> : null;

        if (timeout === 1) {
            return <View className='container'>
                <StatusBar></StatusBar>
                <Header
                    title='客户详情'
                    backApp
                />
                <JDNetworkErrorView onRetry={this.onRefresh} />
            </View>
        };

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
                    <Header
                        title='客户详情'
                        noBgColor
                        backApp
                        // eslint-disable-next-line taro/render-props 
                        renderRight={renderRight}
                    />
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
                    <CardBase data={detailData} onPopupShow={(type) => this.onPopupShow(type)} canBind={canBind} />
                    <CardTag loaded={loaded} data={detailData} tagsData={customerTags} />
                    {jyNativeData.userType === "CM" ? <PurchasingInfo data={detailData} /> : null}
                    <CardVisit lastPage={lastPage} pageSize={pageSize} loaded={loaded} data={detailData} visitList={visitListData} />
                </ScrollView>
                {/* {showBottomBtn && <View className='bottom-btn-con'>
                    <BaseBtn onPopupShow={(type) => this.onPopupShow(type)} canBind={canBind} />
                </View>} */}
                <PopUpDist
                    visible={visible && popupType === "dist"}
                    onPopupClose={this.onPopupClose}
                />
                <PopUpCon
                    data={detailData.contacts || []}
                    visible={visible && popupType === "contact"}
                    onPopupClose={this.onPopupClose}
                />
                {this.renderBindDialog()}
                {this.renderInputDialog()}
            </View>
        );
    }
}

export default CustomerDetail as ComponentClass<PageOwnProps, PageState>;
