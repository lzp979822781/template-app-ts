import Taro, {Component} from '@tarojs/taro';
import { View } from '@tarojs/components';
import img3 from '@/assets/images/03.png';
import img4 from '@/assets/images/04.png';
import { Title, BaseCard, SubCard } from '../components';

import './index.scss';

type PageProps = {

}

type PageState = {

}

class WonderfulVenue extends Component<PageProps, PageState> {

    static externalClasses = ['custom-cls']

    renderSubCard = () => {
        return (
            <View className='explosive-subcard'>
                <View className='explosive-subcard-container'>
                    <BaseCard 
                        title='限售畅销品'
                        description='爆款直降 好货抢先'
                        custom-cls='explosive-subcard-left'
                        mainTitleStyle={{ color: '#fff'}}
                        subTitleStyle={{ color: '#fff'}}
                        appendConStyle={{ backgroundColor: '#fff'}}
                        appendTxtStyle={{ color: '#828CC6' }}
                        customStyle={{ backgroundColor: '#828CC6'}}

                    />
                    <BaseCard 
                        title='限售畅销品'
                        description='爆款直降 好货抢先'
                        custom-cls='explosive-subcard-right'
                        customStyle={{ backgroundColor: '#EB7E7D'}}
                        mainTitleStyle={{ color: '#fff'}}
                        subTitleStyle={{ color: '#fff'}}
                        appendConStyle={{ backgroundColor: '#fff'}}
                        appendTxtStyle={{ color: '#EB7E7D' }}
                    />
                </View>
                <View className='explosive-subcard-sub-container'>
                    <SubCard 
                        title='活动标题'
                        description='满1000减90'
                        src={img3}
                    />
                    <SubCard 
                        title='活动标题'
                        description='满1000减90'
                        src={img4}
                    />
                    <SubCard 
                        title='活动标题'
                        description='满1000减90'
                        src={img3}
                    />
                    <SubCard 
                        title='活动标题'
                        description='满1000减90'
                        src={img4}
                    />
                </View>
            </View>
        )
    }

    render() {
        return (
            <View className='explosive custom-cls'>
                <Title 
                    title='爆品活动'
                    description='跟我玩抢爆品'
                />
                {this.renderSubCard()}
            </View>
        )
    }
}

export default WonderfulVenue;