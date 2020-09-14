import Taro, { Component, Config } from "@tarojs/taro";
import { View, ScrollView, Text, Image } from "@tarojs/components";
import { StatusBar, Header, Gradient, JDListItem } from "@/components/index";
import { Modal, Dimensions } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import { JDJumping } from "@jdreact/jdreact-core-lib";
import { hoverStyle } from "@/utils/utils";
import JDRequest from "@/utils/jd-request";
import { get as getGlobalData } from '@/utils/global_data';
import PopUpCon from "./PopUpCon/index";
import PlanBtn from "./PlanBtn/index";
import "./index.scss";

const { width } = Dimensions.get("window");

// 任务状态：0待进行，1已提交，2已完成，3已超时
const TaskStatus = [{
    txt: "待进行",
    color: ""
}, {
    txt: "已提交",
    color: ""
}, {
    txt: "已完成",
    color: ""
}, {
    txt: "已超时",
    color: ""
}]


export default class PlanDetail extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            visibleImg: false,
            shouIndex: 0,
            tastDetail: {
                visible: false,
                noneTxt: "",
                companyName: "",
                address: "",
                creatorName: "",
                visitorList: []
            }
        };
    }

    config: Config = {
        disableScroll: true //currentEnv === "RN"   //使用列表滚动事件，先把外壳默认滚动禁止，防止事件覆盖。
    };

    back = false;

    componentWillMount() {
        this.getData();
    }

    // componentDidShow() {
    //     if (this.back) {
    //         this.getData();
    //     }
    // }

    getData = async () => {

        Taro.showLoading({
            title: "加载中"
        });

        const jyNativeData = getGlobalData('jyNativeData');

        const params = this.$router.params;
        const res = await JDRequest.get("mjying_assist_visit_task_getInfo", {
            taskId: params.taskId || jyNativeData.taskId
        });
        Taro.hideLoading();
        this.back = true;
        if (res.success) {
            this.setState({
                tastDetail: res.data,
                noneTxt: "无"
            });

        } else {
            Taro.showToast({
                title: "计划详情获取失败",
                icon: 'none',
                duration: 2000
            })
        };
    };

    jumpToApp(des, params = {}) {
        // console.log(`openApp.jyingApp://virtual?params={"category":"jump","des":"${des}", "params": ${JSON.stringify({customerPin: data.pin})}}`)
        JDJumping.jumpToOpenapp(
            `openApp.jyingApp://virtual?params={"category":"jump","des":"${des}", "params": ${JSON.stringify(params)}}`
        )
    }

    onPopupShow = () => {
        this.setState({ visible: true });
    };

    onPopupClose = () => {
        this.setState({ visible: false });
    };

    onPopupShowImg= () => {
        this.setState({ visibleImg: false });
    };

    renderContact = () => {
        const { tastDetail, noneTxt } = this.state;
        if (tastDetail.visitorList && tastDetail.visitorList.length > 0) {
            const arrayName = tastDetail.visitorList.map((item) => {
                return item.contactName
            });

            return arrayName.join()
        };

        return noneTxt;
    };

    renderRight = () => {
        const { tastDetail } = this.state;
        if (!tastDetail.canBeModified) {
            return null;
        };

        const params = {
            customerId: tastDetail.customerId,
            taskId: tastDetail.id
        };

        return <View
            className='head-right-btn'
        >
            <View
                className='head-right-btn-con'
                onClick={() => { this.jumpToApp("VisitPlanEditPage", params) }}
                hoverStyle={hoverStyle}
            >
                <Text className='head-right-btn-txt'>
                    编辑
                </Text>
            </View>
        </View>
    }

    renderImage = () => {
        const { tastDetail } = this.state;
        const visitImgUrlList = tastDetail.visitImgUrlList || [];

        return visitImgUrlList.map((item, index) => {
            return <View
                key={item}
                onClick={() => {
                    this.setState({ visibleImg: true, shouIndex: index })
                }}
            >
                <Image
                    className='visit-item-img'
                    src={item}
                />
            </View>
        })
    }

    render() {
        const jyNativeData = getGlobalData('jyNativeData');
        const { tastDetail, noneTxt } = this.state;
        const Shadow = {
            shadowColor: "#f5f5f5",
            shadowOffset: { w: 10, h: 2 },
            shadowOpacity: 1,
            shadowRadius: 10,
            elevation: 2
        };

        const showPhone = tastDetail.visitorList && tastDetail.visitorList.length > 0;

        const taskMemoList = tastDetail.taskMemoList || []
        const taskMemoName = taskMemoList.map((item) => {
            return item.name
        }).join();

        const imgUrlList = tastDetail.visitImgUrlList || [];
        const visitImgUrlList = imgUrlList.map((item) => {
            return {
                url: item
            }
        })

        return (
            <View className='container'>
                <StatusBar />
                <Header title='计划详情' backApp={!!jyNativeData.taskId} renderRight={this.renderRight()} />
                <ScrollView className='container'>
                    <View className='plan-banner-bg'></View>
                    <View className='card-base' style={Shadow}>
                        <Text className='card-base-title'>
                            {tastDetail.customerName || noneTxt}
                        </Text>
                        <View className='plan-status'>
                            <Gradient
                                style={{
                                    width: 62,
                                    height: 22,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: 11
                                }}
                                angle={0}
                                colors={["#FF6600", "#FF9B00"]}
                            >
                                <Text className='plan-status-txt'>{[0, 1, 2, 3].includes(tastDetail.taskStatus) ? TaskStatus[tastDetail.taskStatus].txt : noneTxt}</Text>
                            </Gradient>
                            <Text className='signed-txt'>
                                {tastDetail.hasSigned ? "已打卡" : "未打卡"}
                            </Text>
                        </View>
                        <View className='contact-address-con'>
                            <View className='con-address'>
                                <Text className='con-address-txt'>
                                    {tastDetail.customerAddress || noneTxt}
                                </Text>
                            </View>
                            {showPhone ? <View className='contact-address-divide'></View> : null}
                            {showPhone ? <View className='con-contact'>
                                <View
                                    className='contact-img-con'
                                    onClick={this.onPopupShow}
                                    hoverStyle={hoverStyle}
                                >
                                    <Image
                                        className='contact-img'
                                        src='https://img12.360buyimg.com/imagetools/jfs/t1/128651/9/12268/1100/5f58ac4eEa6562e75/38280dd6bf5b0fb4.png'
                                    />
                                </View>
                            </View> : null}
                        </View>
                    </View>
                    <View className='card-operation'>
                        <JDListItem label='创建人' value={tastDetail.creatorName || noneTxt} />
                        <JDListItem label='客户经理' value={tastDetail.userName || noneTxt} />
                        <JDListItem label='拜访日期' value={tastDetail.finishDate || noneTxt} />
                        <JDListItem label='被拜访人' value={this.renderContact()} />
                        <JDListItem label='拜访目的' value={taskMemoName || noneTxt} />
                        <JDListItem label='拜访类型' value={tastDetail.taskModelName || noneTxt} />
                        <JDListItem label='拜访方式' value={tastDetail.taskWayName || noneTxt} />
                        {tastDetail.taskStatus === 2 ? <JDListItem label='拜访纪要' value={tastDetail.commContent || noneTxt} /> : null}
                        {tastDetail.taskStatus === 2 ? <JDListItem label='图片' renderValue={this.renderImage()} /> : null}
                    </View>
                </ScrollView>
                <PlanBtn data={tastDetail} />
                <PopUpCon
                    data={tastDetail.visitorList || []}
                    visible={this.state.visible}
                    onPopupClose={this.onPopupClose}
                />
                <Modal
                    visible={this.state.visibleImg}
                    animationType='fade'
                    transparent
                    presentationStyle='overFullScreen'
                >
                    <ImageViewer
                        backgroundColor='#rgba(0, 0, 0, 0.8)'
                        onClick={this.onPopupShowImg}
                        renderFooter={() => {
                            return (
                                <View
                                    style={{ width: width }}
                                    className='image-viewer-close'
                                    onClick={this.onPopupShowImg}
                                >
                                    <Text className='image-viewer-close-icon'>关闭</Text>
                                </View>
                            );
                        }}
                        index={this.state.shouIndex}
                        imageUrls={visitImgUrlList}
                    />
                </Modal>
            </View >
        );
    }
}
