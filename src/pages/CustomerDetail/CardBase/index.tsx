import Taro, { Component } from "@tarojs/taro";
import { JDJumping } from "@jdreact/jdreact-core-lib";
import { View, Text, Image } from "@tarojs/components";
import { get as getGlobalData } from '@/utils/global_data';
import { hoverStyle } from "@/utils/utils";
import BaseBtn from "../BaseBtn/index";

import "./index.scss";

type dataObject = {
    [key: string]: any;
};

type baseProps = {
    canBind?: boolean;
    data: dataObject;
    onPopupShow?: any;
}
export default class CardBase extends Component<baseProps, any> {
    static defaultProps = {
        canBind: false,
        data: {},
        onPopupShow: () => { }
    }
    constructor(props) {
        super(props);
    }

    jumpToAppWeb() {
        const jyNativeData = getGlobalData('jyNativeData');
        const isSaint = jyNativeData.userType === "CM";
        if (isSaint) {
            JDJumping.jumpToOpenapp(
                `openApp.jyingApp://virtual?params={"category":"jump","des":"webView", "params": ${JSON.stringify({ url: `/assist/customer/detail/info?customerId=${jyNativeData.customerId}` })}}`
            )
        };
    }

    render() {
        const jyNativeData = getGlobalData('jyNativeData');
        const isSaint = jyNativeData.userType === "CM";
        const { data, onPopupShow, canBind } = this.props;
        const shouPhpne = data.contacts && data.contacts.length > 0;
        return (
            <View className='card-base'>
                <View hoverStyle={isSaint ? hoverStyle : {}} className={data.headImg ? 'card-base-head' : 'card-base-head-default'} onClick={() => this.jumpToAppWeb("webView")}>
                    <Image
                        className={data.headImg ? 'card-base-head-img' : "card-base-head-img-default"}
                        src={data.headImg || "https://img11.360buyimg.com/imagetools/jfs/t1/140195/31/7995/18951/5f58ac4eE019f959a/dcd004d1aa98f66f.png"}
                    />
                </View>
                <View hoverStyle={isSaint ? hoverStyle : {}} className='base-msg' onClick={() => this.jumpToAppWeb("webView")}>
                    <Text className='company-title'>
                        {data.companyName || "--"}
                    </Text>
                    <Text className='company-pin'>
                        {data.pin ? `客户pin：${data.pin}` : ""}
                    </Text>
                    <Text className='company-manager'>客户经理：{data.userName || "--"}</Text>
                </View>
                <View className='divide-line-horizontal' />
                <View className='contact-address-con'>
                    <View className='con-address'>
                        <Text className='con-address-txt'>
                            {data.address || "--"}
                        </Text>
                    </View>
                    {shouPhpne ? <View className='contact-address-divide'></View> : null}
                    {shouPhpne ? <View className='con-contact' onClick={() => onPopupShow("contact")} hoverStyle={hoverStyle}>
                        <View
                            className='contact-img-con'
                        >
                            <Image className='contact-img' src='https://img12.360buyimg.com/imagetools/jfs/t1/128651/9/12268/1100/5f58ac4eEa6562e75/38280dd6bf5b0fb4.png' />
                        </View>
                    </View> : null}
                </View>
                <BaseBtn data={data} onPopupShow={onPopupShow} canBind={canBind}></BaseBtn>
            </View>
        );
    }
}
