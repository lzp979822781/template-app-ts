import Taro, { Component, Config } from "@tarojs/taro";
import { View, Block, Button, Text, Image } from "@tarojs/components";
import PopupCloseIcon from "@/assets/images/popup-close-icon@3x.png";
import { PopUp } from "@/components/index";
import Phone from "@/assets/images/phone@3x.png";
import "./index.scss";

type baseProps = {
    visible: boolean;
    data?: Array<object>;
    onPopupClose?: any;
}
export default class PopUpCon extends Component<baseProps, any> {
    constructor(props) {
        super(props);
    }

    makePhoneCall = item => {
        Taro.makePhoneCall({
            phoneNumber: item.mobile
        });
    };

    renderItems = () => {
        const { data } = this.props;
        return data.map((item) => {
            return <View key={item.mobile} className='popup-list-item'>
                <View className='popup-list-name'>
                    <Text className='popup-list-name-txt'>{item.contactsName}</Text>
                </View>
                <View className='popup-list-phone'>
                    <Text className='popup-list-phone-txt'>{item.mobile}</Text>
                </View>
                <View className='popup-list-type'>
                    <Text className='popup-list-type-txt'>{item.roleName}</Text>
                </View>
                <View className='popup-list-btn'>
                    <View className='popup-list-btn-con' onClick={this.makePhoneCall.bind(this, item)}>
                        <Image
                            className='popup-list-btn-icon'
                            src={Phone}
                        />
                    </View>
                </View>
            </View>
        })
    }

    render() {
        const { visible, onPopupClose } = this.props;
        return (
            <PopUp
                visible={visible}
                onClose={onPopupClose}
                rnStyle={{
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    borderTopLeftRadius: 4,
                    borderTopRightRadius: 4
                }}
            >
                <View className='popup-con'>
                    <View className='popup-head'>
                        <View className='popup-head-left'></View>
                        <View className='popup-head-center'>
                            <Text className='popup-head-title'>联系方式</Text>
                        </View>
                        <View className='popup-head-right'>
                            <View
                                className='popup-head-right-con'
                                onClick={this.props.onPopupClose}
                            >
                                <Image
                                    className='popup-head-right-icon'
                                    src={PopupCloseIcon}
                                />
                            </View>
                        </View>
                    </View>
                    <View className='popup-body'>{this.renderItems()}</View>
                </View>
            </PopUp>
        );
    }
}
