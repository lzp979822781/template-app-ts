import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';

import hotImg from '@/assets/search/hot.png';

import { addId } from '@/utils/utils';

import SearchItem from '../SearchItem';
import './index.scss';


type PageOwnProps = {
    data: Array<object>,
    onClick?: (data) => void
};

class Hot extends Component<PageOwnProps> {

    static defaultProps = {
        data: []
    }

    constructor(props) {
        super(props);
        this.state = {  };
    }

    renderHeader = () => {
        return (
            <View className='hot-header'>
                <Text className='hot-header-text'>热门搜索</Text>
                <Image className='hot-header-img' src={hotImg} />
            </View>
        );
    }

    onClick = () => {
        const { onClick } = this.props;
        return onClick;
    }

    renderContent = () => {
        const { data } = this.props;
        const renderData = addId(data);
        return (
            <View className='hot-content'>
                {
                    renderData.map(item => {
                        const { text, hot, id } = item;
                        return (
                            <SearchItem 
                                text={text}
                                icon={hot}
                                key={id}
                                data={item}
                                onClick={this.onClick()}
                            />
                        )
                    })
                }
            </View>
        );
    }

    render() {
        return (
            <View className='hot'>
                { this.renderHeader()}
                { this.renderContent()}
            </View>
        );
    }
}

export default Hot;