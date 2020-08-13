import Taro, { Component } from '@tarojs/taro';
import { View, Input, Image } from '@tarojs/components';
import clear from '@/assets/search/clear.png';
import speech from '@/assets/search/speech.png';
import './index.scss';

const scanImg = 'https://img11.360buyimg.com/imagetools/jfs/t1/139901/4/5335/1762/5f34ef8fE02133f5d/106ec8613b39f16d.png';
const searchPng = 'https://img10.360buyimg.com/imagetools/jfs/t1/127337/35/9610/1615/5f34ef8fEf5dc34e9/69cd6b38e4f579cb.png';

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