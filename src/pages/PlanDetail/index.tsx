import Taro, { Component, Config } from "@tarojs/taro";
import { View, ScrollView, Text, Image } from "@tarojs/components";
import Header from "@/components/Header";
import StatusBar from "@/components/StatusBar/index";
import Gradient from "@/components/Gradient";
import { hoverStyle } from "@/utils/utils";
import JDRequest from "@/utils/jd-request";
import Phone from "@/assets/images/phone@3x.png";
import PlanBtnIcon from "@/assets/images/plan-btn-icon@3x.png";
import ListItem from "./ListItem/index";
import "./index.scss";

export default class PlanDetail extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {};
    }

    config: Config = {
        disableScroll: true //currentEnv === "RN"   //使用列表滚动事件，先把外壳默认滚动禁止，防止事件覆盖。
    };

    componentDidShow() {
        this.getData();
    }

    getData = async () =>  {
        const res = await JDRequest.get("mjying_assist_customer_getTags");
        console.log(res);
    };
    
    jumpTo = () => {
        Taro.showToast({
            title: "成功",
            icon: "success",
            duration: 2000
        }).then(res => console.log(res));
    };

    makePhoneCall = obj => {
        Taro.makePhoneCall({
            phoneNumber: "18301442850" //仅为示例，并非真实的电话号码
        });
    };

    render() {
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
                            北京悦康松百姓平安药有限公司…
                        </Text>
                        <View className='plan-status'>
                            <Text className='plan-status-txt2'>待进行</Text>
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
                                <Text className='plan-status-txt'>已认证</Text>
                            </Gradient>
                        </View>

                        <View className='contact-address-con'>
                            <View className='con-address'>
                                <Text className='con-address-txt'>
                                    北京经济技术开发区马驹桥米拉广场天华园一里三区14号楼8号
                                </Text>
                            </View>
                            <View className='contact-address-divide'></View>
                            <View className='con-contact'>
                                <View
                                    className='contact-img-con'
                                    onClick={this.makePhoneCall}
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
                        <ListItem label='创建人' value='范希娟' />
                        <ListItem label='客户经理' value='徐美誉' />
                        <ListItem label='拜访日期' value='2015-05-08' />
                        <ListItem label='被拜访人' value='无' />
                        <ListItem label='拜访目的' value='正常跟进' />
                        <ListItem label='拜访类型' value='无计划拜访' />
                        <ListItem label='拜访方式' value='到店拜访' />
                    </View>
                    <View
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
                    </View>
                </ScrollView>
            </View>
        );
    }
}
