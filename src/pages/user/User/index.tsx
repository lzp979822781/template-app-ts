import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';

import unpay from '@/assets/my/unpay.png';
import unsend from '@/assets/my/unsend.png';

import { OrderState, Grid } from '../components';


import './index.scss';

const defaultAvatar =  'https://img14.360buyimg.com/imagetools/jfs/t1/144896/12/5516/4130/5f34efa6E18afc898/ebc665a4c8366129.png';

const arrowRight = 'https://img10.360buyimg.com/imagetools/jfs/t1/150044/30/5372/430/5f34ef8fE160c5191/d8d488805d680d91.png';

const messageImg = 'https://img11.360buyimg.com/imagetools/jfs/t1/147457/16/5273/1803/5f34efa6E81a51fa9/42ac11f7349140f2.png';

const baseInfoUrl = 'https://img14.360buyimg.com/imagetools/jfs/t1/124651/40/9577/1439663/5f34efa6E27c66696/6493831b47bd4ad4.png';

const pendingAudit = 'https://img14.360buyimg.com/imagetools/jfs/t1/112148/12/14931/17131/5f34efa7E65234d93/d87410d615276619.png';

const postSale = 'https://img11.360buyimg.com/imagetools/jfs/t1/126441/27/9523/21108/5f34efa7E8c5a14fc/050c86ca8ebffd86.png';

const settingImg = 'https://img14.360buyimg.com/imagetools/jfs/t1/126705/37/9595/2933/5f34efa7Efc81749f/82812e19ec93ed83.png';

const unpay = 'https://img11.360buyimg.com/imagetools/jfs/t1/131412/12/6842/17902/5f34efa7E6c9ed77c/7faeb303e8ec4018.png';

const unsend = 'https://img13.360buyimg.com/imagetools/jfs/t1/145325/26/5485/18329/5f34efa7E0f92d669/8e7ece85c5c2d6bd.png';

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

    getStyle = () => {
        const isRn = Taro.getEnv().toLowerCase() === 'rn';
        const rnStyle = {
            elevation: -10,  //  设置阴影角度，通过这个设置有无阴影（这个是最重要的，决定有没有阴影）    
            shadowColor: 'black',  //  阴影颜色
            shadowOffset: { width: 0, height: 0 },  // 阴影偏移
            shadowOpacity: .5,  // 阴影不透明度
            shadowRadius: 1,  //  圆角
        };
        return isRn ? rnStyle : {};

    }

    renderOrderState = () => {
        return (
            <View className='my-order-state' style={this.getStyle()}>
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