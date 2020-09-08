import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import Gradient from "@/components/Gradient";
import CustomerDefaultHead from "@/assets/images/customer-default-head@3x.png";
import Phone from "@/assets/images/phone@3x.png";

import { hoverStyle } from "@/utils/utils";
import "./index.scss";

type baseProps = {
    data?: object;
    onPopupShow?: any;
}
export default class CardBase extends Component<baseProps, any> {
    static defaultProps = {
        data: {},
        onPopupShow: () => {}
    }
    constructor(props) {
        super(props);
    }

    render() {
        const { data, onPopupShow } = this.props;
        return (
            <View className='card-base'>
                <View className='card-base-head'>
                    <Image
                        className='card-base-head-img'
                        src={data.headImg || CustomerDefaultHead}
                    />
                </View>
                <View className='base-msg'>
                    <Text className='company-title'>
                        {data.companyName || "--"}
                    </Text>
                    <Text className='company-pin'>
                        客户pin：{data.pin || "--"}
                    </Text>
                    <Text className='company-manager'>客户经理：{data.userName || "--"}</Text>
                </View>
                <View className='divide-line-horizontal' />
                <View className='contact-address-con'>
                    <View className='con-address'>
                        <Text className='con-address-txt'>
                            { data.address || "--"}
                        </Text>
                    </View>
                    <View className='contact-address-divide'></View>
                    <View className='con-contact'>
                        <View
                            className='contact-img-con'
                            onClick={onPopupShow}
                            hoverStyle={hoverStyle}
                        >
                            <Image className='contact-img' src={Phone} />
                        </View>
                    </View>
                </View>
                <View className='base-btn-con'>
                    <View className='base-btn' hoverStyle={hoverStyle}>
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
                    </View>
                    <View className='btn-gap' />
                    <View className='base-btn' hoverStyle={hoverStyle}>
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
            </View>
        );
    }
}
