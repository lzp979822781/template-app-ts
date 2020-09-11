import { ComponentClass } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { View, Image, Input } from "@tarojs/components";
import { ImageBackground, ScrollView, RefreshControl } from "react-native";
// import { Toast } from '@ant-design/react-native';
import { JDConfirmDialog } from '@jdreact/jdreact-core-lib';
import { StatusBar, Header } from "@/components/index";
import JDRequest from "@/utils/jd-request";
import { hoverStyle } from "@/utils/utils";
import { get as getGlobalData } from '@/utils/global_data';
import CardBase from "./CardBase/index";
import CardTag from "./CardTag/index";
import PurchasingInfo from "./PurchasingInfo/index";
import CardVisit from "./CardVisit/index";
import PopUpCon from "./PopUpCon/index";
import PopUpDist from "./PopUpDist/index"

import "./index.scss";

type PageOwnProps = {};
type PageState = {};

class CustomerDetail extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            // toast: false,
            popupType: "contact", //联系人 contact, 分配 dist, 绑定 binding
            inputValue: "",
            currentPage: 1,
            pageSize: 20,
            refreshing: false,
            loaded: false,
            lastPage: false,
            canBind: false,
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

    // componentDidShow() {

    // }

    componentWillMount() {
        this.getDetailData();
    }

    componentWillUnmount() {
    }

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
        }
    };

    canAction = false;

    //判断客户是否可以绑定
    getCanBind = async (pin) => {
        const res = await JDRequest.get("/assist/partner/customer/canBind", {
            customerPin: pin
        });

        if (res.success) {
            this.setState({
                canBind: res.code === 1
            });
        } else {
            Taro.showToast({
                title: res.errorMsg,
                icon: 'none',
                duration: 1000
            })
        }
    }

    getCustomerTags = async (pin) => {
        const resCustomerTags = await JDRequest.get("mjying_assist_customer_getTags", {
            pin: pin
        });


        if (resCustomerTags.success) {
            this.setState({ customerTags: resCustomerTags.data, refreshing: false });
        } else {
            Taro.showToast({
                title: resCustomerTags.errorMsg,
                icon: 'none',
                duration: 1000
            });
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
        //客户标签
       

        debugger
        Taro.hideLoading();
        if (resDetail.success) {
            this.setState({ detailData: resDetail.data, refreshing: false });

            this.getCustomerTags(resDetail.data.pin)

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
            queryType: 1, // 查询类型：1.我的任务 2.下属任务
            pageNum: currentPage,
            pageSize: pageSize,
            appName: jyNativeData.userType === "CM" ? "saint" : "partner" // 系统来源：saint-地勤,partner-合伙人
        };
        // console.log(JSON.stringify(params));

        const resVisit = await JDRequest.post("mjying_assist_visit_task_searchList", params);
        Taro.hideLoading();
        if (resVisit.success) {
            this.setVisitListData(resVisit);
        } else {
            Taro.showToast({
                title: resVisit.errorMsg,
                icon: 'none',
                duration: 1000
            })
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

    //确认绑定客户
    onConfirm = async () => {
        const { inputValue } = this.state;
        const jyNativeData = getGlobalData('jyNativeData');
        //绑定客户
        this.setState({
            visible: false
        });

        // Taro.showLoading({
        //     title: "加载中"
        // });

        const uri = jyNativeData.userType === "CM" ? "mjying_assist_customer_merge" : "mjying_assist_partner_customer_bind";
        const res = await JDRequest.get(uri, {
            pin: inputValue,
            customerId: jyNativeData.customerId
        });

        // this.setState({
        //     toast: true
        // });

        // setTimeout(() => {
        //     this.setState({
        //         toast: false
        //     });

        // }, 2000);

        Taro.hideLoading();
        if (res.success && res.code === 1) {
            // Toast.info('This is a toast tips 3 !!!', 1);
            Taro.showToast({
                title: "绑定成功",
                icon: 'success',
                duration: 2000
            });
        } else {
            // Toast.info('This is a toast tips 3 !!!', 1);
            Taro.showToast({
                title: "绑定失败",
                icon: 'none',
                duration: 2000,
                complete: () => {
                    setTimeout(() => {
                        this.setState({
                            visible: true
                        })
                    }, 2500);
                }
            })
        }
    }

    onChange = (e) => {
        this.setState({
            inputValue: e.target.value
        });
    }

    renderConfirmDialog() {
        const { visible, popupType, inputValue } = this.state;
        return (
            <JDConfirmDialog
                show={visible && popupType === "binding"}
                onClose={this.onPopupClose}
                onConfirm={this.onConfirm}
            >
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: "100%",
                    padding: 30
                }}
                >
                    <Input className='custom-pin-input' type='text' value={inputValue} placeholder='请输入客户pin' focus onInput={this.onChange} />
                </View>
            </JDConfirmDialog>
        );
    }

    renderHeaderRight = () => {
        return <View
            className='customer-head-right'
        >
            <View
                className='head-right-btn-con'
                onClick={() => this.onPopupShow("dist")}
                hoverStyle={hoverStyle}
            >
                <Image
                    className='head-right-btn'
                    src='https://img11.360buyimg.com/imagetools/jfs/t1/112573/14/17669/800/5f5a1513E402fed84/37fcf5d8c360e8be.png'
                />
            </View>
        </View>
    }

    render() {

        const statusBarHeight = getGlobalData('statusBarHeight');
        const { detailData, customerTags, visitListData, lastPage, loaded, visible, popupType, canBind } = this.state;
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
                        renderRight={this.renderHeaderRight()}
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
                    <PurchasingInfo data={detailData} />
                    <CardVisit lastPage={lastPage} loaded={loaded} data={detailData} visitList={visitListData} />
                </ScrollView>
                <PopUpDist
                    visible={visible && popupType === "dist"}
                    onPopupClose={this.onPopupClose}
                />
                <PopUpCon
                    data={detailData.contacts || []}
                    visible={visible && popupType === "contact"}
                    onPopupClose={this.onPopupClose}
                />
                {this.renderConfirmDialog()}
            </View>
        );
    }
}

export default CustomerDetail as ComponentClass<PageOwnProps, PageState>;
