import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';

import homeImg from '@/assets/search/home.png'

import './index.scss';

type PageOwnProps = {
    searchVal?: string,
    field?: string,
    onClick?: (data?: any) => any
};

class ShotItem extends Component<PageOwnProps> {

    static defaultProps = {
        field: 'text',
    }

    constructor(props) {
        super(props);
        this.state = {  };
    }

    onClick = () => {
        const { onClick } = this.props;
        if(onClick) {
            onClick();
        }
    }

    render() {
        
        const { searchVal } = this.props;
        return (
            <View className='search-list-item-first' onClick={this.onClick}>
                <Image src={homeImg} className='search-list-item-first-img' />
                <Text className='search-list-item-first-text'>{`搜索“${searchVal}”店铺`}</Text>
            </View>
        );
    }
}

export default ShotItem;