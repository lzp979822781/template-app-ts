import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';

import backImg from '@//assets/images/arrow-left.png';

import { SearchInput, SearchSelect } from '../index';

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

    onFilter = () => {
        Taro.showToast({ title: '打开筛选弹窗'})
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

    renderItemSelect = () => {
        return (
            <View>
                <SearchSelect 
                    onFilter={this.onFilter}
                />
            </View>
        );
    }

    renderTable = () => {
        return (
            <View>
                列表渲染
            </View>
        );
    }

    render() {
        return (
            <View className='goods-list'>
                {this.renderHeader()}
                {this.renderItemSelect()}
                {this.renderTable()}
            </View>
        );
    }
}

export default SearchGoodsList;