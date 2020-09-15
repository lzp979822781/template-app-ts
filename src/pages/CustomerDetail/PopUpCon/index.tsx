import Taro, { Component } from "@tarojs/taro";
import { View, ScrollView, Text, Image } from "@tarojs/components";
import { PopUp } from "@/components/index";
import "./index.scss";

type contactType = {
    contactsName: string;
    mobile: string;
    roleCodeName: string;
}

type baseProps = {
    visible: boolean;
    data: Array<contactType>;
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
                    <Text className='popup-list-type-txt'>{item.roleCodeName}</Text>
                </View>
                <View className='popup-list-btn'>
                    <View className='popup-list-btn-con' onClick={this.makePhoneCall.bind(this, item)}>
                        <Image
                            className='popup-list-btn-icon'
                            src='https://img12.360buyimg.com/imagetools/jfs/t1/128651/9/12268/1100/5f58ac4eEa6562e75/38280dd6bf5b0fb4.png'
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
                                    src='https://img10.360buyimg.com/imagetools/jfs/t1/110863/8/20338/1524/5f58ac4fE5cf177e6/d3a15bc416cf5afa.png'
                                />
                            </View>
                        </View>
                    </View>
                    <ScrollView className='popup-body'>{this.renderItems()}</ScrollView>
                </View>
            </PopUp>
        );
    }
}
