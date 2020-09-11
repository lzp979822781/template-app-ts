import Taro, { Component } from "@tarojs/taro";
import { JDJumping } from "@jdreact/jdreact-core-lib";
import { View, Text, Image } from "@tarojs/components";
import { PopUp } from "@/components/index";
import { hoverStyle } from "@/utils/utils";
import { get as getGlobalData } from '@/utils/global_data';
import "./index.scss";

type baseProps = {
    visible: boolean;
    onPopupClose?: any;
}
export default class PopUpConDist extends Component<baseProps, any> {
    constructor(props) {
        super(props);
    }


    jumpToApp(des) {
        const jyNativeData = getGlobalData('jyNativeData');
        debugger
        // console.log(`openApp.jyingApp://virtual?params={"category":"jump","des":"${des}", "params": ${JSON.stringify({customerPin: data.pin})}}`)
        JDJumping.jumpToOpenapp(
            `openApp.jyingApp://virtual?params={"category":"jump","des":"${des}", "params": ${JSON.stringify({customerId: jyNativeData.customerId})}}`
        )
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
                    borderTopRightRadius: 4,
                    padding:0
                }}
                rnContainerStyle={{ height: 140, minHeight: 80 }}
            >
                <View className='popup-dist-con'>
                    <View className='popup-dist-confirm' hoverStyle={hoverStyle} onClick={()=>{this.jumpToApp("dispatchCMPage")}}>
                        <Image
                            className='popup-dist-confirm-icon'
                            src="https://img14.360buyimg.com/imagetools/jfs/t1/133583/28/9732/2225/5f5a1513E972ff853/31b3038350d9a137.png"
                        />
                        <Text className='popup-dist-confirm-txt'>分配</Text>
                    </View>
                    <View className='popup-dist-cancel' hoverStyle={hoverStyle} onClick={onPopupClose}>
                        <Text className='popup-dist-cancel-txt'>取消</Text>
                    </View>
                </View>
            </PopUp>
        );
    }
}
