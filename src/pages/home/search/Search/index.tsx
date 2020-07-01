import Taro, { Component } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View, Image, Text } from '@tarojs/components';
import { SearchBar } from '@/components';

import backImg from '@//assets/images/arrow-left.png';

import './index.scss'


@connect(({ hello, ...other }) => ({ ...hello, ...other }))
class Search extends Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
            searchVal: ''
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

    render() {

        return (
            <View className='search-list'>
                {this.renderSearch()}
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
