import Taro, { Component, Config } from "@tarojs/taro";
import { View, ScrollView, Text, Image } from "@tarojs/components";
import Header from "@/components/Header";
import StatusBar from "@/components/StatusBar/index";
import Gradient from "@/components/Gradient";
import { hoverStyle } from "@/utils/utils";
import JDRequest from "@/utils/jd-request";
import { get as getGlobalData } from '@/utils/global_data';
import Phone from "@/assets/images/phone@3x.png";
import PlanBtnIcon from "@/assets/images/plan-btn-icon@3x.png";
import ListItem from "./ListItem/index";
import PopUpCon from "./PopUpCon/index";
import "./index.scss";

export default class PlanDetail extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            tastDetail: {
                companyName: "医药城下沉112公司",
                address: "沃尔沃二无热无若无热翁人",
                creatorName: "张三丰",
                visitorList: []
            }
        };
    }

    config: Config = {
        disableScroll: true //currentEnv === "RN"   //使用列表滚动事件，先把外壳默认滚动禁止，防止事件覆盖。
    };

    componentDidShow() {
        // this.getData();
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

        if (res.success) {
            this.setState({
                tastDetail: res.data
            })
        };

        Taro.hideLoading();
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
        if(tastDetail.visitorList || tastDetail.visitorList.length > 0){
            const arrayName = tastDetail.visitorList.map((item) => {
                return item.contactName
            });
    
            return arrayName.join()
        };
        
        return "--";
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
                            {tastDetail.companyName || "--"}
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
                                <Text className='plan-status-txt'>{tastDetail.taskStatusName || "--"}</Text>
                            </Gradient>
                        </View>
                        <View className='contact-address-con'>
                            <View className='con-address'>
                                <Text className='con-address-txt'>
                                    {tastDetail.address || "--"}
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
                                        src={Phone}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View className='card-operation'>
                        <ListItem label='创建人' value={tastDetail.creator || "--"} />
                        <ListItem label='客户经理' value={tastDetail.userName || "--"} />
                        <ListItem label='拜访日期' value={tastDetail.finishDate || "--"} />
                        <ListItem label='被拜访人' value={this.renderContact()} />
                        <ListItem label='拜访目的' value={tastDetail.taskMemoName || "--"} />
                        <ListItem label='拜访类型' value={tastDetail.taskModelName || "--"} />
                        <ListItem label='拜访方式' value={tastDetail.taskWayName || "--"} />
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
                                src={PlanBtnIcon}
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
