import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';

import defaultAvatar from '@/assets/my/defaultAvatar.png';
import baseInfoUrl from '@/assets/my/name.png';
import settingImg from '@/assets/my/setting.png';
import messageImg from '@/assets/my/message.png';
import arrowRight from '@/assets/images/arrowright.png';

import pendingAudit from '@/assets/my/pendingaudit.png';
import unpay from '@/assets/my/unpay.png';
import unsend from '@/assets/my/unsend.png';
import postSale from '@/assets/my/postsale.png';

import { OrderState, Grid } from '../components';


import './index.scss';

class User extends Component{

    constructor(props) {
        super(props);
        this.state = {  };
    }

    config: {
        navigationBarTitleText: ''
    }

    onSettingClick = () => {
        Taro.showToast({
            title: '设置',
            icon: "none",
            duration: 2000
        })
    }

    onMsgClick = () => {
        this.showToast('消息事件');
    }

    onPendingAudit = () => {
        this.showToast('待审事件')
    }

    onUnPay = () => {
        this.showToast('待付款事件');
    }

    onUnSend = () => {
        this.showToast("待发货");
    }

    onPostSale = () => {
        this.showToast('售后');
    }

    showToast = (msg) => {
        Taro.showToast({
            title: msg,
            icon: "none",
            duration: 2000
        })
    }

    renderBaseInfo = () => {
        return (
            <View className='my-info'>
                <Image src={baseInfoUrl} className='my-info-bg' />
                <View className='my-info-container'>
                    <View className='my-info-avatar'>
                        <Image src={defaultAvatar} className='my-info-img' />
                    </View>

                    <View className='my-info-user'>
                        <View className='my-info-user-name'><Text className='my-info-user-name-text'>用户名</Text></View>
                        <View className='my-info-user-department'><Text className='my-info-user-department-text'>大药房采购</Text></View>
                    </View>
                </View>
                
                <View className='my-info-setting-wrapper' onClick={this.onSettingClick}>
                    <Image src={settingImg} className='my-info-setting-img' />
                </View>
                
                <View className='my-info-message-wrapper' onClick={this.onMsgClick}>
                    <Image src={messageImg} className='my-info-message-img' />
                </View>
            </View>
        )
    }

    renderOrder = () => {
        return (
            <View className='my-order'>
                <View className='my-order-title-wrapper'><Text className='my-order-title-text'>我的订单</Text></View>
                <View className='my-order-empty'></View>
                <View className='my-order-desc-wrapper'>
                    <Text className='my-order-desc-text'>查看全部订单</Text>
                    <Image src={arrowRight} className='my-order-desc-icon' />
                </View>
                
            </View>
        );
    }

    renderOrderState = () => {
        return (
            <View className='my-order-state'>
                <OrderState 
                    img={pendingAudit}
                    text='待审核'
                    onClick={this.onPendingAudit}
                />
                <OrderState 
                    img={unpay}
                    text='待付款'
                    onClick={this.onUnPay}
                    badgeValue={12}
                />
                <OrderState 
                    img={unsend}
                    text='待发货'
                    onClick={this.onUnSend}
                />
                <OrderState 
                    img={postSale}
                    text='售后/退款'
                    onClick={this.onPostSale}
                />
            </View>
        );
    }

    render() {
        return (
            <View className='my'>
                { this.renderBaseInfo()}
                { this.renderOrder()}
                { this.renderOrderState()}
                <Grid my-class='my-grid' className='my-grid' />
            </View>
        );
    }
}

export default User;