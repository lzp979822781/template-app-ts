import Taro, { Component, Config } from "@tarojs/taro";
import { View, ScrollView, Text, Image } from "@tarojs/components";
import { StatusBar, Header, Gradient, JDListItem } from "@/components/index";
import { JDJumping } from "@jdreact/jdreact-core-lib";
import { hoverStyle } from "@/utils/utils";
import { get as getGlobalData } from '@/utils/global_data';
import "./index.scss";

const noneTxt = "无";

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


type baseProps = {
    data: any;
}

export default class PlanBtn extends Component<baseProps, any> {
    constructor(props) {
        super(props);
    }

    jumpToApp(des, params = {}) {
        // console.log(`openApp.jyingApp://virtual?params={"category":"jump","des":"${des}", "params": ${JSON.stringify({customerPin: data.pin})}}`)
        JDJumping.jumpToOpenapp(
            `openApp.jyingApp://virtual?params={"category":"jump","des":"${des}", "params": ${JSON.stringify(params)}}`
        )
    }

    render() {
        const { data } = this.props;
        const signParam = { customerId: data.customerId, customerName: data.customerName, taskId: data.id };
        const planSummaryParam = { customerId: data.customerId, taskId: data.id, visitType: data.taskModel };

        //已完成，已超时
        const showAllBtn = [0, 1].includes(data.taskStatus);

        //是今天，未打卡，显示打卡按钮
        const canSign = data.canSign;

        if(!showAllBtn){
           return <View />
        };

        return (
            <View
                className='plan-btn-con'
            >
                {canSign ? <View
                    className='plan-btn'
                    onClick={() => { this.jumpToApp("visitPlanSignInPage", signParam) }}
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
                        colors={["#FF6600", "#FFC100"]}
                    >
                        <Text className='plan-btn-txt'>打卡</Text>
                    </Gradient>
                </View> : null}
                <View
                    className='plan-btn'
                    onClick={() => { this.jumpToApp("VisitPlanSummaryPage", planSummaryParam) }}
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
                </View>
            </View>
        );
    }
}
