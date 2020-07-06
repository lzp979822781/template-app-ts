import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';

import backImg from '@//assets/images/arrow-left.png';

import SearchInput from '../SearchInput';

import './index.scss';

type PageOwnProps = {
    searchVal?: string|undefined
};

class SearchGoodsList extends Component<PageOwnProps> {
    constructor(props) {
        super(props);
        this.state = {  

        };
    }

    componentDidMount() {
    }

    toSearchPage = () => {
        Taro.navigateTo({ url: '/pages/home/search/Search/index'})
    }

    onBack = () => {
        Taro.navigateBack();
    }

    renderHeader = () => {
        const { text: searchVal } = this.$router.params || {};
        return (
            <View className='goods-list-header'>
                <View className='goods-list-header-back' onClick={this.onBack}>
                    <Image src={backImg} className='goods-list-header-back-icon' />
                </View>
                <SearchInput 
                    searchVal={searchVal}
                    onClick={this.toSearchPage}
                />
            </View>
        );
    }

    render() {
        return (
            <View className='goods-list'>
                {this.renderHeader()}
            </View>
        );
    }
}

export default SearchGoodsList;