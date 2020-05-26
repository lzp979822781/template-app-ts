import Taro, {Component} from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import img1 from '@/assets/images/01.png';
import img2 from '@/assets/images/02.png';
import { Title, BaseCard } from '../components';


import './index.scss';

type PageProps = {

}

type PageState = {

}

class WonderfulVenue extends Component<PageProps, PageState> {
    
    onMoreClick = () => {
        console.log("点击更多按钮");
    }

    renderMainCard = () => {
        return (
            <View className='wonderful-venue-maincard'>
                <View className='wonderful-venue-maincard-title-container'><Text className='wonderful-venue-maincard-title'>新品季末出清</Text></View>
                <View><Text className='wonderful-venue-maincard-subtitle'>爆款直降 好货抢先</Text></View>
                <View className='wonderful-venue-maincard-btn'>
                    <Text className='wonderful-venue-maincard-btn-txt'>更多</Text>
                </View>
            </View>
        );
    }

    renderSubCard = () => {
        return (
            <View className='wonderful-venue-subcard'>
                <BaseCard 
                    title='品牌活动。'
                    description='全场品牌满减90'
                    src={img1}
                />
                <BaseCard 
                    title='新品季末出清'
                    description='爆款直降 好货抢先'
                    src={img2}
                />
            </View>
        )
    }

    render() {
        return (
            <View className='wonderful-venue'>
                <Title 
                    title='京采会场'
                    description='逛会场享钜惠'
                    onMoreClick={this.onMoreClick}
                />
                { this.renderMainCard()}
                { this.renderSubCard()}
            </View>
        )
    }
}

export default WonderfulVenue;