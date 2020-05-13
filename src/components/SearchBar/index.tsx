import Taro, { Component } from '@tarojs/taro';
import { View, Input, Image } from '@tarojs/components';
import searchPng from '@/assets/images/search.png'
import scanImg from '@/assets/images/scan.png'
import './index.scss';

type PageOwnProps = {
    leftSrc?: any,
    rightSrc?: any,
    onLeftClick?: () => void,
    onRightClick?: () => void
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

    renderScan = () => {
        const { rightSrc, onRightClick } = this.props;
        return (
            <View className='search-scan' onClick={onRightClick}>
                {
                     rightSrc ? <Image src={rightSrc} className='search-scan-image' /> : null
                }
            </View>
        )
    }

    render() {

        return (
            <View className='search-header search-cls'>
                {this.renderSearchIcon()}
                <Input className='search-input' />
                {this.renderScan()}
            </View>
        );
    }
}

export default SearchBar;