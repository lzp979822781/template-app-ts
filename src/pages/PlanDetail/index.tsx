import Taro, { Component, Config } from "@tarojs/taro";
import { View, ScrollView, Text, Image } from "@tarojs/components";
import { StatusBar, Header, Gradient, JDListItem } from "@/components/index";
import { hoverStyle } from "@/utils/utils";
import JDRequest from "@/utils/jd-request";
import { get as getGlobalData } from '@/utils/global_data';
import PopUpCon from "./PopUpCon/index";
import "./index.scss";

const noneTxt = "无";

export default class PlanDetail extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            tastDetail: {
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

    componentDidShow() {
        this.getData();
    }

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
        
        if (res.success) {
            this.setState({
                tastDetail: res.data
            })
        }else{
            Taro.showToast({
                title: "计划详情获取失败",
                icon: 'none',
                duration: 2000
            })
        };
    };

    jumpTo = () => {
        Taro.showToast({
            title: "成功",
            icon: "success",
            duration: 2000
        }).then(res => console.log(res));
    };

    onPopupShow = () => {
        this.setState({ visible: true });
    };

    onPopupClose = () => {
        this.setState({ visible: false });
    };

    renderContact = () => {
        const { tastDetail } = this.state;
        if(tastDetail.visitorList && tastDetail.visitorList.length > 0){
            const arrayName = tastDetail.visitorList.map((item) => {
                return item.contactName
            });
    
            return arrayName.join()
        };
        
        return  noneTxt;
    };

    render() {
        const { tastDetail } = this.state;
        const Shadow = {
            shadowColor: "#f5f5f5",
            shadowOffset: { w: 10, h: 2 },
            shadowOpacity: 1,
            shadowRadius: 10,
            elevation: 2
        };

        return (
            <View className='container'>
                <StatusBar />
                <Header title='计划详情' backApp />
                <ScrollView className='container'>
                    <View className='plan-banner-bg'></View>
                    <View className='card-base' style={Shadow}>
                        <Text className='card-base-title'>
                            {tastDetail.companyName || noneTxt}
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
                                <Text className='plan-status-txt'>{tastDetail.taskStatusName || noneTxt}</Text>
                            </Gradient>
                        </View>
                        <View className='contact-address-con'>
                            <View className='con-address'>
                                <Text className='con-address-txt'>
                                    {tastDetail.address || noneTxt}
                                </Text>
                            </View>
                            <View className='contact-address-divide'></View>
                            <View className='con-contact'>
                                <View
                                    className='contact-img-con'
                                    onClick={this.onPopupShow}
                                    hoverStyle={hoverStyle}
                                >
                                    <Image
                                        className='contact-img'
                                        src="https://img12.360buyimg.com/imagetools/jfs/t1/128651/9/12268/1100/5f58ac4eEa6562e75/38280dd6bf5b0fb4.png"
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className='card-operation'>
                        <JDListItem label='创建人' value={tastDetail.creator || noneTxt} />
                        <JDListItem label='客户经理' value={tastDetail.userName || noneTxt} />
                        <JDListItem label='拜访日期' value={tastDetail.finishDate || noneTxt} />
                        <JDListItem label='被拜访人' value={this.renderContact()} />
                        <JDListItem label='拜访目的' value={tastDetail.taskMemoName || noneTxt} />
                        <JDListItem label='拜访类型' value={tastDetail.taskModelName || noneTxt} />
                        <JDListItem label='拜访方式' value={tastDetail.taskWayName || noneTxt} />
                    </View>
                    {tastDetail.canBeModified ? <View
                        className='plan-btn'
                        onClick={this.jumpTo}
                        hoverStyle={hoverStyle}
                    >
                        <Gradient
                            style={{
                                flex: 1,
                                flexDirection: "row",
                                height: 50,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 25
                            }}
                            angle={0}
                            colors={["#EC1B1B", "#FF511D"]}
                        >
                            <Image
                                className='plan-btn-icon'
                                src="https://img10.360buyimg.com/imagetools/jfs/t1/113628/40/17503/916/5f58ac4eEb273925e/f9adf5d054778889.png"
                            />
                            <Text className='plan-btn-txt'>拜访纪要</Text>
                        </Gradient>
                    </View> : null}
                </ScrollView>
                <PopUpCon
                    data={tastDetail.visitorList || []}
                    visible={this.state.visible}
                    onPopupClose={this.onPopupClose}
                />
            </View>
        );
    }
}
