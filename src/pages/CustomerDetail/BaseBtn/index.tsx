import Taro, { Component } from "@tarojs/taro";
import { JDJumping } from "@jdreact/jdreact-core-lib";
import { View, Text } from "@tarojs/components";
import Gradient from "@/components/Gradient";
import { hoverStyle } from "@/utils/utils";
import "./index.scss";

type baseProps = {
    canBind?: boolean;
    data?: object;
    onPopupShow?: any;
}
export default class BaseBtn extends Component<baseProps, any> {
    static defaultProps = {
        data: {},
        canBind: false,
    }
    constructor(props) {
        super(props);
    }

    jumpToApp(des) {
        const { data } = this.props;
        const params = {
            customerId: data.id,
            customerName: data.companyName,
            userId: data.userId,
            userName: data.userName
        }
        // console.log(`openApp.jyingApp://virtual?params={"category":"jump","des":"${des}", "params": ${JSON.stringify(params)}}`)
        JDJumping.jumpToOpenapp(
            `openApp.jyingApp://virtual?params={"category":"jump","des":"${des}", "params": ${JSON.stringify(params)}}`
        )
    }

    jumpToAppWeb() {
        const { data } = this.props;
        JDJumping.jumpToOpenapp(
            `openApp.jyingApp://virtual?params={"category":"jump","des":"webView", "params": ${JSON.stringify({ url: `/assist/customer/detail/info?customerId=${data.id}` })}}`
        )
    }

    render() {
        const { onPopupShow, canBind } = this.props;
        return (
            <View className='base-btn-con'>
                {canBind ? <View className='base-btn' hoverStyle={hoverStyle} onClick={() => {
                    onPopupShow("input")
                }}
                >
                    <Gradient
                        angle={0}
                        colors={["#FF6600", "#FFC100"]}
                        style={{
                            height: 40,
                            borderRadius: 20,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Text className='base-btn-txt'>绑定客户</Text>
                    </Gradient>
                </View> : null}
                {canBind ? <View className='btn-gap' /> : null}
                <View className='base-btn' hoverStyle={hoverStyle} onClick={() => {
                    this.jumpToApp("VisitPlanCreatePage");
                }}
                >
                    <Gradient
                        style={{
                            height: 40,
                            borderRadius: 20,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                        angle={0}
                        colors={["#EC1B1B", "#FF511D"]}
                    >
                        <Text className='base-btn-txt'>新建计划</Text>
                    </Gradient>
                </View>
            </View>
        );
    }
}
