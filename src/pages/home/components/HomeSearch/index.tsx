import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import './index.scss';

type PageOwnProps = {
    leftSrc?: any,
    rightSrc?: any,
    onLeftClick?: () => void,
    onRightClick?: () => void,
    onClick?: () => void
}

type PageOwnState = {

}

const searchPng = 'https://img10.360buyimg.com/imagetools/jfs/t1/127337/35/9610/1615/5f34ef8fEf5dc34e9/69cd6b38e4f579cb.png';
const scanImg = 'https://img11.360buyimg.com/imagetools/jfs/t1/139901/4/5335/1762/5f34ef8fE02133f5d/106ec8613b39f16d.png';

const defaultProps = {
    leftSrc: searchPng,
    rightSrc: scanImg,
    onLeftClick: () => {},
    onRightClick: () => {},
    onClick: () => {}
}

class HomeSearch extends Component<PageOwnProps, PageOwnState> {

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
            <View className='home-search-icon' onClick={onLeftClick}>
                <Image src={leftSrc} className='home-search-icon-image' />
            </View>
        );
    }

    renderScan = () => {
        const { rightSrc, onRightClick } = this.props;
        return (
            <View className='home-search-scan' onClick={onRightClick}>
                {
                    rightSrc ? <Image src={rightSrc} className='home-search-scan-image' /> : null
                }
            </View>
        )
    }

    render() {
        const { onClick } = this.props;
        return (
            <View className='home-search-header search-cls'>
                {this.renderSearchIcon()}
                <View className='home-search-input' onClick={onClick}></View>
                {/* {this.renderScan()} */}
            </View>
        );
    }
}

export default HomeSearch;