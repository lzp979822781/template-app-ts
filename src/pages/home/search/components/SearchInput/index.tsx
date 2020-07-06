import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import searchPng from '@/assets/images/search.png';

import './index.scss';

type PageOwnProps = {
    leftSrc?: any,
    searchVal?: string|undefined,
    onClick?: (data) => void
};

class SerachInput extends Component<PageOwnProps> {

    static defaultProps = {
        leftSrc: searchPng
    } 

    constructor(props) {
        super(props);
        this.state = {  };
    }

        /**
     * 左侧搜索图标的渲染
     * @returns
     */
    renderSearchIcon = () => {
        const { leftSrc } = this.props;
        return (
            <View className='search-input-icon'>
                <Image src={leftSrc} className='search-input-icon-image' />
            </View>
        );
    }

    render() {
        const { searchVal, onClick } = this.props;
        return (
            <View className='search-input search-cls' onClick={onClick}>
                {this.renderSearchIcon()}
                <View className='search-input-content' >
                    <Text className='search-input-content-text'>{searchVal}</Text>
                </View>
            </View>
        );
    }
}

export default SerachInput;