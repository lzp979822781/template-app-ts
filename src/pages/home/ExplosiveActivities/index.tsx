import Taro, {Component} from '@tarojs/taro';
import { View } from '@tarojs/components';
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
                        src='https://img14.360buyimg.com/imagetools/jfs/t1/150235/13/5346/468881/5f34ef8fE104f2b45/f46728fd2c561d64.png'
                    />
                    <SubCard 
                        title='活动标题'
                        description='满1000减90'
                        src='https://img14.360buyimg.com/imagetools/jfs/t1/128214/20/9716/410294/5f34ef8fEff34ec67/979a2fbce2411de7.png'
                    />
                    <SubCard 
                        title='活动标题'
                        description='满1000减90'
                        src='https://img14.360buyimg.com/imagetools/jfs/t1/150235/13/5346/468881/5f34ef8fE104f2b45/f46728fd2c561d64.png'
                    />
                    <SubCard 
                        title='活动标题'
                        description='满1000减90'
                        src='https://img14.360buyimg.com/imagetools/jfs/t1/128214/20/9716/410294/5f34ef8fEff34ec67/979a2fbce2411de7.png'
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