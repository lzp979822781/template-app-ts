import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import Gradient from "@/components/Gradient";
import Phone from "@/assets/images/phone@3x.png";
import { hoverStyle } from "@/utils/utils";

import "./index.scss";

export default class CardBase extends Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View className='card-base'>
                <View className='card-base-head'>
                    <Image
                        className='card-base-head-img'
                        src='https://m.360buyimg.com/jmeside/jfs/t1/57152/18/11709/90893/5d88b603E5f78381c/f27e683a0ac599f9.png'
                    />
                </View>
                <View className='base-msg'>
                    <Text className='company-title'>
                        北京宇康松百姓平安大药房南海家园店
                    </Text>
                    <Text className='company-pin'>
                        客户pin：温州市前锋大药房11111
                    </Text>
                    <Text className='company-manager'>客户经理：张琳琳</Text>
                </View>
                <View className='divide-line-horizontal' />
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
                            onClick={this.props.onPopupShow}
                            hoverStyle={hoverStyle}
                        >
                            <Image className='contact-img' src={Phone} />
                        </View>
                    </View>
                </View>
                <View className='base-btn-con'>
                    <View className='base-btn'>
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
                    <View className='base-btn'>
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
