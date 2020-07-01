import Taro, { Component } from '@tarojs/taro';
import { View, Input, Image } from '@tarojs/components';
import searchPng from '@/assets/images/search.png';
import scanImg from '@/assets/images/scan.png';
import clear from '@/assets/search/clear.png';
import speech from '@/assets/search/speech.png';
import './index.scss';

type PageOwnProps = {
    leftSrc?: any,
    rightSrc?: any,
    onLeftClick?: () => void,
    onSpeechClick?: () => void,
    onClear?: () => void,
    onInput: (e) => void,
    value: string
}

type PageOwnState = {

}

const defaultProps = {
    leftSrc: searchPng,
    rightSrc: scanImg,
    onLeftClick: () => {},
    onRightClick: () => {},
}

class SearchBar extends Component<PageOwnProps, PageOwnState> {

    static defaultProps = defaultProps
    static externalClasses = ['search-cls']

    constructor(props) {
        super(props);
        this.state = {  };
    }

    /**
     * 左侧搜索图标的渲染
     * @returns
     */
    renderSearchIcon = () => {
        const { leftSrc, onLeftClick } = this.props;
        return (
            <View className='search-icon' onClick={onLeftClick}>
                <Image src={leftSrc} className='search-icon-image' />
            </View>
        );
    }

    renderIcon = () => {
        const { onSpeechClick, onClear, value } = this.props;
        const isEmpty = typeof value === "undefined" || value === '';
        console.log("this.props", this.props);
        if(isEmpty) {
            return (
                <View className='search-speech' onClick={onSpeechClick}>
                    <Image src={speech} className='search-speech-image' />
                </View>
            );
        }
        return (
            <View className='search-scan' onClick={onClear}>
                <Image src={clear} className='search-scan-image' />
            </View>
        )
    }

    render() {
        const { onInput, value } = this.props;
        console.log("this.props", this.props);
        return (
            <View className='search-header search-cls'>
                {this.renderSearchIcon()}
                <Input 
                    placeholderClass='search-input-placeholder' 
                    className='search-input' 
                    placeholder='请输入内容' 
                    onInput={onInput}
                    value={value}
                />
                {this.renderIcon()}
            </View>
        );
    }
}

export default SearchBar;