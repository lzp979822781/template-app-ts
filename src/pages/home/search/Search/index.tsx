import Taro, { Component } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View, Image, Text } from '@tarojs/components';
import { SearchBar } from '@/components';

import backImg from '@//assets/images/arrow-left.png';
import deleteImg from '@/assets/search/delete.png';
import upImg from '@/assets/search/up.png';
import downImg from '@/assets/search/down.png';

import { addId } from '@/utils/utils'
import { SearchItem, Hot, SearchListItem, ShopItem } from '../components';

import './index.scss';

const historyArr = [{ text: '感冒清热', hot: false }, { text: '维生素E乳', hot: false}, { text: '葡萄籽', hot: false}, { text: '精华'}, { text: '化学药制剂'}, { text: '美林布洛芬悬浮液', hot: true}];
const listData = [
    { text: '感冒维生素E乳' },
    { text: '感冒清热' },
    { text: '浮液感冒清热' },
    { text: '感冒化学药制剂' },
    { text: '感冒清热' }
];

@connect(({ hello, ...other }) => ({ ...hello, ...other }))
class Search extends Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
            searchVal: '',
            isOpen: false,
            searchList: listData,
        }
    }

    /**
     * 清除搜索数据
     * @memberof Search
     */
    onClear = () => {
        Taro.showToast({ title: '清除'})
        this.setState({ searchVal: ''})
    }

    /**
     * 语音按钮点击事件
     * @memberof Search
     */
    onSpeechClick = () => {
        Taro.showToast({ title: 'speech'})
    }

    onInput = (e) => {
        const { target: { value }} = e;
        this.setState({ searchVal: value})
    }

    doSearch = () => {
        Taro.showToast({
            title: '搜索'
        })
    }

    /**
     * 点击热门中的标签触发
     */
    onHotClick = (data) => {
        Taro.showToast({ 
            title: JSON.stringify(data)
        })
    }

    jointParam = (param) => {
        const keys = Object.keys(param);
        return keys.reduce((total, key) => `${total}&${key}=${param[key]}`, '');
    }

    /**
     *  点击搜索历史触发
     */
    onHistoryClick = data => {
        /* Taro.showToast({ 
            title: JSON.stringify(data)
        }); */
        const url = this.jointParam(data);
        Taro.navigateTo({
            url: `/pages/home/search/components/SearchGoodsList/index?${url}`
        })
    }

    /**
     * 删除搜索历史
     */
    onDelete = () => {
        Taro.showToast({ title: '删除搜索历史'})
    }

    onSearchShop = () => {
        Taro.showToast({ title: '店铺搜索'});
    }

    onDropClick = data => {
        Taro.showToast({ title: JSON.stringify(data)});
    }

    showMore = () => {
        const { isOpen } = this.state;
        this.setState({ isOpen: !isOpen });
    }

    renderSearch = () => {
        const { searchVal } = this.state;

        return (
            <View className='search-list-header'>
                <View className='search-list-header-back'><Image src={backImg} className='search-list-header-back-icon' /></View>
                <SearchBar
                    onClear={this.onClear} 
                    onSpeechClick={this.onSpeechClick}
                    onInput={this.onInput}
                    value={searchVal}
                />
                <View className='search-list-header-btn' onClick={this.doSearch}>
                    <Text className='search-list-header-btn-text'>搜索</Text>
                </View>
            </View>
        ) 
    }

    renderHstHeader = () => {
        return (
            <View className='search-history-header'>
                <Text className='search-history-header-text'>搜索历史</Text>
                <View onClick={this.onDelete}>
                    <Image className='search-history-header-img' src={deleteImg} />
                </View>
            </View>
        )
    }

    renderHistory = () => {
        const idArr = addId(historyArr);

        return (
            <View className='search-history'>
                {
                    idArr.map(item => {
                        const { text, id } = item;
                        return (
                            <SearchItem 
                                text={text}
                                key={id}
                                data={item}
                                onClick={this.onHistoryClick}
                            />
                        )
                    })
                }
            </View>
        )
    }

    renderHisTail = () => {
        const { isOpen } = this.state;
        return (
            <View className='search-history-tail' onClick={this.showMore}>
                <Text className='search-history-tail-text'>更多搜索历史</Text>
                <Image className='search-history-tail-img' src={isOpen ? upImg : downImg} />
            </View>
        )
    }

    hasSearchVal = () => {
        const { searchVal } = this.state;
        return searchVal !== undefined && searchVal !== '';
    }

    renderEmptySearch = () => {
        
        return (
            <View>
                { this.renderHstHeader()}
                { this.renderHistory()}
                { this.renderHisTail()}
                <Hot 
                    data={historyArr}
                    onClick={this.onHotClick}
                />
            </View>
        );
    }

    renderSearchList = () => {
        const { searchList, searchVal } = this.state;
        const idArr = addId(searchList);
        if(!searchVal) return null;
        return (
            <View className='search-list-body'>
                <ShopItem searchVal={searchVal} onClick={this.onSearchShop} />
                {
                    idArr.map(item => {
                        const { id } = item;
                        return (
                            <SearchListItem 
                                key={id}
                                data={item}
                                searchVal={searchVal}
                                onClick={this.onDropClick}
                            />
                        )
                    })
                }
            </View>
        );
    }

    /**
     * 先获取到jsx元素再返回,如果直接返回会报错
     * @returns
     */
    /* renderContent = () => {
        const { searchVal } = this.state;
        const SearchList = this.renderSearchList();
        const EmptySearch = this.renderEmptySearch();
        return searchVal && SearchList || EmptySearch;
    } */
    

    render() {
        const { searchVal } = this.state;
        return (
            <View className='search-list'>
                {this.renderSearch()}
                {/* { this.renderContent()} */}
                { !searchVal && this.renderEmptySearch()}
                { this.renderSearchList()}
            </View>
        )
    }
}

export default Search;
