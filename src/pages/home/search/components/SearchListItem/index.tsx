import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';

import './index.scss';

const homeImg = "https://img13.360buyimg.com/imagetools/jfs/t1/135587/24/6938/1857/5f34efd3E554a02e0/96676a809c3443b3.png";

type PageOwnProps = {
    data: any,
    searchVal?: string,
    field?: string,
    onClick?: (data?: any) => any
};

class SearchListItem extends Component<PageOwnProps> {

    static defaultProps = {
        field: 'text',
        data: {}
    }

    constructor(props) {
        super(props);
        this.state = {  };
    }

    onClick = () => {
        const { onClick, data } = this.props;
        if(onClick) {
            onClick(data);
        }
    }

    splitText = () => {
        const { data: { text = '' }, searchVal = '' } = this.props;
        const defaultObj = { prefix: text, highlight: '', suffix: ''};
        
        if(!text || !text.includes(searchVal)) return defaultObj;
        const index = text.indexOf(searchVal);
        const splitObj = {
            prefix: text.substring(0, index),
            highlight: searchVal,
            suffix: text.substring(index + searchVal.length)
        };

        return splitObj
    }

    renderFirst = () => {
        const { searchVal } = this.props;
        return (
            <View className='search-list-item-first'>
                <Image src={homeImg} className='search-list-item-first-img' />
                <Text className='search-list-item-first-text'>{`搜索“${searchVal}”店铺`}</Text>
            </View>
        );
    }

    renderNormal = () => {
        const { prefix, highlight, suffix } = this.splitText();
        return (
            <View className='search-list-item' onClick={this.onClick}>
                <Text className='search-list-item-text'>{prefix}</Text>
                <Text className='search-list-item-text search-list-item-highlight'>{highlight}</Text>
                <Text className='search-list-item-text'>{suffix}</Text>
            </View>
        );
    }

    render() {
        
        return (
            <View>
                { this.renderNormal()}
            </View>
        );
    }
}

export default SearchListItem;