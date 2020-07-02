import Taro, { Component } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View, Image, Text } from '@tarojs/components';
import { SearchBar } from '@/components';

import backImg from '@//assets/images/arrow-left.png';
import deleteImg from '@/assets/search/delete.png';
import upImg from '@/assets/search/up.png';
import downImg from '@/assets/search/down.png';

import { addId } from '@/utils/utils'
import { SearchItem, Hot } from '../components';

import './index.scss';

const historyArr = [{ text: '感冒清热', hot: false }, { text: '维生素E乳', hot: false}, { text: '葡萄籽', hot: false}, { text: '精华'}, { text: '化学药制剂'}, { text: '美林布洛芬悬浮液', hot: true}];

@connect(({ hello, ...other }) => ({ ...hello, ...other }))
class Search extends Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
            searchVal: '',
            isOpen: false
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

    /**
     *  点击搜索历史触发
     */
    onHistoryClick = data => {
        Taro.showToast({ 
            title: JSON.stringify(data)
        })
    }

    /**
     * 删除搜索历史
     */
    onDelete = () => {
        Taro.showToast({ title: '删除搜索历史'})
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

    render() {

        return (
            <View className='search-list'>
                {this.renderSearch()}
                { this.renderHstHeader()}
                { this.renderHistory()}
                { this.renderHisTail()}
                <Hot 
                    data={historyArr}
                    onClick={this.onHotClick}
                />
            </View>
        )
    }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Search;
