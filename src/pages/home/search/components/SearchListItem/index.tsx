import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';

import homeImg from '@/assets/search/home.png'

import './index.scss';

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

    renderContent = () => {
        const { data: { first }} = this.props;
        if(first) {
            const First = this.renderFirst();
            return First;
        }
        const Normal = this.renderNormal();
        return Normal;
    }
        
    render() {
        
        // const { prefix, highlight, suffix } = this.splitText();
        return (
            <View>
                {/* {this.renderContent()} */}
                {/* <Text className='search-list-item-text'>{prefix}</Text>
                <Text className='search-list-item-text search-list-item-highlight'>{highlight}</Text>
                <Text className='search-list-item-text'>{suffix}</Text> */}
                { this.renderNormal()}
            </View>
        );
    }
}

export default SearchListItem;