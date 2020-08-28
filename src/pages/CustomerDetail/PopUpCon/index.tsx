import Taro, { Component, Config } from "@tarojs/taro";
import { View, Block, Button, Text, Image } from "@tarojs/components";
import PopupCloseIcon from "@/assets/images/popup-close-icon@3x.png";
import { PopUp } from "@/components/index";
import Phone from "@/assets/images/phone@3x.png";
import "./index.scss";

export default class PopUpCon extends Component<any, any> {
    constructor(props) {
        super(props);
    }

    makePhoneCall = obj => {
        Taro.makePhoneCall({
            phoneNumber: "18301442850" //仅为示例，并非真实的电话号码
        });
    };

    render() {
        return (
            <PopUp
                visible={this.props.visible}
                onClose={this.props.onPopupClose}
                rnStyle={{
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    borderTopLeftRadius: 4,
                    borderTopRightRadius: 4
                }}
            >
                <View className="popup-con">
                    <View className="popup-head">
                        <View className="popup-head-left"></View>
                        <View className="popup-head-center">
                            <Text className="popup-head-title">联系方式</Text>
                        </View>
                        <View className="popup-head-right">
                            <View
                                className="popup-head-right-con"
                                onClick={this.props.onPopupClose}
                            >
                                <Image
                                    className="popup-head-right-icon"
                                    src={PopupCloseIcon}
                                />
                            </View>
                        </View>
                    </View>
                    <View className="popup-body">
                        <View className="popup-list-item">
                            <View className="popup-list-name">
                                <Text className="popup-list-name-txt">
                                    罗希娟
                                </Text>
                            </View>
                            <View className="popup-list-phone">
                                <Text className="popup-list-phone-txt">
                                    12345678912
                                </Text>
                            </View>
                            <View className="popup-list-type">
                                <Text className="popup-list-type-txt">
                                    采购
                                </Text>
                            </View>
                            <View className="popup-list-btn">
                                <View className="popup-list-btn-con" onClick={this.makePhoneCall.bind(this, {})}>
                                    <Image
                                        className="popup-list-btn-icon"
                                        src={Phone}
                                    />
                                </View>
                            </View>
                        </View>
                        <View className="popup-list-item">
                            <View className="popup-list-name">
                                <Text className="popup-list-name-txt">
                                    张三
                                </Text>
                            </View>
                            <View className="popup-list-phone">
                                <Text className="popup-list-phone-txt">
                                    12345678912
                                </Text>
                            </View>
                            <View className="popup-list-type">
                                <Text className="popup-list-type-txt">
                                    经营者
                                </Text>
                            </View>
                            <View className="popup-list-btn">
                                <View className="popup-list-btn-con">
                                    <Image
                                        className="popup-list-btn-icon"
                                        src={Phone}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </PopUp>
        );
    }
}
